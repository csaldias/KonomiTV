#!/usr/bin/env python3

"""
Usage: uv run python -m misc.EPGTranslationModelComparison --model qwen3.5:9b --model qwen3:8b > comparison.txt
       uv run python -m misc.EPGTranslationModelComparison --model qwen3.5:9b --input samples.txt > comparison.txt

番組情報の翻訳 (EPGTranslator) に使う LLM のモデルを、同じ原文で比較するためのスクリプト。
原文は翻訳キャッシュ (data/translations.sqlite) からランダムに選ぶか、--input で指定したファイルから読み込む。
--input のファイルには、原文を `---` だけの行で区切って記述する (- を指定すると標準入力から読み込む)。
EPGTranslator と同じシステムプロンプト・同じバッチ分割で、指定したモデルごとに翻訳し、キャッシュ済みの訳文と並べて出力する。
Ollama の URL とコンテキスト長は config.yaml の translation の設定を使い、翻訳キャッシュには書き込まない。
"""

import asyncio
import json
import random
import sys
import time
from pathlib import Path

import httpx2 as httpx
import typer

from app.config import Config, LoadConfig
from app.utils.EPGTranslator import EPGTranslator


app = typer.Typer(add_completion=False)


@app.command()
def main(
    models: list[str] = typer.Option(..., '--model', help='Ollama model to compare. Can be specified multiple times.'),
    input_file: str | None = typer.Option(None, '--input', help='Text file of source texts separated by "---" lines, or "-" for stdin. If omitted, samples are taken from the translation cache.'),
    count: int = typer.Option(30, '--count', min=1, help='Number of source texts to sample from the translation cache.'),
    seed: int = typer.Option(0, '--seed', help='Random seed for sampling from the translation cache.'),
):
    # Ollama の URL などを config.yaml から読み込む
    ## 比較のためにモデル名だけを後から差し替えるので、Mirakurun への接続確認などのバリデーションは行わない
    LoadConfig(bypass_validation=True)

    # 原文をファイルから読み込む場合は、`---` だけの行で区切って1件ずつに分ける
    texts: list[str] | None = None
    if input_file is not None:
        if input_file == '-':
            content = sys.stdin.read()
        else:
            content = Path(input_file).read_text(encoding='utf-8')
        texts = []
        current_lines: list[str] = []
        for line in [*content.splitlines(), '---']:
            if line.strip() != '---':
                current_lines.append(line)
                continue
            text = '\n'.join(current_lines).strip()
            if text != '':
                texts.append(text)
            current_lines = []

    asyncio.run(Compare(models, texts, count, seed))


async def Compare(models: list[str], texts: list[str] | None, count: int, seed: int) -> None:
    """
    指定したモデルごとに原文を翻訳し、キャッシュ済みの訳文と並べて標準出力に書き出す

    Args:
        models (list[str]): 比較する Ollama のモデル名のリスト
        texts (list[str] | None): 原文のリスト (None の場合は翻訳キャッシュから選ぶ)
        count (int): 翻訳キャッシュから選ぶ原文の件数
        seed (int): 翻訳キャッシュから原文を選ぶ際の乱数のシード値
    """

    db = await EPGTranslator.getDatabase()

    # 原文の指定がなければ、翻訳キャッシュの原文から同じシード値で毎回同じものを選ぶ
    if texts is None:
        cursor = await db.execute(
            """
            SELECT source_text
            FROM translations
            WHERE target_language = ?
            ORDER BY source_hash
            """,
            [EPGTranslator.TARGET_LANGUAGE],
        )
        all_texts: list[str] = []
        for row in await cursor.fetchall():
            all_texts.append(row[0])
        if len(all_texts) == 0:
            typer.echo('The translation cache is empty. Specify source texts with --input.', err=True)
            raise typer.Exit(1)
        texts = random.Random(seed).sample(all_texts, min(count, len(all_texts)))

    # 現在のプロンプトに変更する前の訳文と比較できるよう、キャッシュ済みの訳文も取得しておく
    cached = await EPGTranslator.lookup(texts)

    # EPGTranslator.run() と同じ規則で、原文を1回の Ollama リクエストに収まるバッチに分割する
    ## 同じバッチに含まれるほかの原文も訳文に影響しうるため、実際の翻訳処理と同じ組み合わせで翻訳する
    batches: list[list[str]] = []
    batch: list[str] = []
    batch_chars = 0
    for text in texts:
        is_batch_full = batch_chars + len(text) > EPGTranslator.BATCH_MAX_CHARS or len(batch) >= EPGTranslator.BATCH_MAX_SEGMENTS
        if len(batch) > 0 and is_batch_full:
            batches.append(batch)
            batch = []
            batch_chars = 0
        batch.append(text)
        batch_chars += len(text)
    if len(batch) > 0:
        batches.append(batch)

    # モデルごとに全バッチを翻訳し、訳文と所要時間を記録する
    ## EPGTranslator.requestTranslation() は Config() のモデル名を参照するため、モデルごとに差し替えて呼び出す
    results: dict[str, dict[str, str]] = {}
    elapsed_seconds: dict[str, float] = {}
    async with httpx.AsyncClient(timeout=httpx.Timeout(300.0, connect=5.0)) as client:
        for model in models:
            Config().translation.model = model
            results[model] = {}
            timestamp = time.time()
            for index, batch in enumerate(batches):
                typer.echo(f'{model}: batch {index + 1} / {len(batches)}', err=True)
                try:
                    results[model].update(await EPGTranslator.requestTranslation(client, batch))
                # Ollama のエラーやモデルの未インストールなどで失敗したバッチは、未翻訳のまま次のバッチへ進む
                except (httpx.HTTPError, json.JSONDecodeError, KeyError) as ex:
                    typer.echo(f'{model}: batch {index + 1} failed. ({ex.__class__.__name__}: {ex})', err=True)
                    continue

                # EPGTranslator.run() と同じく、バッチ中に翻訳に失敗した原文は1件ずつ単独で翻訳し直す
                if len(batch) > 1:
                    for text in batch:
                        if text in results[model]:
                            continue
                        try:
                            results[model].update(await EPGTranslator.requestTranslation(client, [text]))
                        # 単独でも翻訳できなかった原文は、出力で翻訳の失敗として表示する
                        except (httpx.HTTPError, json.JSONDecodeError, KeyError):
                            pass
            elapsed_seconds[model] = time.time() - timestamp

    await EPGTranslator.close()

    # 原文ごとに、キャッシュ済みの訳文と各モデルの訳文を並べて出力する
    for index, text in enumerate(texts):
        typer.echo(f'==================== [{index + 1} / {len(texts)}] ====================')
        typer.echo(text)
        typer.echo('')
        typer.echo('--- cached ---')
        typer.echo(cached.get(text, '(not cached)'))
        for model in models:
            typer.echo(f'--- {model} ---')
            typer.echo(results[model].get(text, '(translation failed)'))
        typer.echo('')

    # モデルごとの翻訳できた件数と所要時間を出力する
    ## モデルの読み込み時間も含むため、所要時間は目安として扱う
    typer.echo('==================== Summary ====================')
    for model in models:
        typer.echo(f'{model}: {len(results[model])} / {len(texts)} translated in {round(elapsed_seconds[model], 1)} sec')


if __name__ == '__main__':
    app()
