
/**
 * 英語 (en) のメッセージカタログ
 * ja.ts と同じキー構造を保ちつつ、各メッセージを自然な英語に翻訳したもの
 * (プロトタイプ段階では「設定 → 全般」ページ + 言語切り替え UI 分のみを収録している)
 *
 * 補足: 一部のメッセージは v-html で描画するため、<br> や <strong> などの HTML タグをそのまま値に含めている
 */
export default {
    settings: {
        general: {

            // ページ見出し
            title: 'General',

            // ***** 表示言語 *****
            language: {
                heading: 'Display Language',
                label: 'Switch the display language of the KonomiTV UI. The default is "Auto".<br>When "Auto" is selected, the UI is shown in Japanese or English according to your browser\'s language setting.<br>',
                option_auto: 'Auto (follow browser setting)',
            },

            // ***** ピン留め中チャンネルの並び替え *****
            pinned_channel: {
                heading: 'Reorder Pinned Channels',
                label: 'You can change the display order of pinned channels. Placing frequently watched channels at the top is convenient.<br>Pinned channels can be added or removed separately from the channel list on the TV home screen.<br>',
                button: 'Open Pinned Channel Reorder Settings',
            },

            // ***** 番組表の表示設定 *****
            timetable: {
                heading: 'Program Guide Display Settings',
                label: 'You can configure the channel name column width, the density of the time axis, per-genre highlight colors, and more.<br>These settings can also be opened from the settings icon at the top of the Program Guide page.<br>',
                button: 'Open Program Guide Display Settings',
            },

            // ***** プレイヤーの読み込み中に背景写真を表示する *****
            show_player_background_image: {
                heading: 'Show a background photo while the player is loading',
                label: 'A random background photo can be shown while the player is loading. This is on by default.<br>If you would rather not show a background photo, you can turn this setting off.<br>',
            },

            // ***** プレイヤー表示領域の背景色を完全な黒にする *****
            use_pure_black_player_background: {
                heading: 'Use pure black for the player area background',
                label: 'You can change the color of the letterbox bars shown above/below or beside the video to pure black. This is off by default.<br>Especially on devices with an OLED display, if the grayish glow leaking around the video bothers you, turning this on may improve it.<br>',
            },

            // ***** チャンネル一覧を実況勢いが強い順に並び替える *****
            tv_channel_sort_by_jikkyo_force: {
                heading: 'Sort the channel list by Jikkyo activity',
                label: 'When on, the channel list is sorted in descending order of Jikkyo activity (the number of comments posted to Niconico Jikkyo per minute). This is off by default.<br>Channels with equal activity, channels without Niconico Jikkyo, and channels for which activity could not be fetched are shown in the usual channel number order.<br><div class="mt-1"></div>While this setting is on, the pinned channel reorder settings are ignored. Turning this setting off makes the reorder settings take effect again.<br>',
            },

            // ***** チャンネル切り替えボタンとショートカットキーの上下方向をテレビリモコン準拠にする *****
            // label_1 / label_2 は文中にアイコンを差し込むため、<i18n-t> のスロット ({arrow_up} / {arrow_down}) で描画する
            tv_channel_up_down_buttons_reverse: {
                heading: 'Match the up/down direction of the channel switch buttons and shortcut keys to a TV remote',
                label_1: 'When on, the behavior of the channel switch buttons {arrow_up} {arrow_down} on the viewing screen and the up/down shortcut keys is reversed. This is off by default.',
                label_2: 'Just like a typical TV remote, this is recommended if you want the {arrow_up} button/key to increase the channel number and the {arrow_down} button/key to decrease it.',
            },

            // ***** チャンネル選局のキーボードショートカットを Alt/Option + 数字キー/テンキーに変更する *****
            // {modifier} には Utils.AltOrOption() の戻り値 (Alt もしくは Option) が入る
            tv_channel_selection_requires_alt_key: {
                heading: 'Change the channel selection keyboard shortcut to {modifier} + number/numpad keys',
                label: 'When on, you must hold the {modifier} key at the same time to switch to the channel matching the remote number (1-12) of a number or numpad key.<br>This is recommended if you want to avoid accidentally pressing a number key while typing a comment or tweet and unintentionally changing the channel.<br>',
            },

            // ***** 時刻を 28 時間表記で表示する *****
            use_28hour_clock: {
                heading: 'Show time in 28-hour notation',
                label: 'Displays time in the 28-hour notation (24:00 - 27:00) often used for late-night programs. This is off by default.<br>When on, 0:00 - 3:00 AM is shown as 24:00 - 27:00 of the previous day, making the airtime of late-night programs easier to understand.<br>',
            },

            // ***** 録画番組の再生中に元の放送時刻を表示する *****
            show_original_broadcast_time_during_playback: {
                heading: 'Show the original broadcast time while playing a recorded program',
                label: 'When on, the original broadcast time (aligned to the playback position) is shown instead of the current time while playing a recorded program. This is off by default.<br>While the original broadcast time is shown, an icon indicating time-shift playback is displayed to the left of the time.<br>',
            },

            // ***** 番組情報の表示言語 *****
            // label_2 は文中にアイコンを差し込むため、<i18n-t> のスロット ({icon}) で描画する
            program_info_display_language: {
                heading: 'Program information language',
                label_1: 'Sets the language used for TV program information (title, summary and details). The default is Japanese.<br>When English is selected, the English translation that the KonomiTV server machine-translated when fetching the program guide is shown. Parts that have not been translated yet are shown in Japanese.<br>',
                label_2: 'You can also switch between Japanese and English with the {icon} button in the header.',
                label_3: 'To show English, the program information translation feature must be enabled in the server settings (config.yaml). Program information for recordings and captures is always shown in Japanese.<br>',
                option_japanese: 'Japanese (original)',
                option_english: 'English (machine translation)',
            },

            // ***** デフォルトのパネルの表示状態 *****
            panel_display_state: {
                heading: 'Default panel display state',
                label: 'Sets how the panel on the right side is displayed when you open the viewing screen.<br>',
                option_restore: 'Restore the previous state',
                option_always_display: 'Always show',
                option_always_fold: 'Always fold',
            },

            // ***** テレビをみるときにデフォルトで表示されるパネルのタブ *****
            tv_panel_active_tab: {
                heading: 'Default panel tab when watching TV',
                label: 'Sets the tab shown first in the right-side panel when you open the TV viewing screen.<br>',
                option_program: 'Program Info tab',
                option_channel: 'Channel tab',
                option_comment: 'Comment tab',
                option_twitter: 'Twitter tab',
            },

            // ***** ビデオをみるときにデフォルトで表示されるパネルのタブ *****
            video_panel_active_tab: {
                heading: 'Default panel tab when watching videos',
                label: 'Sets the tab shown first in the right-side panel when you open the video viewing screen.<br>',
                option_recorded_program: 'Program Info tab',
                option_series: 'Series tab',
                option_comment: 'Comment tab',
                option_twitter: 'Twitter tab',
            },

            // ***** 視聴履歴の保持件数 *****
            video_watched_history_max_count: {
                heading: 'Number of watch history entries to keep',
                label: 'Sets how many recorded program watch history entries to keep. The default is 50.<br>When this number is exceeded, the oldest watch history entries are automatically deleted.<br>',
                suffix: 'entries',
            },

            // ***** 設定をエクスポート *****
            export: {
                heading: 'Export Settings',
                label: 'You can export (download) the settings data saved on this device (browser).<br>The downloaded settings data (KonomiTV-Settings.json) can be imported from [Import Settings]. Use this when you want to use the same settings on a KonomiTV on a different server.<br>',
                button: 'Export Settings',
            },

            // ***** 設定をインポート *****
            import: {
                heading: 'Import Settings',
                label: 'You can import settings data downloaded via [Export Settings] into this device (browser).<br>Whether My List and Watch History are included in the import can be chosen in the confirmation dialog after pressing the button.<br><strong class="text-error-lighten-1">Importing settings overwrites all current device settings. This cannot be undone.</strong><br><strong class="text-error-lighten-1">When cross-device settings sync is on, the change is reflected on all devices with sync enabled.</strong> Please proceed with care.<br>',
                file_label: 'Select settings data (KonomiTV-Settings.json)',
                button: 'Import Settings',
            },

            // ***** 設定インポートの確認ダイヤログ *****
            import_dialog: {
                title: 'Import My List and Watch History as well?',
                body: 'My List and Watch History are linked to the recorded programs on this server.<br>If you import settings from a different KonomiTV server, the stored recorded programs will differ, so unfamiliar programs may appear.<br>',
                body_strong: 'Choose "Overwrite" when restoring from a backup of the same server, and "Keep" when migrating settings to a different server.',
                data_to_import_label: 'Data to import:',
                this_device_label: 'This device:',
                counts: 'My List {mylist} / Watch History {history}',
                overwrite_button: 'Overwrite My List / Watch History<br class="smartphone-vertical-only"> and import',
                keep_button: 'Keep My List / Watch History<br class="smartphone-vertical-only"> and import',
                cancel_button: 'Cancel',
            },

            // ***** 設定を初期状態にリセット *****
            reset: {
                heading: 'Reset Settings to Default',
                label: 'You can reset the settings data saved on this device (browser) to its default values.<br><strong class="text-error-lighten-1">Resetting settings cannot be undone.</strong><br><strong class="text-error-lighten-1">When cross-device settings sync is on, the change is reflected on all devices with sync enabled.</strong> Please proceed with care.<br>',
                button: 'Reset Settings',
            },

            // ***** スナックバー等で表示するメッセージ *****
            message: {
                exported: 'Settings have been exported.',
                select_file: 'Please select the settings data to import!',
                invalid_data: 'The settings data is invalid and could not be imported.',
                imported: 'Settings have been imported.',
                reset_done: 'Settings have been reset.',
            },
        },
    },
};
