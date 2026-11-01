
/**
 * 日本語 (ja) のメッセージカタログ
 * KonomiTV はもともと日本語のみで開発されてきたため、ここには UI に元から書かれていた日本語をそのまま格納する
 * (プロトタイプ段階では「設定 → 全般」ページ + 言語切り替え UI 分のみを収録している)
 *
 * 補足: 一部のメッセージは v-html で描画するため、<br> や <strong> などの HTML タグをそのまま値に含めている
 */
export default {
    settings: {

        // 設定画面全体で共通の文言
        title: '設定',
        common: {
            // 同期対象外の設定項目に表示されるバッジ (Base.vue の CSS 擬似要素から CSS 変数経由で参照される)
            sync_disabled_badge: 'デバイス間同期無効',
            // サイドナビ (幅が狭い) 用の短縮版 Twitter ラベル
            nav_twitter_short: 'Twitter 連携',
        },

        general: {

            // ページ見出し
            title: '全般',

            // ***** 表示言語 (今回新規追加した設定) *****
            language: {
                heading: '表示言語',
                label: 'KonomiTV の UI の表示言語を切り替えます。デフォルトは「自動」です。<br>「自動」を選ぶと、お使いのブラウザの言語設定に従って日本語または英語で表示されます。<br>',
                option_auto: '自動 (ブラウザの設定に従う)',
            },

            // ***** ピン留め中チャンネルの並び替え *****
            pinned_channel: {
                heading: 'ピン留め中チャンネルの並び替え',
                label: 'ピン留め中のチャンネルの表示順序を変更できます。よくみるチャンネルは先頭に配置しておくと便利です。<br>ピン留め中のチャンネルの追加・削除は、別途 TV ホーム画面のチャンネルリストから行えます。<br>',
                button: 'ピン留め中チャンネルの並び替え設定を開く',
            },

            // ***** 番組表の表示設定 *****
            timetable: {
                heading: '番組表の表示設定',
                label: '番組表のチャンネル名の表示幅、時間軸の表示密度、ジャンル別のハイライト色などを設定できます。<br>番組表ページ上部の設定アイコンからも開くことができます。<br>',
                button: '番組表の表示設定を開く',
            },

            // ***** プレイヤーの読み込み中に背景写真を表示する *****
            show_player_background_image: {
                heading: 'プレイヤーの読み込み中に背景写真を表示する',
                label: 'プレイヤーの読み込み中にランダムで背景写真を表示できます。デフォルトはオンです。<br>背景写真を表示したくない場合は、この設定をオフにできます。<br>',
            },

            // ***** プレイヤー表示領域の背景色を完全な黒にする *****
            use_pure_black_player_background: {
                heading: 'プレイヤー表示領域の背景色を完全な黒にする',
                label: '映像の上下 or 左右に表示される黒帯の色を、完全な黒に変更できます。デフォルトはオフです。<br>特に有機 EL ディスプレイを搭載したデバイスで、映像の周囲に灰色がかった光が漏れて気になるときは、この設定をオンにすると改善されるかもしれません。<br>',
            },

            // ***** チャンネル一覧を実況勢いが強い順に並び替える *****
            tv_channel_sort_by_jikkyo_force: {
                heading: 'チャンネル一覧を実況勢いが強い順に並び替える',
                label: 'オンにすると、チャンネル一覧を実況勢い (ニコニコ実況に1分間に投稿されたコメント数) が強い順に並べ替えます。デフォルトはオフです。<br>実況勢いが同じ場合や、ニコニコ実況が存在しないチャンネル、実況勢いの取得に失敗したチャンネルは、通常通りチャンネル番号順で表示されます。<br><div class="mt-1"></div>この設定がオンのときは、ピン留め中チャンネルの並び替え設定は無視されます。この設定をオフにすれば、再び並び替え設定が反映されます。<br>',
            },

            // ***** チャンネル切り替えボタンとショートカットキーの上下方向をテレビリモコン準拠にする *****
            // label_1 / label_2 は文中にアイコンを差し込むため、<i18n-t> のスロット ({arrow_up} / {arrow_down}) で描画する
            tv_channel_up_down_buttons_reverse: {
                heading: 'チャンネル切り替えボタンとショートカットキーの上下方向をテレビリモコン準拠にする',
                label_1: 'オンにすると、視聴画面のチャンネル切り替えボタン {arrow_up} {arrow_down} とショートカットキーの上下キーの動作が反転します。デフォルトはオフです。',
                label_2: '一般的なテレビリモコンと同じように、{arrow_up} ボタン/キーでチャンネル番号を上げ、{arrow_down} ボタン/キーでチャンネル番号を下げたい方におすすめです。',
            },

            // ***** チャンネル選局のキーボードショートカットを Alt/Option + 数字キー/テンキーに変更する *****
            // {modifier} には Utils.AltOrOption() の戻り値 (Alt もしくは Option) が入る
            tv_channel_selection_requires_alt_key: {
                heading: 'チャンネル選局のキーボードショートカットを {modifier} + 数字キー/テンキーに変更する',
                label: 'オンにすると、数字キーまたはテンキーに対応するリモコン番号（1～12）のチャンネルに切り替えるとき、{modifier} キーを同時に押す必要があります。<br>コメントやツイートを入力しようとして誤って数字キーを押してしまい、チャンネルが変わってしまう事態を避けたい方におすすめです。<br>',
            },

            // ***** 時刻を 28 時間表記で表示する *****
            use_28hour_clock: {
                heading: '時刻を 28 時間表記で表示する',
                label: '深夜番組でよく使われる 28 時間表記 (24 時 〜 27 時) で時刻を表示します。デフォルトはオフです。<br>オンにすると、午前 0 時 〜 3 時が前日の 24 時 〜 27 時と表示され、深夜番組の放送時間がよりわかりやすくなります。<br>',
            },

            // ***** 録画番組の再生中に元の放送時刻を表示する *****
            show_original_broadcast_time_during_playback: {
                heading: '録画番組の再生中に元の放送時刻を表示する',
                label: 'オンにすると、録画番組の再生中に現在時刻ではなく、元の放送時刻を再生位置に合わせて表示します。デフォルトはオフです。<br>元の放送時刻が表示されているときは、タイムシフト再生中であることを示すアイコンが時刻の左側に表示されます。<br>',
            },

            // ***** 番組情報の表示言語 *****
            // label_2 は文中にアイコンを差し込むため、<i18n-t> のスロット ({icon}) で描画する
            program_info_display_language: {
                heading: '番組情報の表示言語',
                label_1: 'テレビの番組情報 (番組名・番組概要・番組詳細) を表示する言語を設定します。デフォルトは日本語です。<br>英語を選択すると、KonomiTV サーバーが番組表の取得時に機械翻訳した英訳を表示します。まだ翻訳されていない部分は、日本語のまま表示されます。<br>',
                label_2: 'ヘッダーの {icon} ボタンからも、日本語と英語を切り替えられます。',
                label_3: '英語で表示するには、サーバー設定 (config.yaml) で番組情報の翻訳機能を有効にする必要があります。録画番組とキャプチャの番組情報は、常に日本語で表示されます。<br>',
                option_japanese: '日本語 (原文)',
                option_english: '英語 (機械翻訳)',
            },

            // ***** デフォルトのパネルの表示状態 *****
            panel_display_state: {
                heading: 'デフォルトのパネルの表示状態',
                label: '視聴画面を開いたときに、右側のパネルをどう表示するかを設定します。<br>',
                option_restore: '前回の状態を復元する',
                option_always_display: '常に表示する',
                option_always_fold: '常に折りたたむ',
            },

            // ***** テレビをみるときにデフォルトで表示されるパネルのタブ *****
            tv_panel_active_tab: {
                heading: 'テレビをみるときにデフォルトで表示されるパネルのタブ',
                label: 'テレビの視聴画面を開いたときに、右側のパネルで最初に表示されるタブを設定します。<br>',
                option_program: '番組情報タブ',
                option_channel: 'チャンネルタブ',
                option_comment: 'コメントタブ',
                option_twitter: 'Twitter タブ',
            },

            // ***** ビデオをみるときにデフォルトで表示されるパネルのタブ *****
            video_panel_active_tab: {
                heading: 'ビデオをみるときにデフォルトで表示されるパネルのタブ',
                label: 'ビデオの視聴画面を開いたときに、右側のパネルで最初に表示されるタブを設定します。<br>',
                option_recorded_program: '番組情報タブ',
                option_series: 'シリーズタブ',
                option_comment: 'コメントタブ',
                option_twitter: 'Twitter タブ',
            },

            // ***** 視聴履歴の保持件数 *****
            video_watched_history_max_count: {
                heading: '視聴履歴の保持件数',
                label: '録画番組の視聴履歴を何件まで保持するかを設定します。デフォルトは 50 件です。<br>この値を超えると、最も古い視聴履歴から自動的に削除されます。<br>',
                suffix: '件',
            },

            // ***** 設定をエクスポート *****
            export: {
                heading: '設定をエクスポート',
                label: 'このデバイス (ブラウザ) に保存されている設定データを、エクスポート (ダウンロード) できます。<br>ダウンロードした設定データ (KonomiTV-Settings.json) は、[設定をインポート] からインポートできます。異なるサーバーの KonomiTV を同じ設定で使いたいときなどに使ってください。<br>',
                button: '設定をエクスポート',
            },

            // ***** 設定をインポート *****
            import: {
                heading: '設定をインポート',
                label: '[設定をエクスポート] でダウンロードした設定データを、このデバイス (ブラウザ) にインポートできます。<br>マイリスト・視聴履歴を含めてインポートするかは、ボタンを押した後の確認ダイヤログで選択できます。<br><strong class="text-error-lighten-1">設定をインポートすると、現在のデバイス設定はすべて上書きされます。元に戻すことはできません。</strong><br><strong class="text-error-lighten-1">設定のデバイス間同期がオンのときは、同期が有効なすべてのデバイスに反映されます。</strong>十分ご注意ください。<br>',
                file_label: '設定データ (KonomiTV-Settings.json) を選択',
                button: '設定をインポート',
            },

            // ***** 設定インポートの確認ダイヤログ *****
            import_dialog: {
                title: 'マイリスト・視聴履歴もインポートしますか？',
                body: 'マイリストと視聴履歴は、このサーバーの録画番組と紐づいています。<br>別の KonomiTV サーバーの設定をインポートすると、保存されている録画番組が異なるため、身に覚えのない番組が表示されてしまいます。<br>',
                body_strong: '同じサーバーのバックアップから復元する際は「上書き」、別のサーバーへ設定を移行する際は「維持」を選択してください。',
                data_to_import_label: 'インポートするデータ:',
                this_device_label: 'このデバイス:',
                counts: 'マイリスト {mylist}件 / 視聴履歴 {history}件',
                overwrite_button: 'マイリスト・視聴履歴を<br class="smartphone-vertical-only">上書きしてインポート',
                keep_button: 'マイリスト・視聴履歴は<br class="smartphone-vertical-only">維持してインポート',
                cancel_button: 'キャンセル',
            },

            // ***** 設定を初期状態にリセット *****
            reset: {
                heading: '設定を初期状態にリセット',
                label: 'このデバイス (ブラウザ) に保存されている設定データを、初期状態のデフォルト値にリセットできます。<br><strong class="text-error-lighten-1">設定をリセットすると、元に戻すことはできません。</strong><br><strong class="text-error-lighten-1">設定のデバイス間同期がオンのときは、同期が有効なすべてのデバイスに反映されます。</strong>十分ご注意ください。<br>',
                button: '設定をリセット',
            },

            // ***** スナックバー等で表示するメッセージ *****
            message: {
                exported: '設定をエクスポートしました。',
                select_file: 'インポートする設定データを選択してください！',
                invalid_data: '設定データが不正なため、インポートできませんでした。',
                imported: '設定をインポートしました。',
                reset_done: '設定をリセットしました。',
            },
        },
        caption: {
            title: '字幕',
            caption_font: {
                heading: '字幕のフォント',
                label: 'プレイヤーで字幕表示をオンにしているときの、字幕のフォントを設定します。<br>',
                option_default: 'デフォルトのフォント',
            },
            always_border_caption_text: {
                heading: '字幕の文字を常に縁取りする',
                label: 'オンにすると、字幕の文字が縁取りされてより見やすくなります。とくに理由がなければ、オンにしておくのがおすすめです。<br>オフのときも、字幕データから明示的に縁取りを指定されている場合には、オンのときと同様に字幕の文字が縁取りされます。<br>',
            },
            specify_caption_opacity: {
                heading: '字幕の不透明度を指定する',
                label: 'オフのときは、字幕データから指定されている不透明度で描画します。<br>とくに理由がなければ、オフにしておくのがおすすめです。<br>',
            },
            caption_opacity: {
                heading: '字幕の不透明度',
                label: '上の [字幕の不透明度を指定する] をオンに設定したときのみ有効です。不透明度を 0 に設定すれば、字幕の背景を非表示にできます。<br>',
            },
            tv_show_superimpose: {
                heading: 'テレビをみるときに文字スーパーを表示する',
                label: '文字スーパーは、緊急地震速報の赤テロップや、NHK BS のニュース速報のテロップなどで利用されています。とくに理由がなければ、オンにしておくのがおすすめです。<br>',
            },
            video_show_superimpose: {
                heading: 'ビデオをみるときに文字スーパーを表示する',
                label: '文字スーパーは、緊急地震速報の赤テロップや、NHK BS のニュース速報のテロップなどで利用されています。録画当時の文字スーパーによるニュース速報を確認したい方以外は、オフにしておくのがおすすめです。<br>',
            },
        },
        quality: {
            title: '画質',
            quote: '視聴開始時の画質プロファイルは、デバイスの回線状況に応じて自動的に選択されます (Android のみ) 。<br>画質プロファイルは、プレイヤー下にある設定アイコン ⚙️ から変更できます。<br>',
            tab_wifi: 'Wi-Fi 回線時',
            tab_cellular: 'モバイル回線時',
            section_tv: 'テレビのライブストリーミング',
            section_video: 'ビデオのオンデマンドストリーミング',
            // {size} = 1時間あたりのおおよそのデータ量 (GB)、{mbps} = 平均ビットレート (Mbps)
            quality_suffix: '(約{size}GB/h / 平均{mbps}Mbps)',
            // ローエンド Android 向けの注意書き (テレビ・ビデオ共通)
            note_android: 'Fire HD 10 (2021) などの一部のローエンド Android (特に MediaTek SoC 搭載) デバイスでは、1080p 以上の映像描画が不安定なことが確認されています。その場合は 720p 以下の画質を選択することをおすすめします。<br>',
            // 通信節約モード非対応時の注意書き (テレビ・ビデオ共通)
            data_saver_unsupported_device: 'このデバイスでは通信節約モードがサポートされていません。',
            data_saver_unsupported_firefox: 'お使いの Firefox ブラウザでは通信節約モードがサポートされていません。',
            // 通信節約モードをオンにしたときに、Original (MPEG-2) 画質から自動で切り替えたことを伝える通知
            message_data_saver_original_auto_switch: '通信節約モードは Original (MPEG-2) 画質に対応していません。\n画質を 1080p (60fps) に自動で切り替えました。',
            // モバイル回線時に Original (MPEG-2) 画質を選択したときの通知
            message_mobile_original_quality_warning: 'Original (MPEG-2) 画質は再エンコードなしでそのまま配信するため、通信量が非常に多くなります。\nモバイル回線で屋外から視聴する際は、通信量に十分ご注意ください。',
            tv_streaming_quality: {
                heading: 'テレビのデフォルトのストリーミング画質',
                label: 'ライブ視聴時に最初に適用される、デフォルトの画質を設定します。<br>視聴中はプレイヤーの設定からいつでも変更できますが、次回視聴時はここで設定した画質に戻ります。<br>',
                note_original: '画質を [Original (MPEG-2)] に設定すると、<b>放送波の MPEG-2 を再エンコードせず直接 60fps で再生できます！</b><br><b>再生遅延・選局待ち時間・サーバー負荷を大幅に削減できるため、家の Wi-Fi で観るときにおすすめです。</b><br>（ ⚠️ 最大 20Mbps の TS を直接ストリーミングするため、屋外で使うとパケ代が大変なことになります）<br>実験的機能のため、微妙にカクついたり、低スペックな端末では再生が重くなる可能性があります。<br>',
                note_60fps: '画質を [1080p (60fps)] に設定すると、<b>通常 30fps (60i) の映像を補間し、より滑らか（ぬるぬる）な映像で視聴できます！</b>ドラマやバラエティなどを視聴するときに特におすすめです。<br>',
            },
            tv_data_saver_mode: {
                heading: 'テレビを通信節約モードで視聴する',
                label: '通信節約モードでは、圧縮率の高い H.265 / HEVC を使い、<b>画質はほぼそのまま、通信量を通常より 50% 〜 70% 削減して視聴できます！</b> サーバー PC によっては高負荷になることがあります。<br>',
                note_recommend: '通信が不安定になりがちなモバイル回線 (4G/5G)・通信速度の遅いフリー Wi-Fi から視聴するときに特におすすめです。<br>',
            },
            tv_low_latency_mode: {
                heading: 'テレビを低遅延で視聴する',
                label: '低遅延ストリーミングをオンにすると、<b>放送波との遅延を最短 0.9 秒に抑えて視聴できます！</b><br>また、約 3 秒以上遅延したときに少しだけ再生速度を早める (1.1x) ことで、滑らかにストリーミングの遅延を取り戻します。<br>',
                note: '映像がカクつきやすくなるため、<b>通信が不安定になりがちなモバイル回線やフリー Wi-Fi から視聴するときは、オフにすることをおすすめします。</b><br>',
            },
            tv_24fps_mode: {
                heading: 'テレビを 24fps モードで視聴する',
                label: '映画やアニメなど 24fps で制作された映像を検出し、本来の動きに近づけます。<br>画質で [1080p (60fps)] を選択している場合は、常に 60fps が優先されます。<br>',
                note: 'CM やニュースなど 30fps の区間は基本的にそのまま再生されます。テロップなど一部の映像では効果が安定しないことがあります。サーバーのエンコード設定によっては利用できません。<br>',
                note_original: '画質で [Original (MPEG-2)] を選択している場合は、若干描画が不安定になる可能性があります。<br>',
            },
            video_streaming_quality: {
                heading: 'ビデオのデフォルトのストリーミング画質',
                label: '録画再生時に最初に適用される、デフォルトの画質を設定します。<br>再生中はプレイヤーの設定からいつでも変更できますが、次回再生時はここで設定した画質に戻ります。<br>',
                note_original: '画質を [Original (MPEG-2)] に設定すると、<b>録画 TS の MPEG-2 を再エンコードせず直接 60fps で再生できます！</b><br><b>シーク待ち時間とサーバー負荷を大幅に削減できるため、家の Wi-Fi で観るときにおすすめです。</b><br>（ ⚠️ 数 GB ある録画ファイルを直接ストリーミングするため、屋外で使うとパケ代が大変なことになります）<br>',
                note_original_limit: '現時点では H.264 / HEVC 録画の直接再生には対応していません。デフォルト画質を [Original (MPEG-2)] にしていても、該当録画では自動的に 1080p (60fps) / 1080p (24fps モード有効時) が選択されます。<br>実験的機能のため、微妙にカクついたり、低スペックな端末では再生が重くなる可能性があります。<br>',
                note_60fps: '画質を [1080p (60fps)] に設定すると、<b>通常 30fps (60i) の映像を補間し、より滑らか（ぬるぬる）な映像で再生できます！</b>ドラマやバラエティなどを再生するときに特におすすめです。<br>',
            },
            video_data_saver_mode: {
                heading: 'ビデオを通信節約モードで再生する',
                label: '通信節約モードでは、圧縮率の高い H.265 / HEVC を使い、<b>画質はほぼそのまま、通信量を通常より 50% 〜 70% 削減して再生できます！</b> サーバー PC によっては高負荷になることがあります。<br>',
                note_recommend: '通信が不安定になりがちなモバイル回線 (4G/5G)・通信速度の遅いフリー Wi-Fi から再生するときに特におすすめです。<br>',
            },
            video_24fps_mode: {
                heading: 'ビデオを 24fps モードで再生する',
                label: '映画やアニメなど 24fps で制作された映像を検出し、本来の動きに近づけます。<br>画質で [1080p (60fps)] を選択している場合は、常に 60fps が優先されます。<br>',
                note: 'CM やニュースなど 30fps の区間は基本的にそのまま再生されます。テロップなど一部の映像では効果が安定しないことがあります。サーバーのエンコード設定によっては利用できません。<br>',
                note_original: '画質で [Original (MPEG-2)] を選択している場合は、若干描画が不安定になる可能性があります。<br>',
            },
        },
        capture: {
            title: 'キャプチャ',
            capture_save_mode: {
                heading: 'キャプチャの保存先',
                label: '<ul class="settings__item-option-list"><li><strong>ブラウザでダウンロード</strong>：お使いのデバイスのダウンロードフォルダに直接保存します。<br>シンプルですが、保存先フォルダは変更できません。<b>iPhone・iPad でホーム画面に追加したアイコンから起動した場合、ダウンロード時にファイル概要画面が表示され、視聴の妨げになる場合があります。</b></li><li><strong>サーバーにアップロード</strong>：サーバー設定で指定したフォルダに保存します。<br>どのデバイスから撮っても1つのフォルダにまとめて保存できます。サーバーに保存されたキャプチャは、キャプチャ管理画面でどのデバイスからでも閲覧・管理できます。</li></ul>',
                option_browser: 'ブラウザでダウンロード',
                option_upload_server: 'KonomiTV サーバーにアップロード',
                option_both: 'ブラウザでのダウンロードと、KonomiTV サーバーへのアップロードを両方行う',
            },
            capture_caption_mode: {
                heading: '字幕表示時のキャプチャの保存モード',
                label: '字幕表示中にキャプチャを撮るとき、映像に字幕を合成するかを設定します。<br>字幕非表示時は、常に映像 (+コメント付きキャプチャ撮影時はコメント) のみのキャプチャが保存されます。<br>',
                option_video_only: '映像のみのキャプチャを保存する',
                option_compositing_caption: '字幕を合成したキャプチャを保存する',
                option_both: '映像のみのキャプチャと、字幕を合成したキャプチャを両方保存する',
            },
            filename_pattern: {
                heading: 'キャプチャの保存ファイル名パターン',
                label: '保存時のファイル名（拡張子なし）を設定します。デフォルトは Capture_%date%-%time% です。<br>字幕を合成したキャプチャのファイル名には、自動で _caption が追加されます。<br>ファイル名パターンには、以下の TVTest 互換マクロを利用できます。<br>',
                macro_toggle_show: '利用可能な TVTest 互換マクロ一覧を表示',
                macro_toggle_hide: '利用可能な TVTest 互換マクロ一覧を非表示',
                // {base} = 生成されたキャプチャファイル名 (拡張子なし)
                preview: 'プレビュー: {base}.jpg / {base}_caption.jpg',
                // TVTest 互換マクロ一覧 (静的な HTML のため、一覧全体をひとつのキーとして v-html で描画する)
                macro_list: '<li>現在日時<ul class="ml-4"><li>%date%: 年月日 (YYYYMMDD)</li><li>%year%: 年 (YYYY)</li><li>%year2%: 年 (YY)</li><li>%month%: 月</li><li>%month2%: 月 (2桁)</li><li>%day%: 日</li><li>%day2%: 日 (2桁)</li><li>%time%: 時分秒 (時分秒 / HHMMSS)</li><li>%hour%: 時</li><li>%hour2%: 時 (2桁)</li><li>%minute%: 分</li><li>%minute2%: 分 (2桁)</li><li>%second%: 秒</li><li>%second2%: 秒 (2桁)</li><li>%day-of-week%: 曜日 (漢字)</li></ul></li><li>番組開始日時<ul class="ml-4"><li>%start-date%: 年月日 (YYYYMMDD)</li><li>%start-year%: 年 (YYYY)</li><li>%start-year2%: 年 (YY)</li><li>%start-month%: 月</li><li>%start-month2%: 月 (2桁)</li><li>%start-day%: 日</li><li>%start-day2%: 日 (2桁)</li><li>%start-time%: 時刻 (時分秒 / HHMMSS)</li><li>%start-hour%: 時</li><li>%start-hour2%: 時 (2桁)</li><li>%start-minute%: 分</li><li>%start-minute2%: 分 (2桁)</li><li>%start-second%: 秒</li><li>%start-second2%: 秒 (2桁)</li><li>%start-day-of-week%: 曜日 (漢字)</li></ul></li><li>番組終了日時<ul class="ml-4"><li>%end-date%: 年月日 (YYYYMMDD)</li><li>%end-year%: 年 (YYYY)</li><li>%end-year2%: 年 (YY)</li><li>%end-month%: 月</li><li>%end-month2%: 月 (2桁)</li><li>%end-day%: 日</li><li>%end-day2%: 日 (2桁)</li><li>%end-time%: 時分秒 (時分秒 / HHMMSS)</li><li>%end-hour%: 時</li><li>%end-hour2%: 時 (2桁)</li><li>%end-minute%: 分</li><li>%end-minute2%: 分 (2桁)</li><li>%end-second%: 秒</li><li>%end-second2%: 秒 (2桁)</li><li>%end-day-of-week%: 曜日 (漢字)</li></ul></li><li>番組長<ul class="ml-4"><li>%event-duration-hour%: 時間</li><li>%event-duration-hour2%: 時間 (2桁)</li><li>%event-duration-min%: 分</li><li>%event-duration-min2%: 分 (2桁)</li><li>%event-duration-sec%: 秒</li><li>%event-duration-sec2%: 秒 (2桁)</li></ul></li><li>%channel-name%: チャンネル名</li><li>%channel-no%: リモコン番号</li><li>%channel-no2%: リモコン番号 (2桁)</li><li>%channel-no3%: リモコン番号 (3桁)</li><li>%event-name%: 番組名</li><li>%event-id%: イベント ID</li><li>%service-name%: サービス名</li><li>%service-id%: サービス ID</li>',
            },
            capture_copy_to_clipboard: {
                heading: 'キャプチャをクリップボードにコピーする',
                label: 'オンにすると、撮ったキャプチャをクリップボードにもコピーできます。<br>iPhone・iPad などクリップボードの履歴をサポートしていない環境では、この設定をオンにしてキャプチャを撮ると、以前のクリップボードが上書きされます。注意してください。<br>',
            },
        },
        data_broadcasting: {
            title: 'データ放送',
            tv_show_data_broadcasting: {
                heading: 'テレビをみるときにデータ放送機能を利用する',
                label: 'データ放送画面自体のオン/オフは、視聴画面右側のパネルからリモコンを表示した上で、リモコンの d ボタンから切り替えられます。<br><div class="mt-1"></div>データ放送機能をオンにすると、視聴時の負荷が若干高くなります。データ放送を利用しない場合や、スペックの低い Android デバイスで動作が重い場合は、オフに設定してみてください。<br>',
            },
            enable_internet_access: {
                heading: 'データ放送からのインターネットアクセスを有効にする',
                label: 'オンにすると、データ放送機能を利用する際に、データ放送からインターネットにアクセスできるようになります。<br>たとえば紅白歌合戦の視聴者投票をはじめとした双方向番組に参加したり、ネット接続時限定のミニゲームが遊べるようになります。<br><div class="mt-1"></div>その一方で、<b>データ放送からのインターネットアクセスが有効な場合、あなたの視聴データがテレビ局に送信されることがあります。</b><br>大半のチャンネルでは個別に視聴データの送信を無効化できますが、依然プライバシー上の問題が残ります。通常はオフにしておき、双方向コンテンツを使うときだけオンにすることをおすすめします。<br>',
            },
            zip_code: {
                heading: 'お住まいの郵便番号',
                label: 'ここで設定した郵便番号をもとに、データ放送の地域情報（ニュース・天気予報など）が表示されます。<br>設定しない場合、データ放送の一部のコンテンツが利用できないことがあります。<br>',
                placeholder: '郵便番号',
                validation: '郵便番号は「000-0000」の形式で入力してください。',
            },
            prefecture: {
                heading: 'お住まいの都道府県',
                label: 'ここで設定した都道府県をもとに、データ放送の地域情報（ニュース・天気予報など）が表示されます。<br>設定しない場合、データ放送の一部のコンテンツが利用できないことがあります。<br>',
            },
            reset: {
                heading: 'データ放送の保存データをリセット',
                label: 'このデバイス（ブラウザ）に保存されているデータ放送の保存データを、初期状態にリセット (消去) できます。<br>保存データには、データ放送内のミニゲームの得点、プレゼント企画のスタンプ個数、設定などが含まれます。<br><strong class="text-error-lighten-1">保存データをリセットすると、元に戻すことはできません。十分ご注意ください。</strong><br>',
                button: '保存データをリセット',
            },
            message_reset_done: 'データ放送の保存データをリセットしました。',
            // 都道府県の選択肢 (値はデータ放送 NVRAM の内部値のため、表示名のみを表示言語ごとに切り替える)
            prefecture_option: {
                not_set: '未設定',
                hokkaido_west: '西北海道',
                hokkaido_east: '東北海道',
                aomori: '青森県',
                iwate: '岩手県',
                miyagi: '宮城県',
                akita: '秋田県',
                yamagata: '山形県',
                fukushima: '福島県',
                ibaraki: '茨城県',
                tochigi: '栃木県',
                gunma: '群馬県',
                saitama: '埼玉県',
                chiba: '千葉県',
                tokyo: '東京都 (島部を除く)',
                tokyo_islands: '東京都島部 (伊豆・小笠原諸島)',
                kanagawa: '神奈川県',
                niigata: '新潟県',
                toyama: '富山県',
                ishikawa: '石川県',
                fukui: '福井県',
                yamanashi: '山梨県',
                nagano: '長野県',
                gifu: '岐阜県',
                shizuoka: '静岡県',
                aichi: '愛知県',
                mie: '三重県',
                shiga: '滋賀県',
                kyoto: '京都府',
                osaka: '大阪府',
                hyogo: '兵庫県',
                nara: '奈良県',
                wakayama: '和歌山県',
                tottori: '鳥取県',
                shimane: '島根県',
                okayama: '岡山県',
                hiroshima: '広島県',
                yamaguchi: '山口県',
                tokushima: '徳島県',
                kagawa: '香川県',
                ehime: '愛媛県',
                kochi: '高知県',
                fukuoka: '福岡県',
                saga: '佐賀県',
                nagasaki: '長崎県',
                kumamoto: '熊本県',
                oita: '大分県',
                miyazaki: '宮崎県',
                kagoshima: '鹿児島県 (南西諸島を除く)',
                kagoshima_islands: '鹿児島県島部 (南西諸島の鹿児島県域)',
                okinawa: '沖縄県',
            },
        },
        jikkyo: {
            title: 'ニコニコ実況',
            account: {
                not_linked_name: 'ニコニコアカウントと連携していません',
                not_linked_description: 'ニコニコアカウントと連携すると、テレビを見ながらニコニコ実況にコメントできるようになります。',
                connect_button: '連携する',
                // {name} = 連携中のニコニコアカウントのユーザー名
                linked_name: '{name} と連携しています',
                niconico_user_id_label: 'Niconico User ID:',
                disconnect_button: '連携解除',
            },
            prefer_posting_to_nicolive: {
                heading: '可能であればニコニコ実況にコメントする',
                label: '<ul class="ml-4 mb-2 font-weight-bold"><li>オン：<a class="link" href="https://jk.nicovideo.jp" target="_blank">ニコニコ実況</a> に優先的にコメントを送信</li><li>オフ：<a class="link" href="https://nx-jikkyo.tsukumijima.net" target="_blank">NX-Jikkyo</a> にコメントを送信</li></ul>ニコニコ実況が利用できない場合（BS 民放など公式では廃止された実況チャンネル・ニコニコ生放送のメンテナンス中など）は、常に NX-Jikkyo にコメントします。<div class="mt-2"></div>ニコニコ実況にコメントするには、ニコニコアカウントとの連携が必要です。<br>NX-Jikkyo は「ニコニコ実況の Web 版非公式コメントビューア」＋「ニコニコ実況公式にない実況チャンネルを補完する互換コメントサーバー」で、アカウント不要でコメントできます。<br><div class="mt-2"></div>ニコニコアカウント未連携でのコメント送信時に「代わりに NX-Jikkyo にコメントします」という通知を表示しないようにするには、この設定をオフにしてください。',
            },
            comment_mute: {
                heading: 'コメントのミュート設定',
                label: '表示したくないコメントを、映像上やコメントリストに表示しないようにミュートできます。<br>',
                label_default: 'デフォルトでは、下記のミュート設定がオンになっています。<br>これらのコメントも表示したい方は、適宜オフに設定してください。<br><ul class="ml-5 mt-2"><li>露骨な表現を含むコメントをミュートする</li><li>ネガティブな表現、差別的な表現、政治的に偏った表現を含むコメントをミュートする</li><li>文字サイズが大きいコメントをミュートする</li></ul>',
                button: 'コメントのミュート設定を開く',
            },
            quote: '「コメントを表示」「コメントを無制限に表示」「コメントの不透明度」の各設定は、<br>プレイヤー下にある設定アイコン ⚙️ からも随時変更できます。<br>',
            show_comment: {
                heading: 'コメントを表示',
                label: 'プレイヤーにニコニコ実況 / NX-Jikkyo のコメントを流すかどうかを設定します。<br>コメントを非表示にしても、画面右側にあるパネルのコメントリストには表示されます。<br>',
            },
            show_comment_unlimited: {
                heading: 'コメントを無制限に表示',
                label: 'オンにすると、コメントの重なりを許容し、可能な限り多くのコメントを表示します。<br>コメントが多い番組でオンにすると、映像が見づらくなる可能性があります。<br>',
            },
            comment_opacity: {
                heading: 'コメントの不透明度',
                label: 'プレイヤーに流れるコメントの不透明度を設定します。<br>0% に設定するとコメントが完全に透明になり、100% に設定すると完全に不透明になります。<br>',
            },
            comment_speed_rate: {
                heading: 'コメントの速さ',
                label: 'プレイヤーに流れるコメントの速さを設定します。<br>たとえば 1.2 に設定すると、コメントが 1.2 倍速く流れます。<br>',
            },
            comment_font_size: {
                heading: 'コメントの文字サイズ',
                label: 'プレイヤーに流れるコメントの文字サイズの基準値を設定します。<br>実際の文字サイズは画面サイズに合わせて調整されます。デフォルトの文字サイズは 34px です。<br>',
            },
            close_comment_form_after_sending: {
                heading: 'コメント送信後にコメント入力フォームを閉じる',
                label: 'オンにすると、コメント送信後に、コメント入力フォームが自動で閉じるようになります。<br>コメント入力フォームが表示されたままだと、大半のショートカットキーが文字入力と競合して使えなくなります。とくに理由がなければ、オンにしておくのがおすすめです。<br>',
            },
            message: {
                login_required: '連携をはじめるには、KonomiTV アカウントにログインしてください。',
                popup_failed: 'ポップアップウインドウを開けませんでした。',
                auth_cancelled: 'ニコニコアカウントとの連携がキャンセルされました。',
                token_failed: 'アクセストークンの取得に失敗しました。{error}',
                token_failed_timeout: 'アクセストークンの取得に失敗しました。ニコニコで障害が発生している可能性があります。',
                userinfo_failed: 'ニコニコアカウントのユーザー情報の取得に失敗しました。{error}',
                userinfo_failed_timeout: 'ニコニコアカウントのユーザー情報の取得に失敗しました。ニコニコで障害が発生している可能性があります。',
                link_failed: 'ニコニコアカウントとの連携に失敗しました。({detail})',
                linked: 'ニコニコアカウントと連携しました。',
                unlinked: 'ニコニコアカウントとの連携を解除しました。',
            },
        },
        server: {
            title: 'サーバー設定',
            description_1: 'サーバー設定を変更するには、管理者アカウントでログインしている必要があります。<br>',
            description_2: '[サーバー設定を更新] ボタンを押さずにこのページから離れると、変更内容は破棄されます。<br>変更を反映するには KonomiTV サーバーの再起動が必要です。<br>',
            section: {
                general: '全般',
                server: 'サーバー',
                tv: 'テレビのライブストリーミング',
                video: 'ビデオのオンデマンドストリーミング',
                capture: 'キャプチャ',
                account: 'アカウント',
                maintenance: 'メンテナンス',
            },
            backend: {
                heading: '利用するバックエンド',
                label: 'EDCB・Mirakurun のいずれかを選択してください。<br>バックエンドに Mirakurun が選択されているときは、録画予約機能は利用できません。<br>',
            },
            edcb_url: {
                heading: 'EDCB (EpgTimerNW) の TCP API の URL',
                label_1: 'バックエンドに EDCB が選択されているときに利用されます。<br>tcp://edcb-namedpipe/ と指定すると、TCP API の代わりに名前付きパイプを使って通信します (ローカルのみ)。<br>',
                label_2: '一部 Windows 環境では localhost の名前解決が遅いため、ストリーミング開始までの待機時間が長くなる場合があります。EDCB と同じ PC に KonomiTV をインストールしている場合、localhost ではなく 127.0.0.1 の利用を推奨します。<br>',
            },
            mirakurun_url: {
                heading: 'Mirakurun / mirakc の HTTP API の URL',
                label: 'バックエンドに Mirakurun が選択されているときに利用されます。<br>',
                label_2: '一部 Windows 環境では localhost の名前解決が遅いため、ストリーミング開始までの待機時間が長くなる場合があります。Mirakurun / mirakc と同じ PC に KonomiTV をインストールしている場合、localhost ではなく 127.0.0.1 の利用を推奨します。<br>',
            },
            encoder: {
                heading: '利用するエンコーダー',
                label_1: 'FFmpeg はソフトウェアエンコーダーです。<br>すべての PC で利用できますが、CPU に多大な負荷がかかり、パフォーマンスが悪いです。<br>',
                label_2: 'QSVEncC・NVEncC・VCEEncC・rkmppenc はハードウェアエンコーダーです。<br>CPU 負荷が低く、パフォーマンスがとても高いです（おすすめ）。<br>',
                option_ffmpeg: 'FFmpeg : ソフトウェアエンコーダー',
                option_qsvenc: 'QSVEncC : Intel Graphics 搭載 CPU / Intel Arc GPU で利用可能',
                option_nvenc: 'NVEncC : NVIDIA GPU で利用可能',
                option_vceenc: 'VCEEncC : AMD GPU で利用可能',
                option_rkmppenc: 'rkmppenc : Rockchip RK3588 系 SoC 搭載 SBC で利用可能',
            },
            program_update_interval: {
                heading: '番組情報の更新間隔 (分)',
                label: '番組情報を EDCB または Mirakurun / mirakc から取得する間隔を設定します。デフォルトは 5 (分) です。<br>',
            },
            debug: {
                heading: 'デバッグモードを有効にする',
                label: '有効にすると、デバッグログも出力されるようになります。<br>',
            },
            debug_encoder: {
                heading: 'エンコーダーのログを有効にする',
                label: '有効にすると、ライブ視聴時のエンコーダーのログが KonomiTV/server/logs/ 以下に保存されます。<br>さらにデバッグモード有効時は、サーバーログにエンコーダーのログがリアルタイム出力されます。<br>',
            },
            port: {
                heading: 'KonomiTV サーバーのリッスンポート',
                label: 'デフォルトのリッスンポートは 7000 です。<br>',
            },
            custom_https: {
                heading: 'HTTPS リバースプロキシのカスタム HTTPS 証明書/秘密鍵ファイルへの絶対パス',
                label: '設定すると、カスタム HTTPS 証明書を使って HTTPS リバースプロキシを開始します。<br>カスタム HTTPS 証明書を有効化すると、https://192-168-x-xx.local.konomi.tv:7000/ の URL では KonomiTV にアクセスできなくなります。<br>基本空欄のままで問題ありません。HTTPS 証明書について詳細に理解している方のみ設定してください。<br>',
                cert_placeholder: '例: C:\\path\\to\\cert.pem',
                key_placeholder: '例: C:\\path\\to\\key.pem',
            },
            always_receive_tv_from_mirakurun: {
                heading: '常に Mirakurun / mirakc から放送波を受信する',
                label: '利用するバックエンドが EDCB のとき、常に Mirakurun / mirakc から放送波を受信するかを設定します。バックエンドに Mirakurun が選択されているときは効果がありません。<br><div class="mt-1"></div>KonomiTV から EDCB と Mirakurun / mirakc 両方にアクセスできる必要があります。<br>EDCB はチューナー起動やチャンネル切り替えに時間がかかるため、Mirakurun / mirakc が利用できる環境であれば、この設定を有効にするとより快適に使えます。<br>',
            },
            preferred_terrestrial_region: {
                heading: 'チャンネル表示・選局で優先するエリア (地デジ)',
                label_1: '複数の地域の放送波が受信できる環境で、リモコン番号が同じチャンネルが複数ある場合に、どのエリアのチャンネルを優先して表示・選局するかを設定します。デフォルトは未設定です。<br>',
                label_2: '優先エリアのチャンネルは枝番なし (例: Ch:011) で、それ以外のチャンネルは枝番付き (例: Ch:011-1) で表示されます。キーボードショートカットやリモコンボタンでの選局時も、優先エリアのチャンネルが選局されます。<br>',
                label_3: '設定しない場合は、(ネットワークID)-(サービスID) の数値順で優先順位が決まります。<br>',
            },
            max_alive_time: {
                heading: '誰も見ていないチャンネルのエンコードタスクを維持する秒数',
                label_1: '10 秒に設定したなら、10 秒間誰も見ていない状態が継続したらエンコードタスク（エンコーダー）を終了します。<br>',
                label_2: '0 秒に設定すると、ネット回線が瞬断したりリロードしただけでチューナーとエンコーダーの再起動が必要になり、再生復帰までに時間がかかります。余裕をもたせておく事をおすすめします。<br>',
            },
            recorded_folders: {
                heading: '録画済み番組の保存先フォルダの絶対パス',
                label_1: '指定フォルダ以下に保存されている MPEG-TS 形式の録画ファイルを KonomiTV サーバーが自動的に見つけ出し、メタデータの解析とサムネイルの作成を行います。<br>解析が完了すると、録画番組一覧から再生できるようになります。<br>',
                label_2: '複数の保存先フォルダを指定できます。フォルダやファイルのシンボリックリンクにも対応しています。<br>シンボリックリンクは実体のパスに変換されるため、同じ録画ファイルが重複スキャンされることはありません。<br>',
                placeholder: '例: E:\\TV-Record',
                add_button: '保存先フォルダを追加',
            },
            exclude_scan_paths: {
                heading: '録画フォルダのスキャン対象から除外するフォルダの絶対パス',
                label_1: '録画フォルダ以下にある一時フォルダなど、スキャン対象から除外したいサブフォルダを指定できます。<br>',
                label_2: 'シンボリックリンク解決前のパスと、解決後の実体パスの両方で前方一致判定を行います。<br>例えば、<code>E:\\TV-Record\\Temp</code> を指定すると、そのサブフォルダ以下の録画ファイルはスキャン対象から除外されます。<br>',
                placeholder: '例: E:\\TV-Record\\Trash',
                add_button: '除外フォルダを追加',
            },
            recorded_folders_polling_interval: {
                heading: 'ネットワーク上の録画フォルダの確認間隔 (分)',
                label: 'Linux で NFS や SMB (CIFS) などのネットワーク上にある録画フォルダは、ファイルの追加・変更を OS の変更通知で検知できません。そのため、この間隔で定期的にフォルダを確認します。デフォルトは 5 (分) です。<br>間隔を短くすると録画一覧への反映が早くなりますが、保存先への負荷が増加します。<br>',
            },
            upload_folders: {
                heading: 'アップロードしたキャプチャ画像の保存先フォルダの絶対パス',
                label: '{capture_link} → [キャプチャの保存先] で [KonomiTV サーバーにアップロード] または [ブラウザでのダウンロードと、KonomiTV サーバーへのアップロードを両方行う] が選択されているときに利用されます。',
                capture_link_text: '[キャプチャ]',
                label_2: '複数の保存先フォルダを指定できます。<br>先頭から順に利用され、保存先フォルダがいっぱいになったら次の保存先フォルダに保存されます。<br>',
                placeholder: '例: E:\\TV-Capture',
                add_button: '保存先フォルダを追加',
            },
            save_button: 'サーバー設定を更新',
            account_manage: {
                heading: 'アカウントの管理',
                label_1: '現在 KonomiTV に登録されているすべてのアカウントの一覧の確認、管理者権限の付与/剥奪、アカウントの削除ができます。<br>',
                label_2: 'ログイン中ユーザーの設定変更は、別途 {account_link} から行ってください。',
                account_link_text: 'アカウント設定画面',
                button: 'アカウントの管理設定を開く',
            },
            server_log: {
                heading: 'サーバーログの表示',
                label: 'KonomiTV サーバーの動作ログとアクセスログをリアルタイムで表示します。<br>サーバーの動作状況の確認やトラブルシューティングに役立ちます。<br>',
                button: 'サーバーログを表示',
            },
            update_database: {
                heading: 'KonomiTV のデータベースを更新',
                label: 'KonomiTV のデータベースに保存されている、チャンネル情報・番組情報・Twitter アカウント情報などの外部 API に依存するデータをすべて更新します。<br>即座に外部 API からのデータ更新を反映させたいときに利用してください。<br>',
                button: 'データベースを更新',
            },
            batch_scan: {
                heading: '録画フォルダの一括スキャンを手動実行',
                label_1: '録画フォルダ内のファイルは、通常 KonomiTV サーバーの起動時に自動的にスキャンされます。<br>録画ファイルが KonomiTV に正しく反映されていない場合にのみ実行してみてください。<br>',
                label_2: '<strong>大量の録画ファイルが保存されている環境では、処理完了まで数時間〜数日以上かかることがあります。</strong><br>',
                button: '録画フォルダの一括スキャンを手動実行',
                progress: '録画フォルダをスキャンしています...',
            },
            background_analysis: {
                heading: '録画ファイルのバックグラウンド解析タスクを再実行',
                label_1: '録画ファイルのメタデータ解析やサムネイル作成が完了していない場合に、これらの処理を再度実行します。<br>PC のシャットダウンなどで途中で中断してしまった場合は、このボタンから処理を再開できます。<br>',
                label_2: '<strong>大量の録画ファイルが保存されている環境では、処理完了まで数時間〜数日以上かかることがあります。</strong><br>',
                button: 'バックグラウンド解析タスクを再実行',
                progress: 'バックグラウンド解析タスクを実行しています...',
            },
            capture_scan: {
                heading: 'キャプチャフォルダの一括スキャンを手動実行',
                label_1: 'キャプチャの保存先フォルダ内の画像は、通常 KonomiTV サーバーの起動時に自動的にスキャンされます。<br>キャプチャが KonomiTV に正しく反映されていない場合にのみ実行してください。<br>',
                label_2: '<strong>大量のキャプチャが保存されている環境では、処理完了まで数時間以上かかることがあります。</strong><br>',
                progress: 'キャプチャフォルダをスキャンしています...',
                button: 'キャプチャフォルダの一括スキャンを手動実行',
            },
            database_vacuum: {
                heading: 'データベースを最適化',
                label_1: 'KonomiTV のデータベースを再構築し、キャプチャや録画番組の検索・一覧表示を高速化します。<br>キャプチャフォルダや録画フォルダの初回スキャンが完了した後、検索や一覧表示が遅い場合にのみ実行してみてください。<br>',
                label_2: '<strong>最適化中は、処理完了まで KonomiTV にアクセスできなくなります。</strong>視聴中のセッションは切断されません。<br>大量のキャプチャや録画ファイルが保存されている環境では、処理完了まで数分以上かかることがあります。<br>',
                progress: 'データベースを最適化しています...',
                button: 'データベースを最適化',
            },
            // 実行中のタスクの進捗 ({processed} = 処理した件数、{total} = 総数)
            task_progress_count: '{processed} 件',
            task_progress_count_total: '{processed} / {total} 件',
            restart: {
                heading: 'KonomiTV サーバーを再起動',
                label: 'KonomiTV サーバーを再起動します。サーバー設定の変更を反映するには再起動が必要です。<br><strong>再起動を実行すると、すべての視聴中セッションが切断されます。</strong>十分注意してください。<br>',
                button: 'KonomiTV サーバーを再起動',
            },
            shutdown: {
                heading: 'KonomiTV サーバーをシャットダウン',
                label: 'KonomiTV サーバーをシャットダウンします。<br><strong>シャットダウンを実行すると、再度手動で KonomiTV サーバーを起動するまで KonomiTV にアクセスできなくなります。</strong>十分注意してください。<br>',
                label_2: 'なお、Linux 版 KonomiTV サーバーはプロセス管理を PM2 / Docker に委譲しているため、シャットダウン後は自動で再起動されます。完全にシャットダウンするには、PM2 / Docker 側でサービスを停止してください。<br>',
                button: 'KonomiTV サーバーをシャットダウン',
            },
            message: {
                settings_updated: 'サーバー設定を更新しました。\n変更を反映するためには、KonomiTV サーバーを再起動してください。',
                database_updating: 'データベースを更新しています...',
                database_updated: 'データベースを更新しました。',
                batch_scan_starting: '録画フォルダの一括スキャンを開始しています...\n大量の録画ファイルが保存されている環境では、処理完了まで数時間〜数日以上かかることがあります。',
                batch_scan_done: '録画フォルダの一括スキャンが完了しました。\nすべての録画ファイルがデータベースに同期されているはずです。',
                analysis_starting: 'バックグラウンド解析タスクを開始しています...\n大量の録画ファイルが保存されている環境では、処理完了まで数時間〜数日以上かかることがあります。',
                analysis_done: 'バックグラウンド解析タスクの実行が完了しました。\nすべての録画番組のメタデータ解析/サムネイル生成が完了しているはずです。',
                capture_scan_starting: 'キャプチャフォルダの一括スキャンを開始しています...\n大量のキャプチャが保存されている環境では、処理完了まで数時間以上かかることがあります。',
                capture_scan_done: 'キャプチャフォルダの一括スキャンが完了しました。\nすべてのキャプチャがデータベースに同期されているはずです。',
                database_vacuum_starting: 'データベースを最適化しています...\n最適化中は、処理完了まで KonomiTV にアクセスできなくなります。',
                database_vacuum_done: 'データベースの最適化が完了しました。',
                server_restarting: 'KonomiTV サーバーを再起動しています...',
                server_restarted: 'KonomiTV サーバーを再起動しました。',
                server_shutdown: 'KonomiTV サーバーをシャットダウンしました。',
            },
            // 地デジの優先エリアの選択肢 (値はサーバー設定にそのまま保存されるため、表示名のみを表示言語ごとに切り替える)
            region_option: {
                not_set: '未設定',
                hokkaido_sapporo: '北海道（札幌）',
                hokkaido_hakodate: '北海道（函館）',
                hokkaido_asahikawa: '北海道（旭川）',
                hokkaido_obihiro: '北海道（帯広）',
                hokkaido_kushiro: '北海道（釧路）',
                hokkaido_kitami: '北海道（北見）',
                hokkaido_muroran: '北海道（室蘭）',
                aomori: '青森県',
                iwate: '岩手県',
                miyagi: '宮城県',
                akita: '秋田県',
                yamagata: '山形県',
                fukushima: '福島県',
                ibaraki: '茨城県',
                tochigi: '栃木県',
                gunma: '群馬県',
                saitama: '埼玉県',
                chiba: '千葉県',
                tokyo: '東京都',
                kanagawa: '神奈川県',
                niigata: '新潟県',
                toyama: '富山県',
                ishikawa: '石川県',
                fukui: '福井県',
                yamanashi: '山梨県',
                nagano: '長野県',
                gifu: '岐阜県',
                shizuoka: '静岡県',
                aichi: '愛知県',
                mie: '三重県',
                shiga: '滋賀県',
                kyoto: '京都府',
                osaka: '大阪府',
                hyogo: '兵庫県',
                nara: '奈良県',
                wakayama: '和歌山県',
                tottori: '鳥取県',
                shimane: '島根県',
                okayama: '岡山県',
                hiroshima: '広島県',
                yamaguchi: '山口県',
                tokushima: '徳島県',
                kagawa: '香川県',
                ehime: '愛媛県',
                kochi: '高知県',
                fukuoka: '福岡県',
                saga: '佐賀県',
                nagasaki: '長崎県',
                kumamoto: '熊本県',
                oita: '大分県',
                miyazaki: '宮崎県',
                kagoshima: '鹿児島県',
                okinawa: '沖縄県',
            },
        },
        twitter: {
            title: 'Twitter / Bluesky 連携',
            linked_heading: '連携中のアカウント',
            guide_no_link_title: 'Twitter / Bluesky アカウントと連携していません',
            guide_no_link_description: 'Twitter / Bluesky アカウントと連携すると、テレビを見ながらキャプ付きで実況ツイートしたり、ほかの実況ツイートをリアルタイムで表示できるようになります。',
            logout_button: '連携解除',
            add_twitter_button: '連携する Twitter アカウントを追加',
            add_bluesky_button: '連携する Bluesky アカウントを追加',
            account_link_heading: '紐付け中の Twitter / Bluesky アカウント',
            account_link_guide_title: '紐付け中の Twitter / Bluesky アカウントはありません',
            account_link_guide_description: 'Twitter と Bluesky のアカウントを紐付けると、視聴画面で両方のタイムラインをまとめて表示し、両方に同時に実況ツイートを投稿できます。',
            unlink_button: '紐付け解除',
            add_link_button: '紐付けを追加',
            cookie_dialog: {
                title: '連携する Twitter アカウントを追加',
                body: '<p>2023年7月以降、<a class="link" href="https://www.watch.impress.co.jp/docs/news/1475575.html" target="_blank">Twitter のサードパーティー API の有料化（個人向け API の事実上廃止）</a> により、従来の連携方法では KonomiTV から Twitter にアクセスできなくなりました。</p><p class="mt-1">そこで KonomiTV では、<strong><a class="link" href="https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc" target="_blank">Chrome 拡張機能「GET cookies.txt LOCALLY」</a> を使い、ブラウザから Netscape 形式でエクスポートした、<a class="link" href="https://x.com/" target="_blank">Web 版 Twitter</a> の Cookie データによる Twitter 連携に対応しています。</strong></p><p class="mt-2"><strong>ここで入力した Cookie データは、ローカルの KonomiTV サーバーにのみ、暗号化の上で保存されます。</strong><br>Cookie データが Twitter API 以外の外部サービスに送信されることは一切ありません。<br>Cookie を取得した際に使ったブラウザと同じブラウザで操作することを強く推奨します。</p><p class="mt-1"><strong>詳しい手順はこちら：<a class="link" href="https://github.com/tsukumijima/KonomiTV#twitter-実況機能について" target="_blank">KonomiTV への Twitter アカウント連携の手順</a></strong></p><blockquote class="mt-3">⚠️ 不審判定されないよう様々な技術的対策を施してはいますが、<strong>非公式な方法で無理やり実装しているため、今後の Twitter の仕様変更や不審判定基準の変更により、アカウントがロック・凍結される可能性も否定できません。</strong>自己の責任のもとでご利用ください。<br><p class="mt-2"><strong>📢 レート制限緩和のため、なるべく <a class="link" href="https://x.com/i/premium_sign_up" target="_blank">X Premium</a> に課金済みのアカウントでの利用をおすすめします。</strong><br>また、万が一の凍結リスクに備え、<strong>実況専用に作成したサブアカウントでの連携をおすすめします。</strong></p></blockquote><blockquote class="mt-3">📢 v0.13.0 以降では、<strong><a class="link" href="https://github.com/tsukumijima/KonomiTV/blob/master/server/app/utils/TwitterScrapeBrowser.py" target="_blank">ヘッドレスブラウザ（ウインドウが表示されないブラウザ）を使って</a> 、<a class="link" href="https://github.com/tsukumijima/KonomiTV/blob/master/server/static/zendriver_setup.js" target="_blank">Web 版 Twitter からの API コールと全く同じ方法で API リクエストを送る</a> ように改良しました！</strong><br><p class="mt-1">これまで不審判定されないよう <a class="link" href="https://github.com/tsukumijima/tweepy-authlib" target="_blank">様々な技術的対策</a> を施してきましたが、2025年11月に KonomiTV と同様の方法で Twitter API にアクセスしていた <a class="link" href="https://arkxv.com/blog/x-suspended/" target="_blank">OldTweetDeck のユーザーが一時的に大量凍結される騒動</a> (<a class="link" href="https://github.com/dimdenGD/OldTweetDeck/issues/459#issuecomment-3499066798" target="_blank">詳細</a>) が起きたことを踏まえ、より堅牢で安全なアプローチに切り替えました。<br></p><p class="mt-2"><strong>この関係で、Twitter 実況機能を使うには、KonomiTV サーバー側に <a class="link" href="https://www.google.com/chrome/" target="_blank">Google Chrome</a> または <a class="link" href="https://brave.com/ja/" target="_blank">Brave</a> がインストールされている必要があります。</strong>なお、Linux (Docker) 環境では既に Docker イメージに含まれているため不要です。また、Twitter 実況機能を使わないならインストールする必要はありません。</p><p class="mt-2">ヘッドレスブラウザは、視聴画面で Twitter パネル内の各機能を使うときにバックグラウンドで自動的に起動し、使わなくなったら自動終了します。Twitter 実況機能が使われない場合には起動しません。</p></blockquote>',
                cookie_label: 'Cookie (Netscape cookies.txt 形式)',
                cookie_placeholder: 'まず Chrome 拡張機能「Get cookies.txt LOCALLY」を PC 版 Chrome にインストールします。次に Chrome の「シークレットウインドウ」で Web 版 Twitter を開き、連携したいアカウントにのみログインします。ログインできたら、Web 版 Twitter を開いているタブで Chrome 拡張機能「Get cookies.txt LOCALLY」を起動します。その後、[Export Format:] が [Netscape] になっていることを確認してから [Copy] ボタンを押し、クリップボードにコピーされた x.com の Cookie データをこのフォームに貼り付けてください。',
                cancel: 'キャンセル',
                login: 'ログイン',
            },
            bluesky_dialog: {
                title: '連携する Bluesky アカウントを追加',
                body: '<p>Bluesky で <a class="link" href="https://bsky.app/settings/app-passwords" target="_blank">App Password</a> を発行し、Bluesky ハンドルと一緒に入力してください。</p><p class="mt-1">ここで入力された App Password は保存されません。ログイン後に、atproto SDK のセッション文字列だけを、ローカルの KonomiTV サーバーに暗号化して保存します。</p>',
                handle_label: 'Bluesky ハンドル',
                app_password_label: 'App Password',
                cancel: 'キャンセル',
                login: 'ログイン',
            },
            account_link_dialog: {
                title: 'Twitter と Bluesky のアカウントを紐付ける',
                twitter_label: 'Twitter アカウント',
                bluesky_label: 'Bluesky アカウント',
                cancel: 'キャンセル',
                add: '追加',
            },
            fold_panel_after_sending_tweet: {
                heading: 'ツイート送信後にパネルを自動で折りたたむ',
                label: 'ツイートするとき以外はできるだけ映像を大きくして観たい方におすすめです。<br>',
            },
            reset_hashtag_when_program_switches: {
                heading: '番組が切り替わったときにハッシュタグフォームをリセットする',
                label: 'チャンネルを切り替えたときや、視聴中の番組が終了し次の番組の放送が開始されたときに、ハッシュタグフォームをリセットするかを設定します。<br>オンにしておけば、「誤って前番組のハッシュタグをつけたまま、次の番組の実況ツイートをしてしまう」といったミスを防止できます。<br>',
            },
            auto_add_watching_channel_hashtag: {
                heading: '視聴中のチャンネルに対応する局タグを自動で追加する',
                label: 'オンにすると、視聴中のチャンネルに対応する局タグ (#nhk, #tokyomx など) がハッシュタグフォームに自動で追加されます。<br>なお、録画番組を視聴するときは、リアルタイム放送と誤解されないように、この設定がオンでも局タグは自動追加されません。<br>',
            },
            twitter_reply_thread: {
                heading: 'リプライツリー実況の設定 (Twitter)',
                label_1: '<strong>実況ツイートを「直前の自分の実況ツイートへのリプライ」としてつなげていくことで、X Premium 未加入アカウントでのツイート数上限を緩和し、スパム判定されづらくするための機能です。</strong>',
                label_2: '<a class="link" href="https://pc.watch.impress.co.jp/docs/news/2109474.html" target="_blank">2026年5月現在、X Premium 未加入アカウントの1日あたりのツイート数は、通常ツイートで 50 件、リプライで 200 件と大きく制限されています。</a> 実況中に1日のツイート数上限に達してしまうケースも珍しくありません。<br>このため Twitter の実況コミュニティでは、ツイート数上限の緩いリプライ機能を使い、実況ツイートをぶら下げていく「リプライツリー実況」が、苦肉の策として標準的になりつつあります。<br>リプライツリー実況なら「短期間のハッシュタグ付き通常ツイートの連投」というスパマーと間違われやすい行為を回避できるため、スパム判定確率を下げる効果も期待できます。',
                label_per_hashtag: '<strong>ハッシュタグごとにリプライツリーを切り替える（推奨）：</strong>連続した同一ハッシュタグの実況ツイートを、1つのリプライツリーにまとめます。<br>このモードではハッシュタグが変わるたびに新しいリプライツリーが開始されるため、実況ツイートが自動的に番組単位でまとまります。ハッシュタグがついていないツイートは、独立したツイートとして送信されます。',
                label_per_day: '<strong>1日ごとにリプライツリーを切り替える：</strong>ハッシュタグに関係なく、朝4時から翌朝4時直前までを1つのリプライツリーとしてまとめます。1日単位で実況ツイートをひとまとめにしたい方におすすめです。',
                label_disabled: '<strong>リプライツリー実況を行わない：</strong>すべてのツイートを独立したツイートとして送信します。従来通りの動作ですが、未課金アカウントではツイート数上限の影響を受けやすくなるほか、凍結リスクが高まる恐れもあります。',
                option_per_hashtag: 'ハッシュタグごとにリプライツリーを切り替える（推奨）',
                option_per_day: '1日ごとにリプライツリーを切り替える',
                option_disabled: 'リプライツリー実況を行わない',
            },
            bluesky_reply_thread: {
                heading: 'リプライツリー実況の設定 (Bluesky)',
                label_1: 'Bluesky は1日あたりのツイート数上限が緩いため、Twitter のように制限回避の目的でリプライツリー実況を行う必要はありません。とはいえハッシュタグごとに実況ツイートをまとめられる点は便利ですので、後で番組ごとに実況ツイートを遡りたい方は設定しておくと便利です。',
                label_2: '各モードの動作は Twitter 側と同じです。Twitter と Bluesky のアカウントを紐付けていて同時にツイートする際も、リプライツリーの状態は Twitter / Bluesky それぞれで独立して管理されます。<br>Twitter だけ実況ツイートをリプライツリーにまとめ、Bluesky では独立したポストのままにしておく、といった使い分けも可能です。',
                option_per_hashtag: 'ハッシュタグごとにリプライツリーを切り替える',
                option_per_day: '1日ごとにリプライツリーを切り替える',
                option_disabled: 'リプライツリー実況を行わない',
            },
            twitter_active_tab: {
                heading: 'デフォルトで表示される Twitter タブ内のタブ',
                label: '視聴画面を開いたときに、パネルの Twitter タブの中で最初に表示されるタブを設定します。<br>',
                option_search: 'ツイート検索タブ',
                option_timeline: 'タイムラインタブ',
                option_capture: 'キャプチャタブ',
            },
            tweet_hashtag_position: {
                heading: 'ツイートにつけるハッシュタグの位置',
                label: 'ハッシュタグをツイート本文のどの位置に追加するかを設定します。<br>',
                option_prepend: 'ツイート本文の前に追加する',
                option_append: 'ツイート本文の後に追加する',
                option_prepend_linebreak: 'ツイート本文の前に追加してから改行する',
                option_append_linebreak: 'ツイート本文の後に改行してから追加する',
            },
            tweet_capture_watermark_position: {
                heading: 'ツイートするキャプチャに番組タイトルの透かしを描画する',
                label: 'ツイートに添付するキャプチャ画像に、視聴中の番組タイトルを透かしとして描画するかを設定します。<br>透かしの描画位置は 左上・右上・左下・右下 から選択できます。<br>',
                option_none: '透かしを描画しない',
                option_top_left: '透かしをキャプチャの左上に描画する',
                option_top_right: '透かしをキャプチャの右上に描画する',
                option_bottom_left: '透かしをキャプチャの左下に描画する',
                option_bottom_right: '透かしをキャプチャの右下に描画する',
            },
            message: {
                login_required: '連携をはじめるには、KonomiTV アカウントにログインしてください。',
                cookie_required: 'Cookie を入力してください！',
                account_info_failed: 'アカウント情報を取得できませんでした。',
                twitter_linked: 'Twitter {\'@\'}{screen_name} と連携しました。',
                twitter_unlinked: 'Twitter {\'@\'}{screen_name} との連携を解除しました。',
                bluesky_handle_required: 'Bluesky ハンドルを入力してください！',
                bluesky_refetch_failed: 'Bluesky 連携情報の再取得に失敗しました。画面を再読み込みしてください。',
                bluesky_linked: 'Bluesky {\'@\'}{handle} と連携しました。',
                bluesky_unlinked: 'Bluesky {\'@\'}{handle} との連携を解除しました。',
                account_link_select_required: '紐付ける Twitter アカウントと Bluesky アカウントを選択してください。',
                account_linked: 'Twitter / Bluesky アカウントを紐付けました。',
                account_unlinked: 'Twitter / Bluesky アカウントの紐付けを解除しました。',
            },
            validation: {
                cookie_required: 'Cookie を入力してください。',
                bluesky_handle_required: 'Bluesky ハンドルを入力してください。',
                app_password_required: 'App Password を入力してください。',
            },
        },
        account: {
            title: 'アカウント',
            not_logged_in_name: 'ログインしていません',
            login_button: 'ログイン',
            admin_badge: '管理者',
            logout_button: 'ログアウト',
            register: {
                heading: 'KonomiTV アカウントにログインすると、<br>より便利な機能が使えます！',
                feature_jikkyo_heading: 'ニコニコ実況にコメントする',
                feature_jikkyo_text: 'テレビを見ながらニコニコ実況にコメントできます。別途、ニコニコアカウントとの連携が必要です。',
                feature_twitter_heading: 'Twitter 連携機能',
                feature_twitter_text: 'テレビを見ながら Twitter にツイートしたり、検索したツイートをリアルタイムで表示できます。別途、Twitter アカウントとの連携が必要です。',
                feature_sync_heading_1: '設定・マイリスト・視聴履歴などを',
                feature_sync_heading_2: 'デバイス間で同期',
                feature_sync_text: 'ピン留めしたチャンネル、マイリスト、視聴履歴など、ブラウザに保存されている各種設定をブラウザやデバイスをまたいで同期できます。',
                feature_server_heading: 'サーバー設定をブラウザから変更',
                feature_server_text: '管理者権限があれば、サーバー設定をブラウザから変更できます。一番最初に作成されたアカウントには、自動で管理者権限が付与されます。',
                description: 'KonomiTV アカウントの作成に必要なものは<br class="smartphone-vertical-only">ユーザー名とパスワードだけです。<br>アカウントはローカルに導入した<br class="smartphone-vertical-only"> KonomiTV サーバーにのみ保存されます。<br>外部のサービスには保存されませんので、ご安心ください。<br>',
                button: 'アカウントを作成',
            },
            sync_settings: {
                heading: '設定をデバイス間で同期する',
                label_1: 'KonomiTV では、設定を同じアカウントでログインしているデバイス間で同期できます！<br>同期をオンにすると、<strong>同期をオンにしているすべてのデバイスで共通の設定が使えます。</strong><br>',
                label_2: '<strong>ピン留めしたチャンネル・マイリスト・視聴履歴・ハッシュタグリストなども一緒に同期されます。</strong><br>なお、デバイス固有の設定（画質設定など）は、同期後も各デバイスで個別に反映されます。<br>',
            },
            conflict_dialog: {
                title: '設定データの競合',
                body: 'このデバイスの設定と、サーバーに保存されている設定が競合しています。<br>一度上書きすると、元に戻すことはできません。慎重に選択してください。<br>',
                override_to_server: 'サーバーに保存されている設定を、<br class="smartphone-vertical-only">このデバイスの設定で上書きする',
                override_to_client: 'このデバイスの設定を、<br class="smartphone-vertical-only">サーバーに保存されている設定で上書きする',
                cancel: 'キャンセル',
            },
            username: {
                heading: 'ユーザー名',
                label: 'KonomiTV アカウントのユーザー名を設定します。アルファベットだけでなく日本語や記号も使えます。<br>同じ KonomiTV サーバー上の他のアカウントと同じユーザー名には変更できません。<br>',
                placeholder: 'ユーザー名',
                update_button: 'ユーザー名を更新',
                validation_required: 'ユーザー名を入力してください。',
                validation_length: 'ユーザー名は2文字以上で入力してください。',
            },
            icon: {
                heading: 'アイコン画像',
                label: 'KonomiTV アカウントのアイコン画像を設定します。<br>アップロードされた画像は自動で 400×400 の正方形にリサイズされます。<br>',
                file_label: 'アイコン画像を選択',
                update_button: 'アイコン画像を更新',
            },
            password: {
                heading: '新しいパスワード',
                label: 'KonomiTV アカウントの新しいパスワードを設定します。<br>',
                placeholder: '新しいパスワード',
                update_button: 'パスワードを更新',
                validation_required: 'パスワードを入力してください。',
                validation_format: 'パスワードは4文字以上の半角英数記号を入力してください。',
            },
            delete: {
                heading: 'アカウントを削除',
                label: '現在ログインしている KonomiTV アカウントを削除します。<br><strong class="text-error-lighten-1">アカウントに紐づくすべてのデータが削除されます。元に戻すことはできません。</strong><br>',
                button: 'アカウントを削除',
            },
            delete_dialog: {
                title: '本当にアカウントを削除しますか？',
                body: 'アカウントに紐づくすべてのユーザーデータが削除されます。元に戻すことはできません。<br>本当にアカウントを削除しますか？',
                cancel: 'キャンセル',
                delete: '削除',
            },
            message: {
                sync_fetch_failed: 'サーバーから設定データを取得できませんでした。',
                icon_select_required: 'アップロードする画像を選択してください！',
            },
        },
    },
};
