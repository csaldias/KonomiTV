
/**
 * 英語 (en) のメッセージカタログ
 * ja.ts と同じキー構造を保ちつつ、各メッセージを自然な英語に翻訳したもの
 * (プロトタイプ段階では「設定 → 全般」ページ + 言語切り替え UI 分のみを収録している)
 *
 * 補足: 一部のメッセージは v-html で描画するため、<br> や <strong> などの HTML タグをそのまま値に含めている
 */
export default {
    settings: {

        // 設定画面全体で共通の文言
        title: 'Settings',
        common: {
            // 同期対象外の設定項目に表示されるバッジ (Base.vue の CSS 擬似要素から CSS 変数経由で参照される)
            sync_disabled_badge: 'Device sync disabled',
            // サイドナビ (幅が狭い) 用の短縮版 Twitter ラベル
            nav_twitter_short: 'Twitter',
        },

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
                label: 'When on, the channel list is sorted in descending order of Jikkyo activity (the number of comments posted to Niconico Jikkyo per minute). This is off by default.<br>Channels with equal activity, channels without Niconico Jikkyo, and channels for which activity could not be fetched are shown in the usual channel number order.<br>',
                label_pin_note: 'While this setting is on, the pinned channel reorder settings are ignored. Turning this setting off makes the reorder settings take effect again.<br>',
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
        caption: {
            title: 'Subtitles',
            caption_font: {
                heading: 'Subtitle font',
                label: 'Sets the font used for subtitles when subtitle display is turned on in the player.<br>',
                option_default: 'Default font',
            },
            always_border_caption_text: {
                heading: 'Always outline subtitle text',
                label: 'When on, subtitle text is outlined to make it more legible. Unless you have a specific reason, leaving this on is recommended.<br>Even when off, if outlining is explicitly specified by the subtitle data, the text is outlined just as when on.<br>',
            },
            specify_caption_opacity: {
                heading: 'Specify subtitle opacity',
                label: 'When off, subtitles are drawn at the opacity specified by the subtitle data.<br>Unless you have a specific reason, leaving this off is recommended.<br>',
            },
            caption_opacity: {
                heading: 'Subtitle opacity',
                label: 'Only effective when [Specify subtitle opacity] above is turned on. Setting the opacity to 0 hides the subtitle background.<br>',
            },
            tv_show_superimpose: {
                heading: 'Show superimposed text when watching TV',
                label: 'Superimposed text is used for things like the red Emergency Earthquake Warning ticker and NHK BS news-flash tickers. Unless you have a specific reason, leaving this on is recommended.<br>',
            },
            video_show_superimpose: {
                heading: 'Show superimposed text when watching videos',
                label: 'Superimposed text is used for things like the red Emergency Earthquake Warning ticker and NHK BS news-flash tickers. Unless you want to review news flashes from superimposed text as they were at the time of recording, leaving this off is recommended.<br>',
            },
        },
        quality: {
            title: 'Quality',
            quote: 'The quality profile applied when playback starts is selected automatically based on the device\'s network conditions (Android only).<br>The quality profile can be changed from the settings icon ⚙️ below the player.<br>',
            tab_wifi: 'On Wi-Fi',
            tab_cellular: 'On Mobile',
            section_tv: 'TV Live Streaming',
            section_video: 'Video On-Demand Streaming',
            // {size} = approximate data usage per hour (GB), {mbps} = average bitrate (Mbps)
            quality_suffix: '(approx. {size} GB/h / avg. {mbps} Mbps)',
            // Note for low-end Android devices (shared by TV and Video)
            note_android: 'On some low-end Android devices such as the Fire HD 10 (2021) (especially those with a MediaTek SoC), rendering video at 1080p or higher has been found to be unstable. In that case, selecting a quality of 720p or lower is recommended.<br>',
            // Notes shown when data saver mode is unsupported (shared by TV and Video)
            data_saver_unsupported_device: 'Data saver mode is not supported on this device.',
            data_saver_unsupported_firefox: 'Data saver mode is not supported in your Firefox browser.',
            tv_streaming_quality: {
                heading: 'Default streaming quality for TV',
                label: 'Sets the default quality applied first during live viewing.<br>You can change it anytime from the player settings while watching, but it reverts to the quality set here next time.<br>',
                note_60fps: 'When quality is set to [1080p (60fps)], <b>the usual 30fps (60i) video is interpolated so you can watch smoother (buttery) video!</b> This is especially recommended when watching dramas, variety shows, and the like.<br>',
            },
            tv_data_saver_mode: {
                heading: 'Watch TV in data saver mode',
                label: 'Data saver mode uses the highly compressed H.265 / HEVC codec, so <b>with almost no loss in quality you can watch while cutting data usage by 50% to 70% compared to normal!</b> Depending on the server PC, this may cause high load.<br>',
                note_recommend: 'This is especially recommended when watching over an unstable mobile line (4G/5G) or slow free Wi-Fi.<br>',
            },
            tv_low_latency_mode: {
                heading: 'Watch TV with low latency',
                label: 'When low-latency streaming is on, <b>you can watch with as little as 0.9 seconds of delay from the broadcast!</b><br>Also, when the delay exceeds about 3 seconds, playback speed is increased slightly (1.1x) to smoothly recover the streaming delay.<br>',
                note: 'Since video is more prone to stuttering, <b>turning this off is recommended when watching over an unstable mobile line or free Wi-Fi.</b><br>',
            },
            tv_24fps_mode: {
                heading: 'Watch TV in 24fps mode',
                label: 'Detects video produced at 24fps, such as films and anime, and brings it closer to its original motion.<br>When [1080p (60fps)] is selected as the quality, 60fps always takes priority.<br>',
                note: '30fps segments such as commercials and news are basically played back as-is. For some video such as tickers, the effect may not be stable. It may be unavailable depending on the server\'s encoding settings.<br>',
            },
            video_streaming_quality: {
                heading: 'Default streaming quality for videos',
                label: 'Sets the default quality applied first during recorded playback.<br>You can change it anytime from the player settings while playing, but it reverts to the quality set here next time.<br>',
                note_60fps: 'When quality is set to [1080p (60fps)], <b>the usual 30fps (60i) video is interpolated so you can play smoother (buttery) video!</b> This is especially recommended when playing dramas, variety shows, and the like.<br>',
            },
            video_data_saver_mode: {
                heading: 'Play videos in data saver mode',
                label: 'Data saver mode uses the highly compressed H.265 / HEVC codec, so <b>with almost no loss in quality you can play while cutting data usage by 50% to 70% compared to normal!</b> Depending on the server PC, this may cause high load.<br>',
                note_recommend: 'This is especially recommended when playing over an unstable mobile line (4G/5G) or slow free Wi-Fi.<br>',
            },
            video_24fps_mode: {
                heading: 'Play videos in 24fps mode',
                label: 'Detects video produced at 24fps, such as films and anime, and brings it closer to its original motion.<br>When [1080p (60fps)] is selected as the quality, 60fps always takes priority.<br>',
                note: '30fps segments such as commercials and news are basically played back as-is. For some video such as tickers, the effect may not be stable. It may be unavailable depending on the server\'s encoding settings.<br>',
            },
        },
        capture: {
            title: 'Captures',
            capture_save_mode: {
                heading: 'Capture save destination',
                label: '<ul class="settings__item-option-list"><li><strong>Download in browser</strong>: Saves directly to your device\'s download folder.<br>Simple, but you cannot change the destination folder. <b>On iPhone/iPad, when launched from an icon added to the home screen, a file overview screen may appear when downloading, which can get in the way of viewing.</b></li><li><strong>Upload to server</strong>: Saves to the folder specified in the server settings.<br>No matter which device you capture from, everything is saved together in one folder. To view captures from other devices, you need to share the destination folder over the network or access the server PC directly.</li></ul><p class="settings__item-note">* In the future, we plan to add a feature to view captures saved on the server PC within KonomiTV.</p>',
                option_browser: 'Download in browser',
                option_upload_server: 'Upload to KonomiTV server',
                option_both: 'Both download in the browser and upload to the KonomiTV server',
            },
            capture_caption_mode: {
                heading: 'Capture save mode when subtitles are shown',
                label: 'Sets whether to composite subtitles onto the video when taking a capture while subtitles are shown.<br>When subtitles are hidden, a capture of the video only (plus comments when taking a comment-overlaid capture) is always saved.<br>',
                option_video_only: 'Save a capture of the video only',
                option_compositing_caption: 'Save a capture with subtitles composited',
                option_both: 'Save both a video-only capture and a capture with subtitles composited',
            },
            filename_pattern: {
                heading: 'Capture filename pattern',
                label: 'Sets the filename used when saving (without extension). The default is Capture_%date%-%time%.<br>For captures with subtitles composited, _caption is automatically appended to the filename.<br>The following TVTest-compatible macros can be used in the filename pattern.<br>',
                macro_toggle_show: 'Show the list of available TVTest-compatible macros',
                macro_toggle_hide: 'Hide the list of available TVTest-compatible macros',
                // {base} = the generated capture filename (without extension)
                preview: 'Preview: {base}.jpg / {base}_caption.jpg',
                // List of TVTest-compatible macros (static HTML, rendered as a single v-html key)
                macro_list: '<li>Current date &amp; time<ul class="ml-4"><li>%date%: Date (YYYYMMDD)</li><li>%year%: Year (YYYY)</li><li>%year2%: Year (YY)</li><li>%month%: Month</li><li>%month2%: Month (2 digits)</li><li>%day%: Day</li><li>%day2%: Day (2 digits)</li><li>%time%: Time (HHMMSS)</li><li>%hour%: Hour</li><li>%hour2%: Hour (2 digits)</li><li>%minute%: Minute</li><li>%minute2%: Minute (2 digits)</li><li>%second%: Second</li><li>%second2%: Second (2 digits)</li><li>%day-of-week%: Day of week (kanji)</li></ul></li><li>Program start date &amp; time<ul class="ml-4"><li>%start-date%: Date (YYYYMMDD)</li><li>%start-year%: Year (YYYY)</li><li>%start-year2%: Year (YY)</li><li>%start-month%: Month</li><li>%start-month2%: Month (2 digits)</li><li>%start-day%: Day</li><li>%start-day2%: Day (2 digits)</li><li>%start-time%: Time (HHMMSS)</li><li>%start-hour%: Hour</li><li>%start-hour2%: Hour (2 digits)</li><li>%start-minute%: Minute</li><li>%start-minute2%: Minute (2 digits)</li><li>%start-second%: Second</li><li>%start-second2%: Second (2 digits)</li><li>%start-day-of-week%: Day of week (kanji)</li></ul></li><li>Program end date &amp; time<ul class="ml-4"><li>%end-date%: Date (YYYYMMDD)</li><li>%end-year%: Year (YYYY)</li><li>%end-year2%: Year (YY)</li><li>%end-month%: Month</li><li>%end-month2%: Month (2 digits)</li><li>%end-day%: Day</li><li>%end-day2%: Day (2 digits)</li><li>%end-time%: Time (HHMMSS)</li><li>%end-hour%: Hour</li><li>%end-hour2%: Hour (2 digits)</li><li>%end-minute%: Minute</li><li>%end-minute2%: Minute (2 digits)</li><li>%end-second%: Second</li><li>%end-second2%: Second (2 digits)</li><li>%end-day-of-week%: Day of week (kanji)</li></ul></li><li>Program duration<ul class="ml-4"><li>%event-duration-hour%: Hours</li><li>%event-duration-hour2%: Hours (2 digits)</li><li>%event-duration-min%: Minutes</li><li>%event-duration-min2%: Minutes (2 digits)</li><li>%event-duration-sec%: Seconds</li><li>%event-duration-sec2%: Seconds (2 digits)</li></ul></li><li>%channel-name%: Channel name</li><li>%channel-no%: Remote control number</li><li>%channel-no2%: Remote control number (2 digits)</li><li>%channel-no3%: Remote control number (3 digits)</li><li>%event-name%: Program name</li><li>%event-id%: Event ID</li><li>%service-name%: Service name</li><li>%service-id%: Service ID</li>',
            },
            capture_copy_to_clipboard: {
                heading: 'Copy captures to the clipboard',
                label: 'When on, captures you take are also copied to the clipboard.<br>On environments that don\'t support clipboard history, such as iPhone/iPad, taking a capture with this setting on overwrites the previous clipboard contents. Please be careful.<br>',
            },
        },
        data_broadcasting: {
            title: 'Data Broadcasting',
            tv_show_data_broadcasting: {
                heading: 'Use the data broadcasting feature when watching TV',
                label_1: 'You can toggle the data broadcasting screen itself on/off by showing the remote from the panel on the right of the viewing screen and pressing the remote\'s d button.<br>',
                label_2: 'Turning on the data broadcasting feature slightly increases the load during viewing. If you don\'t use data broadcasting, or if it runs slowly on a low-spec Android device, try setting it to off.<br>',
            },
            enable_internet_access: {
                heading: 'Enable internet access from data broadcasting',
                label_1: 'When on, data broadcasting can access the internet while the data broadcasting feature is in use.<br>For example, you can take part in interactive programs such as viewer voting during the Kohaku Uta Gassen, or play mini-games available only while connected to the internet.<br>',
                label_2: 'On the other hand, <b>when internet access from data broadcasting is enabled, your viewing data may be sent to broadcasters.</b><br>On most channels you can individually disable sending viewing data, but privacy concerns still remain. Normally we recommend leaving it off and turning it on only when using interactive content.<br>',
            },
            zip_code: {
                heading: 'Your postal code',
                label: 'Based on the postal code set here, regional data broadcasting information (news, weather forecasts, etc.) is shown.<br>If it is not set, some data broadcasting content may be unavailable.<br>',
                placeholder: 'Postal code',
                validation: 'Please enter the postal code in the format "000-0000".',
            },
            prefecture: {
                heading: 'Your prefecture',
                label: 'Based on the prefecture set here, regional data broadcasting information (news, weather forecasts, etc.) is shown.<br>If it is not set, some data broadcasting content may be unavailable.<br>',
            },
            reset: {
                heading: 'Reset saved data broadcasting data',
                label: 'You can reset (erase) the data broadcasting data saved on this device (browser) to its initial state.<br>Saved data includes mini-game scores within data broadcasting, the number of stamps for giveaway campaigns, settings, and more.<br><strong class="text-error-lighten-1">Resetting the saved data cannot be undone. Please be very careful.</strong><br>',
                button: 'Reset saved data',
            },
            message_reset_done: 'The saved data broadcasting data has been reset.',
            // Prefecture options (the values are internal data broadcasting NVRAM values, so only the display name is localized)
            prefecture_option: {
                not_set: 'Not set',
                hokkaido_west: 'Hokkaido (West)',
                hokkaido_east: 'Hokkaido (East)',
                aomori: 'Aomori',
                iwate: 'Iwate',
                miyagi: 'Miyagi',
                akita: 'Akita',
                yamagata: 'Yamagata',
                fukushima: 'Fukushima',
                ibaraki: 'Ibaraki',
                tochigi: 'Tochigi',
                gunma: 'Gunma',
                saitama: 'Saitama',
                chiba: 'Chiba',
                tokyo: 'Tokyo (excluding islands)',
                tokyo_islands: 'Tokyo Islands (Izu & Ogasawara)',
                kanagawa: 'Kanagawa',
                niigata: 'Niigata',
                toyama: 'Toyama',
                ishikawa: 'Ishikawa',
                fukui: 'Fukui',
                yamanashi: 'Yamanashi',
                nagano: 'Nagano',
                gifu: 'Gifu',
                shizuoka: 'Shizuoka',
                aichi: 'Aichi',
                mie: 'Mie',
                shiga: 'Shiga',
                kyoto: 'Kyoto',
                osaka: 'Osaka',
                hyogo: 'Hyogo',
                nara: 'Nara',
                wakayama: 'Wakayama',
                tottori: 'Tottori',
                shimane: 'Shimane',
                okayama: 'Okayama',
                hiroshima: 'Hiroshima',
                yamaguchi: 'Yamaguchi',
                tokushima: 'Tokushima',
                kagawa: 'Kagawa',
                ehime: 'Ehime',
                kochi: 'Kochi',
                fukuoka: 'Fukuoka',
                saga: 'Saga',
                nagasaki: 'Nagasaki',
                kumamoto: 'Kumamoto',
                oita: 'Oita',
                miyazaki: 'Miyazaki',
                kagoshima: 'Kagoshima (excluding Nansei Islands)',
                kagoshima_islands: 'Kagoshima Islands (Kagoshima area of the Nansei Islands)',
                okinawa: 'Okinawa',
            },
        },
        jikkyo: {
            title: 'Niconico Jikkyo',
            account: {
                not_linked_name: 'Not linked with a Niconico account',
                not_linked_description: 'Linking a Niconico account lets you comment on Niconico Jikkyo while watching TV.',
                connect_button: 'Link',
                // {name} = the username of the linked Niconico account
                linked_name: 'Linked with {name}',
                niconico_user_id_label: 'Niconico User ID:',
                disconnect_button: 'Unlink',
            },
            prefer_posting_to_nicolive: {
                heading: 'Comment on Niconico Jikkyo when possible',
                label: '<ul class="ml-4 mb-2 font-weight-bold"><li>On: Send comments preferentially to <a class="link" href="https://jk.nicovideo.jp" target="_blank">Niconico Jikkyo</a></li><li>Off: Send comments to <a class="link" href="https://nx-jikkyo.tsukumijima.net" target="_blank">NX-Jikkyo</a></li></ul>When Niconico Jikkyo is unavailable (officially discontinued Jikkyo channels such as BS commercial broadcasters, during Niconico Live maintenance, etc.), comments are always sent to NX-Jikkyo.',
                label_account: 'Commenting on Niconico Jikkyo requires linking a Niconico account.<br>NX-Jikkyo is an "unofficial web-based comment viewer for Niconico Jikkyo" plus a "compatible comment server that supplements Jikkyo channels not officially offered by Niconico Jikkyo", and lets you comment without an account.<br>',
                label_notice: 'To stop showing the "Commenting to NX-Jikkyo instead" notification when sending comments without a linked Niconico account, turn this setting off.',
            },
            comment_mute: {
                heading: 'Comment mute settings',
                label: 'You can mute comments you don\'t want to see so they aren\'t shown over the video or in the comment list.<br>',
                label_default: 'By default, the mute settings below are turned on.<br>If you\'d like to see these comments too, turn them off as needed.<br><ul class="ml-5 mt-2"><li>Mute comments containing explicit expressions</li><li>Mute comments containing negative, discriminatory, or politically biased expressions</li><li>Mute comments with a large font size</li></ul>',
                button: 'Open comment mute settings',
            },
            quote: 'The "Show comments", "Show unlimited comments", and "Comment opacity" settings can also be changed anytime from the settings icon ⚙️ below the player.<br>',
            show_comment: {
                heading: 'Show comments',
                label: 'Sets whether Niconico Jikkyo / NX-Jikkyo comments flow across the player.<br>Even when comments are hidden, they are still shown in the comment list in the panel on the right of the screen.<br>',
            },
            show_comment_unlimited: {
                heading: 'Show unlimited comments',
                label: 'When on, comments are allowed to overlap and as many comments as possible are shown.<br>Turning this on for programs with many comments may make the video harder to see.<br>',
            },
            comment_opacity: {
                heading: 'Comment opacity',
                label: 'Sets the opacity of comments flowing across the player.<br>Setting it to 0% makes comments completely transparent, and 100% makes them completely opaque.<br>',
            },
            comment_speed_rate: {
                heading: 'Comment speed',
                label: 'Sets the speed of comments flowing across the player.<br>For example, setting it to 1.2 makes comments flow 1.2x faster.<br>',
            },
            comment_font_size: {
                heading: 'Comment font size',
                label: 'Sets the baseline font size of comments flowing across the player.<br>The actual font size is adjusted to the screen size. The default font size is 34px.<br>',
            },
            close_comment_form_after_sending: {
                heading: 'Close the comment form after sending',
                label: 'When on, the comment form automatically closes after sending a comment.<br>While the comment form is shown, most keyboard shortcuts conflict with text input and can\'t be used. Unless you have a specific reason, leaving this on is recommended.<br>',
            },
            message: {
                login_required: 'To start linking, please log in to your KonomiTV account.',
                popup_failed: 'Could not open the popup window.',
                auth_cancelled: 'Linking with the Niconico account was cancelled.',
                token_failed: 'Failed to get the access token. {error}',
                token_failed_timeout: 'Failed to get the access token. Niconico may be experiencing an outage.',
                userinfo_failed: 'Failed to get the Niconico account\'s user information. {error}',
                userinfo_failed_timeout: 'Failed to get the Niconico account\'s user information. Niconico may be experiencing an outage.',
                link_failed: 'Failed to link the Niconico account. ({detail})',
                linked: 'Linked with the Niconico account.',
                unlinked: 'Unlinked from the Niconico account.',
            },
        },
        server: {
            title: 'Server Settings',
            description_1: 'To change the server settings, you must be logged in with an administrator account.<br>',
            description_2: 'If you leave this page without pressing the [Update Server Settings] button, your changes are discarded.<br>Restarting the KonomiTV server is required to apply changes.<br>',
            section: {
                general: 'General',
                server: 'Server',
                tv: 'TV Live Streaming',
                video: 'Video On-Demand Streaming',
                capture: 'Captures',
                account: 'Account',
                maintenance: 'Maintenance',
            },
            backend: {
                heading: 'Backend to use',
                label: 'Select either EDCB or Mirakurun.<br>When Mirakurun is selected as the backend, the recording reservation feature is unavailable.<br>',
            },
            edcb_url: {
                heading: 'TCP API URL of EDCB (EpgTimerNW)',
                label_1: 'Used when EDCB is selected as the backend.<br>If you specify tcp://edcb-namedpipe/, a named pipe is used for communication instead of the TCP API (local only).<br>',
                label_2: 'On some Windows environments, localhost name resolution is slow, which can lengthen the wait until streaming starts. If KonomiTV is installed on the same PC as EDCB, we recommend using 127.0.0.1 instead of localhost.<br>',
            },
            mirakurun_url: {
                heading: 'HTTP API URL of Mirakurun / mirakc',
                label: 'Used when Mirakurun is selected as the backend.<br>',
                label_2: 'On some Windows environments, localhost name resolution is slow, which can lengthen the wait until streaming starts. If KonomiTV is installed on the same PC as Mirakurun / mirakc, we recommend using 127.0.0.1 instead of localhost.<br>',
            },
            encoder: {
                heading: 'Encoder to use',
                label_1: 'FFmpeg is a software encoder.<br>It works on all PCs, but puts a heavy load on the CPU and has poor performance.<br>',
                label_2: 'QSVEncC, NVEncC, VCEEncC, and rkmppenc are hardware encoders.<br>They have low CPU load and very high performance (recommended).<br>',
                option_ffmpeg: 'FFmpeg: Software encoder',
                option_qsvenc: 'QSVEncC: Available on CPUs with Intel Graphics / Intel Arc GPUs',
                option_nvenc: 'NVEncC: Available on NVIDIA GPUs',
                option_vceenc: 'VCEEncC: Available on AMD GPUs',
                option_rkmppenc: 'rkmppenc: Available on SBCs with Rockchip RK3588-series SoCs',
            },
            program_update_interval: {
                heading: 'Program information update interval (minutes)',
                label: 'Sets the interval for fetching program information from EDCB or Mirakurun / mirakc. The default is 5 (minutes).<br>',
            },
            debug: {
                heading: 'Enable debug mode',
                label: 'When enabled, debug logs are also output.<br>',
            },
            debug_encoder: {
                heading: 'Enable encoder logs',
                label: 'When enabled, encoder logs during live viewing are saved under KonomiTV/server/logs/.<br>Additionally, when debug mode is enabled, encoder logs are output to the server log in real time.<br>',
            },
            port: {
                heading: 'KonomiTV server listen port',
                label: 'The default listen port is 7000.<br>',
            },
            custom_https: {
                heading: 'Absolute path to a custom HTTPS certificate/private key file for the HTTPS reverse proxy',
                label: 'When set, the HTTPS reverse proxy starts using the custom HTTPS certificate.<br>When a custom HTTPS certificate is enabled, you can no longer access KonomiTV at URLs like https://192-168-x-xx.local.konomi.tv:7000/.<br>It is fine to leave this blank in most cases. Only set it if you fully understand HTTPS certificates.<br>',
                cert_placeholder: 'e.g. C:\\path\\to\\cert.pem',
                key_placeholder: 'e.g. C:\\path\\to\\key.pem',
            },
            always_receive_tv_from_mirakurun: {
                heading: 'Always receive broadcast waves from Mirakurun / mirakc',
                label_1: 'Sets whether to always receive broadcast waves from Mirakurun / mirakc when the backend in use is EDCB. It has no effect when Mirakurun is selected as the backend.<br>',
                label_2: 'KonomiTV must be able to access both EDCB and Mirakurun / mirakc.<br>Because EDCB takes time to start tuners and switch channels, enabling this setting makes things more comfortable in environments where Mirakurun / mirakc is available.<br>',
            },
            preferred_terrestrial_region: {
                heading: 'Preferred area for channel display/selection (terrestrial)',
                label_1: 'In environments that can receive broadcast waves from multiple regions, sets which area\'s channel is preferred for display/selection when there are multiple channels with the same remote control number. The default is unset.<br>',
                label_2: 'Channels in the preferred area are shown without a branch number (e.g. Ch:011), and other channels are shown with a branch number (e.g. Ch:011-1). When selecting channels with keyboard shortcuts or remote control buttons, channels in the preferred area are selected.<br>',
                label_3: 'If not set, priority is determined by the numeric order of (network ID)-(service ID).<br>',
            },
            max_alive_time: {
                heading: 'Seconds to keep the encode task for a channel no one is watching',
                label_1: 'If set to 10 seconds, the encode task (encoder) ends after 10 seconds of no one watching.<br>',
                label_2: 'If set to 0 seconds, a brief network drop or a reload requires restarting the tuner and encoder, which takes time to resume playback. We recommend leaving some margin.<br>',
            },
            recorded_folders: {
                heading: 'Absolute path to folders for saving recorded programs',
                label_1: 'The KonomiTV server automatically finds MPEG-TS recording files saved under the specified folders, analyzes their metadata, and generates thumbnails.<br>Once analysis is complete, they can be played from the recorded programs list.<br>',
                label_2: 'You can specify multiple destination folders. Symbolic links to folders and files are also supported.<br>Symbolic links are converted to their real paths, so the same recording file is never scanned twice.<br>',
                placeholder: 'e.g. E:\\TV-Record',
                add_button: 'Add a destination folder',
            },
            exclude_scan_paths: {
                heading: 'Absolute path to folders to exclude from recording folder scans',
                label_1: 'You can specify subfolders to exclude from scanning, such as temporary folders under the recording folder.<br>',
                label_2: 'Prefix matching is performed on both the path before symbolic link resolution and the resolved real path.<br>For example, specifying <code>E:\\TV-Record\\Temp</code> excludes recording files under that subfolder from scanning.<br>',
                placeholder: 'e.g. E:\\TV-Record\\Trash',
                add_button: 'Add an excluded folder',
            },
            upload_folders: {
                heading: 'Absolute path to the folder for saving uploaded capture images',
                label: '{capture_link} → Used when [Capture save destination] is set to [Upload to KonomiTV server] or [Both download in the browser and upload to the KonomiTV server].',
                capture_link_text: '[Captures]',
                label_2: 'You can specify multiple destination folders.<br>They are used in order from the top, and when a destination folder becomes full, the next one is used.<br>',
                placeholder: 'e.g. E:\\TV-Capture',
                add_button: 'Add a destination folder',
            },
            save_button: 'Update Server Settings',
            account_manage: {
                heading: 'Manage accounts',
                label_1: 'You can view a list of all accounts currently registered in KonomiTV, grant/revoke administrator privileges, and delete accounts.<br>',
                label_2: 'To change the logged-in user\'s settings, please use the {account_link} separately.',
                account_link_text: 'account settings screen',
                button: 'Open account management settings',
            },
            server_log: {
                heading: 'View server logs',
                label: 'Displays the KonomiTV server\'s operation logs and access logs in real time.<br>Useful for checking the server\'s status and troubleshooting.<br>',
                button: 'View server logs',
            },
            update_database: {
                heading: 'Update the KonomiTV database',
                label: 'Updates all data stored in the KonomiTV database that depends on external APIs, such as channel information, program information, and Twitter account information.<br>Use this when you want to immediately reflect data updates from external APIs.<br>',
                button: 'Update the database',
            },
            batch_scan: {
                heading: 'Manually run a full scan of the recording folders',
                label_1: 'Files in the recording folders are normally scanned automatically when the KonomiTV server starts.<br>Only run this if recording files are not correctly reflected in KonomiTV.<br>',
                label_2: '<strong>In environments with a large number of recording files, this may take several hours to several days or more to complete.</strong><br>',
                button: 'Manually run a full scan of the recording folders',
            },
            background_analysis: {
                heading: 'Re-run the background analysis task for recording files',
                label_1: 'Re-runs metadata analysis and thumbnail generation for recording files when they have not been completed.<br>If it was interrupted partway, such as by a PC shutdown, you can resume the process from this button.<br>',
                label_2: '<strong>In environments with a large number of recording files, this may take several hours to several days or more to complete.</strong><br>',
                button: 'Re-run the background analysis task',
            },
            restart: {
                heading: 'Restart the KonomiTV server',
                label: 'Restarts the KonomiTV server. A restart is required to apply server setting changes.<br><strong>Running a restart disconnects all active viewing sessions.</strong> Please be careful.<br>',
                button: 'Restart the KonomiTV server',
            },
            shutdown: {
                heading: 'Shut down the KonomiTV server',
                label: 'Shuts down the KonomiTV server.<br><strong>Once shut down, you cannot access KonomiTV until you manually start the KonomiTV server again.</strong> Please be careful.<br>',
                label_2: 'Note that the Linux version of the KonomiTV server delegates process management to PM2 / Docker, so it restarts automatically after shutdown. To shut it down completely, stop the service on the PM2 / Docker side.<br>',
                button: 'Shut down the KonomiTV server',
            },
            message: {
                settings_updated: 'Server settings have been updated.\nTo apply the changes, please restart the KonomiTV server.',
                database_updating: 'Updating the database...',
                database_updated: 'The database has been updated.',
                batch_scan_starting: 'Starting a full scan of the recording folders...\nIn environments with a large number of recording files, this may take several hours to several days or more to complete.',
                batch_scan_done: 'The full scan of the recording folders is complete.\nAll recording files should be synced to the database.',
                analysis_starting: 'Starting the background analysis task...\nIn environments with a large number of recording files, this may take several hours to several days or more to complete.',
                analysis_done: 'The background analysis task has finished.\nMetadata analysis / thumbnail generation for all recorded programs should be complete.',
                server_restarting: 'Restarting the KonomiTV server...',
                server_restarted: 'The KonomiTV server has been restarted.',
                server_shutdown: 'The KonomiTV server has been shut down.',
            },
            // Terrestrial preferred-area options (values are saved to the server settings as-is, so only the display name is localized)
            region_option: {
                not_set: 'Not set',
                hokkaido_sapporo: 'Hokkaido (Sapporo)',
                hokkaido_hakodate: 'Hokkaido (Hakodate)',
                hokkaido_asahikawa: 'Hokkaido (Asahikawa)',
                hokkaido_obihiro: 'Hokkaido (Obihiro)',
                hokkaido_kushiro: 'Hokkaido (Kushiro)',
                hokkaido_kitami: 'Hokkaido (Kitami)',
                hokkaido_muroran: 'Hokkaido (Muroran)',
                aomori: 'Aomori',
                iwate: 'Iwate',
                miyagi: 'Miyagi',
                akita: 'Akita',
                yamagata: 'Yamagata',
                fukushima: 'Fukushima',
                ibaraki: 'Ibaraki',
                tochigi: 'Tochigi',
                gunma: 'Gunma',
                saitama: 'Saitama',
                chiba: 'Chiba',
                tokyo: 'Tokyo',
                kanagawa: 'Kanagawa',
                niigata: 'Niigata',
                toyama: 'Toyama',
                ishikawa: 'Ishikawa',
                fukui: 'Fukui',
                yamanashi: 'Yamanashi',
                nagano: 'Nagano',
                gifu: 'Gifu',
                shizuoka: 'Shizuoka',
                aichi: 'Aichi',
                mie: 'Mie',
                shiga: 'Shiga',
                kyoto: 'Kyoto',
                osaka: 'Osaka',
                hyogo: 'Hyogo',
                nara: 'Nara',
                wakayama: 'Wakayama',
                tottori: 'Tottori',
                shimane: 'Shimane',
                okayama: 'Okayama',
                hiroshima: 'Hiroshima',
                yamaguchi: 'Yamaguchi',
                tokushima: 'Tokushima',
                kagawa: 'Kagawa',
                ehime: 'Ehime',
                kochi: 'Kochi',
                fukuoka: 'Fukuoka',
                saga: 'Saga',
                nagasaki: 'Nagasaki',
                kumamoto: 'Kumamoto',
                oita: 'Oita',
                miyazaki: 'Miyazaki',
                kagoshima: 'Kagoshima',
                okinawa: 'Okinawa',
            },
        },
        twitter: {
            title: 'Twitter / Bluesky',
            linked_heading: 'Linked accounts',
            guide_no_link_title: 'Not linked with a Twitter / Bluesky account',
            guide_no_link_description: 'Linking a Twitter / Bluesky account lets you post live tweets with captures while watching TV, and view other live tweets in real time.',
            logout_button: 'Unlink',
            add_twitter_button: 'Add a Twitter account to link',
            add_bluesky_button: 'Add a Bluesky account to link',
            account_link_heading: 'Linked Twitter / Bluesky accounts',
            account_link_guide_title: 'No Twitter / Bluesky accounts are linked together',
            account_link_guide_description: 'Linking a Twitter and a Bluesky account lets you display both timelines together on the viewing screen and post live tweets to both at the same time.',
            unlink_button: 'Unlink',
            add_link_button: 'Add a link',
            cookie_dialog: {
                title: 'Add a Twitter account to link',
                body: '<p>Since July 2023, due to <a class="link" href="https://www.watch.impress.co.jp/docs/news/1475575.html" target="_blank">Twitter making its third-party API paid (effectively abolishing the API for individuals)</a>, KonomiTV can no longer access Twitter using the previous linking method.</p><p class="mt-1"><strong>KonomiTV therefore supports Twitter linking using <a class="link" href="https://chromewebstore.google.com/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc" target="_blank">the Chrome extension "GET cookies.txt LOCALLY"</a> to export, in Netscape format from your browser, the cookie data of <a class="link" href="https://x.com/" target="_blank">the web version of Twitter</a>.</strong></p><p class="mt-2"><strong>The cookie data you enter here is stored only on your local KonomiTV server, in encrypted form.</strong><br>The cookie data is never sent to any external service other than the Twitter API.<br>We strongly recommend operating in the same browser you used to obtain the cookies.</p><p class="mt-1"><strong>Detailed steps here: <a class="link" href="https://github.com/tsukumijima/KonomiTV#twitter-実況機能について" target="_blank">How to link a Twitter account to KonomiTV</a></strong></p><blockquote class="mt-3">⚠️ Although various technical measures are in place to avoid being flagged as suspicious, <strong>because this is forcibly implemented via an unofficial method, we cannot rule out the possibility that your account may be locked or suspended due to future Twitter specification changes or changes to the suspicious-activity criteria.</strong> Please use it at your own risk.<br><p class="mt-2"><strong>📢 To ease rate limits, we recommend using an account that has paid for <a class="link" href="https://x.com/i/premium_sign_up" target="_blank">X Premium</a> whenever possible.</strong><br>Also, to prepare for the unlikely event of a suspension, <strong>we recommend linking a sub-account created specifically for live-posting.</strong></p></blockquote><blockquote class="mt-3">📢 Since v0.13.0, <strong>we improved it to <a class="link" href="https://github.com/tsukumijima/KonomiTV/blob/master/server/app/utils/TwitterScrapeBrowser.py" target="_blank">use a headless browser (a browser with no visible window)</a> and <a class="link" href="https://github.com/tsukumijima/KonomiTV/blob/master/server/static/zendriver_setup.js" target="_blank">send API requests in exactly the same way as API calls from the web version of Twitter</a>!</strong><br><p class="mt-1">We had applied <a class="link" href="https://github.com/tsukumijima/tweepy-authlib" target="_blank">various technical measures</a> to avoid being flagged as suspicious, but in light of the November 2025 incident in which <a class="link" href="https://arkxv.com/blog/x-suspended/" target="_blank">OldTweetDeck users, who accessed the Twitter API in a similar way to KonomiTV, were temporarily mass-suspended</a> (<a class="link" href="https://github.com/dimdenGD/OldTweetDeck/issues/459#issuecomment-3499066798" target="_blank">details</a>), we switched to a more robust and safe approach.<br></p><p class="mt-2"><strong>Because of this, to use the Twitter live-posting feature, <a class="link" href="https://www.google.com/chrome/" target="_blank">Google Chrome</a> or <a class="link" href="https://brave.com/ja/" target="_blank">Brave</a> must be installed on the KonomiTV server side.</strong> Note that on Linux (Docker) environments it is already included in the Docker image, so it is not needed. Also, if you don\'t use the Twitter live-posting feature, you don\'t need to install it.</p><p class="mt-2">The headless browser starts automatically in the background when you use features within the Twitter panel on the viewing screen, and shuts down automatically when no longer used. It does not start if the Twitter live-posting feature is not used.</p></blockquote>',
                cookie_label: 'Cookie (Netscape cookies.txt format)',
                cookie_placeholder: 'First, install the Chrome extension "Get cookies.txt LOCALLY" in desktop Chrome. Next, open the web version of Twitter in a Chrome "Incognito window" and log in to only the account you want to link. Once logged in, launch the "Get cookies.txt LOCALLY" extension on the tab where the web version of Twitter is open. Then, after confirming that [Export Format:] is set to [Netscape], press the [Copy] button and paste the x.com cookie data copied to your clipboard into this form.',
                cancel: 'Cancel',
                login: 'Log in',
            },
            bluesky_dialog: {
                title: 'Add a Bluesky account to link',
                body: '<p>Issue an <a class="link" href="https://bsky.app/settings/app-passwords" target="_blank">App Password</a> on Bluesky and enter it together with your Bluesky handle.</p><p class="mt-1">The App Password you enter here is not saved. After logging in, only the atproto SDK session string is saved, encrypted, on your local KonomiTV server.</p>',
                handle_label: 'Bluesky handle',
                app_password_label: 'App Password',
                cancel: 'Cancel',
                login: 'Log in',
            },
            account_link_dialog: {
                title: 'Link a Twitter and a Bluesky account',
                twitter_label: 'Twitter account',
                bluesky_label: 'Bluesky account',
                cancel: 'Cancel',
                add: 'Add',
            },
            fold_panel_after_sending_tweet: {
                heading: 'Automatically fold the panel after sending a tweet',
                label: 'Recommended for those who want to watch with the video as large as possible except when tweeting.<br>',
            },
            reset_hashtag_when_program_switches: {
                heading: 'Reset the hashtag form when the program switches',
                label: 'Sets whether to reset the hashtag form when you switch channels, or when the program you\'re watching ends and the next program starts.<br>Leaving this on prevents mistakes like "accidentally live-tweeting the next program while still using the previous program\'s hashtag".<br>',
            },
            auto_add_watching_channel_hashtag: {
                heading: 'Automatically add the station tag for the channel you\'re watching',
                label: 'When on, the station tag for the channel you\'re watching (#nhk, #tokyomx, etc.) is automatically added to the hashtag form.<br>Note that when watching recorded programs, the station tag is not automatically added even when this setting is on, so it isn\'t mistaken for a live broadcast.<br>',
            },
            twitter_reply_thread: {
                heading: 'Reply thread posting settings (Twitter)',
                label_1: '<strong>This feature connects your live tweets as "replies to your own immediately preceding live tweet", easing the tweet count limit on accounts without X Premium and making them less likely to be flagged as spam.</strong>',
                label_2: '<a class="link" href="https://pc.watch.impress.co.jp/docs/news/2109474.html" target="_blank">As of May 2026, the daily tweet count for accounts without X Premium is heavily limited to 50 regular tweets and 200 replies.</a> It\'s not uncommon to hit the daily tweet limit during live-posting.<br>For this reason, in the Twitter live-posting community, "reply thread posting"—hanging live tweets off each other using the reply feature with its looser tweet limit—is becoming a standard, if reluctant, workaround.<br>Reply thread posting also avoids "rapidly posting many regular tweets with hashtags in a short time", which is easily mistaken for spammer behavior, so it can be expected to lower the probability of being flagged as spam.',
                label_per_hashtag: '<strong>Switch reply thread per hashtag (recommended):</strong> Groups consecutive live tweets with the same hashtag into a single reply thread.<br>In this mode, a new reply thread starts each time the hashtag changes, so live tweets are automatically grouped per program. Tweets without a hashtag are sent as independent tweets.',
                label_per_day: '<strong>Switch reply thread per day:</strong> Regardless of hashtag, groups the period from 4:00 AM to just before 4:00 AM the next morning into a single reply thread. Recommended for those who want to group live tweets by day.',
                label_disabled: '<strong>Don\'t use reply thread posting:</strong> Sends all tweets as independent tweets. This is the traditional behavior, but on unpaid accounts you become more susceptible to the tweet count limit and the suspension risk may increase.',
                option_per_hashtag: 'Switch reply thread per hashtag (recommended)',
                option_per_day: 'Switch reply thread per day',
                option_disabled: 'Don\'t use reply thread posting',
            },
            bluesky_reply_thread: {
                heading: 'Reply thread posting settings (Bluesky)',
                label_1: 'Because Bluesky\'s daily post limit is loose, there\'s no need to use reply thread posting to avoid limits like on Twitter. That said, being able to group live tweets per hashtag is convenient, so it\'s handy to set this if you want to trace back live tweets per program later.',
                label_2: 'The behavior of each mode is the same as on Twitter. Even when you link Twitter and Bluesky accounts and post simultaneously, the reply thread state is managed independently for Twitter and Bluesky.<br>You can also use them differently—grouping live tweets into reply threads only on Twitter, while keeping them as independent posts on Bluesky.',
                option_per_hashtag: 'Switch reply thread per hashtag',
                option_per_day: 'Switch reply thread per day',
                option_disabled: 'Don\'t use reply thread posting',
            },
            twitter_active_tab: {
                heading: 'Default tab within the Twitter tab',
                label: 'Sets the tab shown first within the panel\'s Twitter tab when you open the viewing screen.<br>',
                option_search: 'Tweet Search tab',
                option_timeline: 'Timeline tab',
                option_capture: 'Capture tab',
            },
            tweet_hashtag_position: {
                heading: 'Position of the hashtag added to tweets',
                label: 'Sets where in the tweet body to add the hashtag.<br>',
                option_prepend: 'Add before the tweet body',
                option_append: 'Add after the tweet body',
                option_prepend_linebreak: 'Add before the tweet body, then line break',
                option_append_linebreak: 'Line break after the tweet body, then add',
            },
            tweet_capture_watermark_position: {
                heading: 'Draw a watermark of the program title on tweeted captures',
                label: 'Sets whether to draw the title of the program you\'re watching as a watermark on the capture image attached to a tweet.<br>You can choose the watermark position from top-left, top-right, bottom-left, or bottom-right.<br>',
                option_none: 'Don\'t draw a watermark',
                option_top_left: 'Draw the watermark at the top-left of the capture',
                option_top_right: 'Draw the watermark at the top-right of the capture',
                option_bottom_left: 'Draw the watermark at the bottom-left of the capture',
                option_bottom_right: 'Draw the watermark at the bottom-right of the capture',
            },
            message: {
                login_required: 'To start linking, please log in to your KonomiTV account.',
                cookie_required: 'Please enter the cookie!',
                account_info_failed: 'Could not get account information.',
                twitter_linked: 'Linked with Twitter @{screen_name}.',
                twitter_unlinked: 'Unlinked from Twitter @{screen_name}.',
                bluesky_handle_required: 'Please enter the Bluesky handle!',
                bluesky_refetch_failed: 'Failed to re-fetch Bluesky link information. Please reload the page.',
                bluesky_linked: 'Linked with Bluesky @{handle}.',
                bluesky_unlinked: 'Unlinked from Bluesky @{handle}.',
                account_link_select_required: 'Please select the Twitter account and Bluesky account to link.',
                account_linked: 'Linked the Twitter / Bluesky accounts.',
                account_unlinked: 'Unlinked the Twitter / Bluesky accounts.',
            },
            validation: {
                cookie_required: 'Please enter the cookie.',
                bluesky_handle_required: 'Please enter the Bluesky handle.',
                app_password_required: 'Please enter the App Password.',
            },
        },
        account: {
            title: 'Account',
            not_logged_in_name: 'Not logged in',
            login_button: 'Log in',
            admin_badge: 'Admin',
            logout_button: 'Log out',
            register: {
                heading: 'Logging in to a KonomiTV account<br>unlocks more convenient features!',
                feature_jikkyo_heading: 'Comment on Niconico Jikkyo',
                feature_jikkyo_text: 'You can comment on Niconico Jikkyo while watching TV. Linking a Niconico account separately is required.',
                feature_twitter_heading: 'Twitter integration',
                feature_twitter_text: 'You can tweet to Twitter while watching TV, and view searched tweets in real time. Linking a Twitter account separately is required.',
                feature_sync_heading: 'Sync settings, My List, watch history, and more<wbr> across devices',
                feature_sync_text: 'You can sync various settings saved in the browser—such as pinned channels, My List, and watch history—across browsers and devices.',
                feature_server_heading: 'Change server settings from the browser',
                feature_server_text: 'With administrator privileges, you can change server settings from the browser. The first account created is automatically granted administrator privileges.',
                description: 'All you need to create a KonomiTV account is<br class="smartphone-vertical-only"> a username and password.<br>Your account is stored only on the locally installed<br class="smartphone-vertical-only"> KonomiTV server.<br>It is not stored on any external service, so rest assured.<br>',
                button: 'Create an account',
            },
            sync_settings: {
                heading: 'Sync settings across devices',
                label_1: 'In KonomiTV, you can sync settings across devices logged in with the same account!<br>When sync is on, <strong>common settings are used across all devices with sync turned on.</strong><br>',
                label_2: '<strong>Pinned channels, My List, watch history, hashtag lists, and more are synced together.</strong><br>Note that device-specific settings (such as quality settings) are still applied individually on each device even after syncing.<br>',
            },
            conflict_dialog: {
                title: 'Settings data conflict',
                body: 'This device\'s settings conflict with the settings saved on the server.<br>Once overwritten, it cannot be undone. Please choose carefully.<br>',
                override_to_server: 'Overwrite the settings saved on the server<br class="smartphone-vertical-only"> with this device\'s settings',
                override_to_client: 'Overwrite this device\'s settings<br class="smartphone-vertical-only"> with the settings saved on the server',
                cancel: 'Cancel',
            },
            username: {
                heading: 'Username',
                label: 'Sets your KonomiTV account username. You can use not only letters but also Japanese and symbols.<br>You cannot change it to the same username as another account on the same KonomiTV server.<br>',
                placeholder: 'Username',
                update_button: 'Update username',
                validation_required: 'Please enter a username.',
                validation_length: 'Please enter a username of at least 2 characters.',
            },
            icon: {
                heading: 'Icon image',
                label: 'Sets your KonomiTV account icon image.<br>The uploaded image is automatically resized to a 400×400 square.<br>',
                file_label: 'Select an icon image',
                update_button: 'Update icon image',
            },
            password: {
                heading: 'New password',
                label: 'Sets a new password for your KonomiTV account.<br>',
                placeholder: 'New password',
                update_button: 'Update password',
                validation_required: 'Please enter a password.',
                validation_format: 'Please enter a password of at least 4 half-width alphanumeric characters or symbols.',
            },
            delete: {
                heading: 'Delete account',
                label: 'Deletes the KonomiTV account you\'re currently logged in to.<br><strong class="text-error-lighten-1">All data associated with the account will be deleted. This cannot be undone.</strong><br>',
                button: 'Delete account',
            },
            delete_dialog: {
                title: 'Are you sure you want to delete the account?',
                body: 'All user data associated with the account will be deleted. This cannot be undone.<br>Are you sure you want to delete the account?',
                cancel: 'Cancel',
                delete: 'Delete',
            },
            message: {
                sync_fetch_failed: 'Could not get settings data from the server.',
                icon_select_required: 'Please select an image to upload!',
            },
        },
    },
};
