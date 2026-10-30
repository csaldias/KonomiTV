
# Type Hints を指定できるように
# ref: https://stackoverflow.com/a/33533514/17124142
from __future__ import annotations

import hashlib
import json
import re
import time
from datetime import datetime
from typing import Any, ClassVar

import aiosqlite
import httpx2 as httpx

from app import logging, schemas
from app.config import Config
from app.constants import DATA_DIR, JST


class EPGTranslator:
    """
    Ollama で動作するローカル LLM を使い、日本語の番組情報 (タイトル・番組概要・番組詳細) を英語に翻訳するクラス
    """

    # 翻訳先の言語コード
    TARGET_LANGUAGE: ClassVar[str] = 'en'

    # 番組情報に最後に出現してからこの秒数が経過した翻訳キャッシュは削除する
    ## 再放送で同じ番組概要が再び現れることも多いため、長めに保持する
    CACHE_RETENTION_SECONDS: ClassVar[int] = 60 * 24 * 60 * 60

    # 1回の Ollama リクエストに含めるテキストの上限
    ## Qwen3 は日本語1文字あたりおおむね1トークン程度で、英語の出力は入力より長くなる
    ## 入力を 1200 文字程度に抑えれば、8GB VRAM の GPU で 8K コンテキストに余裕を持って収まる
    BATCH_MAX_CHARS: ClassVar[int] = 1200
    BATCH_MAX_SEGMENTS: ClassVar[int] = 16

    # ひらがな・カタカナ・CJK 統合漢字・半角カタカナにマッチする正規表現
    ## これらを含まないテキスト (例: "NHK NEWS 7") は LLM に送らずそのまま返す
    ## 中黒 (・ U+30FB) は英訳後も箇条書きの記号として残るため、記号として扱う
    JAPANESE_PATTERN: ClassVar[re.Pattern[str]] = re.compile(r'[぀-ヺー-ヿ㐀-䶿一-鿿ｦ-ﾟ]')

    # TSInformation.formatString() で大かっこ表記に変換された番組記号 ([字] [再] [新] など)
    ## LLM が [再] などを独自の表現に訳してしまうため、翻訳前に取り除いて別途返す
    ## 英語での表示はクライアント側の i18n で行う
    ## ref: TSInformation.__buildFormatStringTranslationMap() の enclosed_characters_table
    SYMBOL_PATTERN: ClassVar[re.Pattern[str]] = re.compile(
        r'\[(?:HV|SD|P|W|MV|手|字|双|デ|S|二|多|解|SS|B|N|天|交|映|無|料|前|後|再|新|初|終|生|販|声|吹|PPV|ほか|'
        r'3D|2ndScr|2K|4K|8K|5\.1|7\.1|22\.2|60P|120P|d|HC|HDR|Hi-Res|Lossless|SHV|UHD|VOD|配)\]'
    )

    # 番組詳細 (Program.detail) の見出しの固定訳
    ## ここにない見出しは通常のテキストと同様に LLM で翻訳する (翻訳結果はキャッシュされる)
    DETAIL_KEY_LABELS: ClassVar[dict[str, str]] = {
        '番組内容': 'Program Details',
        '番組概要': 'Overview',
        'あらすじ': 'Synopsis',
        'ストーリー': 'Story',
        '出演者': 'Cast',
        '出演': 'Cast',
        '声の出演': 'Voice Cast',
        'キャスト': 'Cast',
        '司会': 'Host',
        'ゲスト': 'Guests',
        'ナレーター': 'Narrator',
        '語り': 'Narration',
        '原作': 'Original Work',
        '原作・脚本': 'Original Work / Screenplay',
        '脚本': 'Screenplay',
        '監督': 'Director',
        '演出': 'Direction',
        '音楽': 'Music',
        '主題歌': 'Theme Song',
        '制作': 'Production',
        '製作': 'Production',
        '制作著作': 'Produced by',
        'スタッフ': 'Staff',
        'おしらせ': 'Notice',
        'お知らせ': 'Notice',
        'ご案内': 'Information',
        '関連情報': 'Related Information',
        '番組ホームページ': 'Program Website',
        'ホームページ': 'Website',
        '字幕': 'Subtitles',
        '解説放送': 'Audio Description',
        '再放送': 'Rerun',
        '作品内容': 'About the Work',
        '解説': 'Commentary',
    }

    # 値がほぼ人名で構成される番組詳細の見出し
    ## 8B クラスのモデルは漢字の人名の読みを推測で決めてしまい誤りも多いため、これらの値は日本語の原文のまま返す
    UNTRANSLATED_DETAIL_KEYS: ClassVar[set[str]] = {
        '出演者', '出演', '声の出演', 'キャスト', '司会', 'ゲスト', 'ナレーター', '語り',
        '原作', '原作・脚本', '脚本', '監督', '演出', '音楽', 'スタッフ',
    }

    # LLM に渡すシステムプロンプト
    ## 入力は ID → 日本語テキストの JSON オブジェクトで、出力も同じ ID を持つ JSON オブジェクトとする
    SYSTEM_PROMPT: ClassVar[str] = (
        'You translate Japanese TV program guide (EPG) text into natural, concise English.\n'
        'The input is a JSON object mapping IDs to Japanese strings. '
        'Return a JSON object with exactly the same IDs, each mapped to the English translation of its string.\n'
        'Rules:\n'
        '- Translate faithfully. Do not add, summarize, explain or omit information.\n'
        '- Keep line breaks, bullet symbols (◆ ▽ ★ ・ etc.), numbers, dates and times as they are.\n'
        '- Write Japanese personal names in Hepburn romanization, family name first.\n'
        '- For titles in 「」 or 『』, use the official English title only if you are certain of it; '
        'otherwise translate the title literally and keep it in double quotes.\n'
        '- Common broadcast terms: 字幕 = subtitles, 再放送 = rerun, 最終回 = final episode, 生放送 = live, '
        '吹替 = dubbed, 二か国語 = bilingual.\n'
        '- Output only the JSON object.'
    )

    # 翻訳キャッシュ DB への共有コネクション
    ## getDatabase() で初回アクセス時に開き、close() で閉じる
    __db: ClassVar[aiosqlite.Connection | None] = None

    # このプロセスで LLM が翻訳に失敗したテキストのハッシュ
    ## 同じテキストで毎回時間を浪費するのを避けるため、プロセスの再起動まではスキップする
    __failed_hashes: ClassVar[set[str]] = set()


    @classmethod
    async def run(cls) -> None:
        """
        放送が終了していない全番組の、まだ翻訳されていないテキストを翻訳する
        放送開始時刻が近い番組から順に翻訳するため、初回起動時の大量の未翻訳テキストよりも放送中の番組の翻訳が先に終わる
        """

        # 循環参照を避けるために遅延インポート
        from app.models.Program import Program

        # 翻訳機能が無効な場合は何もしない
        if Config().translation.enabled is False:
            return

        timestamp = time.time()
        db = await cls.getDatabase()

        # 放送が終了していない番組を、放送開始時刻が近い順に取得する
        programs = await Program.filter(end_time__gt=datetime.now(JST)) \
            .order_by('start_time') \
            .values('id', 'title', 'description', 'detail')

        # 放送開始時刻順を保ったまま、翻訳対象テキストの重複を取り除く
        ## dict はキーの挿入順を保持するため、最初に出現した位置の順に並ぶ
        unique_segments: dict[str, None] = {}
        for program in programs:
            for segment in cls.extractSegments(program):
                unique_segments[segment] = None
        segments = list(unique_segments.keys())
        cached = await cls.lookup(segments)

        # 翻訳済みのテキストには今回も番組情報に出現したことを記録する
        ## SQLite のバインド変数の上限を超えないよう、500 件ずつに分けて更新する
        now = int(time.time())
        cached_hashes = [cls.hashText(text) for text in cached]
        for index in range(0, len(cached_hashes), 500):
            chunk = cached_hashes[index:index + 500]
            placeholders = ','.join('?' * len(chunk))
            await db.execute(
                f"""
                UPDATE translations
                SET last_seen_at = ?
                WHERE target_language = ? AND source_hash IN ({placeholders})
                """,
                [now, cls.TARGET_LANGUAGE, *chunk],
            )

        # 長期間番組情報に出現していない翻訳キャッシュを削除する
        await db.execute(
            """
            DELETE FROM translations
            WHERE last_seen_at < ?
            """,
            [now - cls.CACHE_RETENTION_SECONDS],
        )
        await db.commit()

        # 未翻訳かつ、このプロセスで翻訳に失敗していないテキストのみを翻訳対象にする
        pending: list[str] = []
        for text in segments:
            if text in cached:
                continue
            if cls.hashText(text) in cls.__failed_hashes:
                continue
            pending.append(text)

        # 翻訳対象のテキストがなければ終了
        if len(pending) == 0:
            return
        logging.info(f'EPG translation: {len(pending)} texts to translate ({len(segments) - len(pending)} cached).')

        # 翻訳対象のテキストを1回の Ollama リクエストに収まるバッチに分割する
        ## 文字数か件数の上限を超える場合は新しいバッチを始め、上限を超える長いテキストはそれ単体で1つのバッチにする
        batches: list[list[str]] = []
        batch: list[str] = []
        batch_chars = 0
        for text in pending:
            is_batch_full = batch_chars + len(text) > cls.BATCH_MAX_CHARS or len(batch) >= cls.BATCH_MAX_SEGMENTS
            if len(batch) > 0 and is_batch_full:
                batches.append(batch)
                batch = []
                batch_chars = 0
            batch.append(text)
            batch_chars += len(text)
        if len(batch) > 0:
            batches.append(batch)

        model = Config().translation.model
        translated_count = 0

        # LLM の生成には時間がかかるため、読み取りタイムアウトは長めに取る
        async with httpx.AsyncClient(timeout=httpx.Timeout(300.0, connect=5.0)) as client:
            for batch in batches:
                try:
                    translations = await cls.requestTranslation(client, batch)
                # Ollama が停止している・応答が壊れているなどの場合は、今回の翻訳処理を打ち切って次回に再試行する
                except (httpx.HTTPError, json.JSONDecodeError, KeyError) as ex:
                    logging.warning(f'EPG translation: Ollama request failed, retrying on the next run. ({ex.__class__.__name__}: {ex})')
                    break

                # バッチ中に翻訳に失敗したテキストがあれば、1件ずつ単独で翻訳し直す
                ## 複数件をまとめると LLM が一部を取りこぼすことがあるが、単独なら翻訳できることが多い
                if len(batch) > 1:
                    for text in batch:
                        if text in translations:
                            continue
                        try:
                            translations.update(await cls.requestTranslation(client, [text]))
                        # 単独での再翻訳の失敗は、直後に失敗したテキストとして記録する
                        except (httpx.HTTPError, json.JSONDecodeError, KeyError):
                            pass

                # それでも翻訳できなかったテキストは、プロセスの再起動まで翻訳をスキップする
                for text in batch:
                    if text not in translations:
                        cls.__failed_hashes.add(cls.hashText(text))

                # 翻訳処理が途中で中断されても翻訳結果が残るよう、バッチごとにコミットする
                now = int(time.time())
                rows: list[tuple[str, str, str, str, str, int, int]] = []
                for source, translated in translations.items():
                    rows.append((cls.hashText(source), cls.TARGET_LANGUAGE, source, translated, model, now, now))
                await db.executemany(
                    """
                    INSERT OR REPLACE INTO translations
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    """,
                    rows,
                )
                await db.commit()
                translated_count += len(translations)

        logging.info(f'EPG translation: {translated_count} / {len(pending)} texts translated. ({round(time.time() - timestamp, 3)} sec)')


    @classmethod
    async def translatePrograms(cls, programs: list[dict[str, Any]]) -> dict[str, schemas.ProgramTranslation]:
        """
        翻訳キャッシュから番組情報の英訳を組み立てる (LLM の呼び出しは行わない)
        まだ翻訳されていないテキストは日本語の原文のまま返し、is_complete を False にする

        Args:
            programs (list[dict[str, Any]]): id・title・description・detail を含む番組情報のリスト

        Returns:
            dict[str, schemas.ProgramTranslation]: 番組 ID をキー、番組情報の英訳を値とする辞書
        """

        # 全番組の翻訳対象テキストをまとめてキャッシュから取得する
        segments: list[str] = []
        for program in programs:
            segments.extend(cls.extractSegments(program))
        translations = await cls.lookup(segments)

        # 番組ごとに、翻訳されていないテキストが1つでもあったかを記録する
        is_complete = True
        def Translate(text: str) -> str:
            nonlocal is_complete
            text = text.strip()
            # 日本語を含まないテキストはそのまま返す
            if text == '' or cls.needsTranslation(text) is False:
                return text
            # まだ翻訳されていないテキストは原文を返す
            if text not in translations:
                is_complete = False
                return text
            return translations[text]

        result: dict[str, schemas.ProgramTranslation] = {}
        for program in programs:
            is_complete = True
            title, symbols = cls.splitTitle(program['title'])

            # 番組詳細の見出しは固定訳を優先し、人名主体の本文は原文のまま返す
            detail: dict[str, str] = {}
            for key, value in cls.loadDetail(program['detail']).items():
                translated_key = cls.DETAIL_KEY_LABELS.get(key)
                if translated_key is None:
                    translated_key = Translate(key)
                if key in cls.UNTRANSLATED_DETAIL_KEYS:
                    detail[translated_key] = value
                else:
                    detail[translated_key] = Translate(value)

            # is_complete は Translate() の呼び出しで更新されるため、全テキストを翻訳してからスキーマを組み立てる
            translated_title = Translate(title)
            translated_description = Translate(program['description'])
            result[program['id']] = schemas.ProgramTranslation(
                title = translated_title,
                title_symbols = symbols,
                description = translated_description,
                detail = detail,
                is_complete = is_complete,
            )

        return result


    @classmethod
    async def close(cls) -> None:
        """
        翻訳キャッシュ DB のコネクションを閉じる
        """

        # DB を開いている場合のみ閉じる
        if cls.__db is not None:
            await cls.__db.close()
            cls.__db = None


    @classmethod
    async def getDatabase(cls) -> aiosqlite.Connection:
        """
        翻訳キャッシュ DB (data/translations.sqlite) のコネクションを取得する
        初回呼び出し時に DB を開き、テーブルが存在しなければ作成する

        翻訳キャッシュはメインの database.sqlite とは別ファイルに保存する
        メインの DB にテーブルを追加すると Aerich のマイグレーションが必要になり、upstream のマイグレーションと番号が衝突しやすい
        また別ファイルにしておけば、メインの DB をリセットしても数時間かかる初回翻訳の結果を引き継げる

        Returns:
            aiosqlite.Connection: 翻訳キャッシュ DB のコネクション
        """

        # まだ DB を開いていない場合のみ開く
        if cls.__db is None:
            db = await aiosqlite.connect(DATA_DIR / 'translations.sqlite')

            # 翻訳処理での書き込み中も API から読み込めるよう、WAL モードにする
            await db.execute('PRAGMA journal_mode = WAL')

            # 原文の SHA-256 ハッシュと翻訳先言語の組をキーとする
            ## 同じ番組概要が別の日・別のチャンネルで放送されても、翻訳は1回で済む
            await db.execute(
                """
                CREATE TABLE IF NOT EXISTS translations (
                    source_hash TEXT NOT NULL,
                    target_language TEXT NOT NULL,
                    source_text TEXT NOT NULL,
                    translated_text TEXT NOT NULL,
                    model TEXT NOT NULL,
                    created_at INTEGER NOT NULL,
                    last_seen_at INTEGER NOT NULL,
                    PRIMARY KEY (source_hash, target_language)
                ) WITHOUT ROWID
                """,
            )
            await db.execute(
                """
                CREATE INDEX IF NOT EXISTS idx_translations_last_seen_at
                ON translations (last_seen_at)
                """,
            )
            await db.commit()
            cls.__db = db

        return cls.__db


    @classmethod
    async def lookup(cls, texts: list[str]) -> dict[str, str]:
        """
        翻訳キャッシュから翻訳済みのテキストを取得する

        Args:
            texts (list[str]): 原文のリスト

        Returns:
            dict[str, str]: 原文をキー、翻訳文を値とする辞書 (翻訳済みのテキストのみ含まれる)
        """

        db = await cls.getDatabase()
        hash_to_text: dict[str, str] = {}
        for text in texts:
            hash_to_text[cls.hashText(text)] = text
        hashes = list(hash_to_text.keys())
        result: dict[str, str] = {}

        # SQLite のバインド変数の上限を超えないよう、500 件ずつに分けて問い合わせる
        for index in range(0, len(hashes), 500):
            chunk = hashes[index:index + 500]
            placeholders = ','.join('?' * len(chunk))
            async with db.execute(
                f"""
                SELECT
                    source_hash,
                    translated_text
                FROM translations
                WHERE target_language = ? AND source_hash IN ({placeholders})
                """,
                [cls.TARGET_LANGUAGE, *chunk],
            ) as cursor:
                async for row in cursor:
                    source_hash: str = row[0]
                    translated_text: str = row[1]
                    result[hash_to_text[source_hash]] = translated_text

        return result


    @classmethod
    async def requestTranslation(cls, client: httpx.AsyncClient, texts: list[str]) -> dict[str, str]:
        """
        Ollama にテキストのバッチの翻訳をリクエストする

        Args:
            client (httpx.AsyncClient): HTTP クライアント
            texts (list[str]): 日本語のテキストのリスト

        Returns:
            dict[str, str]: 原文をキー、翻訳文を値とする辞書 (翻訳に成功したテキストのみ含まれる)
        """

        config = Config().translation
        ids = [str(index + 1) for index in range(len(texts))]

        # Ollama の Structured Outputs で、出力をちょうどこれらの ID を持つ JSON オブジェクトに制約する
        ## LLM が ID を取りこぼしたり、JSON の前後に説明文を付け加えたりするのを防ぐ
        ## ref: https://github.com/ollama/ollama/blob/main/docs/api.md#request-structured-outputs
        schema: dict[str, Any] = {
            'type': 'object',
            'properties': {id: {'type': 'string'} for id in ids},
            'required': ids,
        }
        response = await client.post(
            str(config.ollama_url) + 'api/chat',
            json = {
                'model': config.model,
                'messages': [
                    {'role': 'system', 'content': cls.SYSTEM_PROMPT},
                    {'role': 'user', 'content': json.dumps(dict(zip(ids, texts)), ensure_ascii=False)},
                ],
                'format': schema,
                # Qwen3 はハイブリッド推論モデルで、思考モードだと生成トークン数が何倍にも増えるが翻訳の質はほぼ同じため、思考モードを切る
                'think': False,
                'stream': False,
                'options': {
                    # 同じ原文には毎回同じ訳を返すよう、ランダム性をなくす
                    'temperature': 0,
                    'num_ctx': config.context_length,
                },
                # NVEncC などが VRAM を使えるよう、翻訳処理が終わったら早めにモデルをアンロードさせる
                'keep_alive': '5m',
            },
        )
        response.raise_for_status()
        output: dict[str, Any] = json.loads(response.json()['message']['content'])

        result: dict[str, str] = {}
        for id, text in zip(ids, texts):
            translated = output.get(id)

            # 空文字列の訳文は、LLM がそのテキストの翻訳に失敗したものとみなす
            if not isinstance(translated, str) or translated.strip() == '':
                continue
            translated = translated.strip()

            # 日本語が1割を超えて残った訳文も、翻訳に失敗したものとみなす
            ## ローマ字化しきれなかった人名などが少し残る程度は許容する
            japanese_char_count = len(cls.JAPANESE_PATTERN.findall(translated))
            if japanese_char_count > len(translated) * 0.1:
                continue
            result[text] = translated

        return result


    @classmethod
    def extractSegments(cls, program: dict[str, Any]) -> list[str]:
        """
        番組情報のうち、LLM で翻訳すべきテキストを取得する

        Args:
            program (dict[str, Any]): title・description・detail を含む番組情報

        Returns:
            list[str]: 翻訳すべきテキストのリスト (日本語を含まないテキストは除外される)
        """

        candidates: list[str] = []
        title, _ = cls.splitTitle(program['title'])
        candidates.append(title)
        candidates.append(program['description'].strip())

        # 番組詳細は、固定訳のない見出しと、人名主体ではない本文のみを翻訳対象とする
        for key, value in cls.loadDetail(program['detail']).items():
            if key not in cls.DETAIL_KEY_LABELS:
                candidates.append(key.strip())
            if key not in cls.UNTRANSLATED_DETAIL_KEYS:
                candidates.append(value.strip())

        # 日本語を含むテキストだけを返す
        segments: list[str] = []
        for candidate in candidates:
            if cls.needsTranslation(candidate):
                segments.append(candidate)

        return segments


    @classmethod
    def splitTitle(cls, title: str) -> tuple[str, list[str]]:
        """
        番組タイトルから番組記号を取り除く

        Args:
            title (str): 番組タイトル (例: "[新]ドラマ「〇〇」[字][デ]")

        Returns:
            tuple[str, list[str]]: 番組記号を除いたタイトルと、出現順の番組記号のリスト
        """

        symbols = cls.SYMBOL_PATTERN.findall(title)

        # 番組記号を取り除いた跡に残る連続した空白は1つにまとめる
        stripped = cls.SYMBOL_PATTERN.sub(' ', title)
        stripped = re.sub(r'\s{2,}', ' ', stripped).strip()

        return stripped, symbols


    @staticmethod
    def loadDetail(detail: dict[str, str] | str | None) -> dict[str, str]:
        """
        番組詳細を辞書として取得する
        Tortoise ORM のバージョンによっては、values() で取得した JSONField が JSON 文字列のまま返ってくるため、その場合はデコードする

        Args:
            detail (dict[str, str] | str | None): DB から取得した番組詳細

        Returns:
            dict[str, str]: 見出しをキー、本文を値とする番組詳細
        """

        if detail is None:
            return {}
        if isinstance(detail, str):
            return json.loads(detail)
        return detail


    @classmethod
    def needsTranslation(cls, text: str) -> bool:
        """
        テキストに日本語が含まれていて、翻訳が必要かどうかを判定する

        Args:
            text (str): 判定するテキスト

        Returns:
            bool: 翻訳が必要なら True
        """

        return cls.JAPANESE_PATTERN.search(text) is not None


    @staticmethod
    def hashText(text: str) -> str:
        """
        翻訳キャッシュのキーとなるテキストのハッシュを取得する

        Args:
            text (str): 原文

        Returns:
            str: 原文の SHA-256 ハッシュ (16進数表記)
        """

        return hashlib.sha256(text.encode('utf-8')).hexdigest()
