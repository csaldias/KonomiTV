<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <Icon icon="fa-solid:sliders-h" width="19px" style="margin: 0 4px;" />
            <span class="ml-3">{{ $t('settings.general.title') }}</span>
        </h2>
        <div class="settings__content">
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.general.pinned_channel.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.pinned_channel.label')"></div>
            </div>
            <v-btn class="settings__save-button mt-4" variant="flat" @click="pinned_channel_settings_modal = !pinned_channel_settings_modal">
                <Icon icon="iconamoon:sorting-left-bold" height="19px" />
                <span class="ml-1">{{ $t('settings.general.pinned_channel.button') }}</span>
            </v-btn>
            <div class="settings__item mt-6">
                <div class="settings__item-heading">{{ $t('settings.general.timetable.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.timetable.label')"></div>
            </div>
            <v-btn class="settings__save-button mt-4" variant="flat" @click="timetable_settings_modal = !timetable_settings_modal">
                <Icon icon="fluent:calendar-ltr-16-regular" height="19px" />
                <span class="ml-1">{{ $t('settings.general.timetable.button') }}</span>
            </v-btn>
            <v-divider class="mt-6"></v-divider>
            <!-- UI の表示言語 (端末ローカル設定) -->
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.general.language.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.language.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="language_options" v-model="settingsStore.settings.language">
                </v-select>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="show_player_background_image">{{ $t('settings.general.show_player_background_image.heading') }}</label>
                <label class="settings__item-label" for="show_player_background_image" v-html="$t('settings.general.show_player_background_image.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="show_player_background_image" hide-details
                    v-model="settingsStore.settings.show_player_background_image">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="use_pure_black_player_background">{{ $t('settings.general.use_pure_black_player_background.heading') }}</label>
                <label class="settings__item-label" for="use_pure_black_player_background" v-html="$t('settings.general.use_pure_black_player_background.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="use_pure_black_player_background" hide-details
                    v-model="settingsStore.settings.use_pure_black_player_background">
                </v-switch>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="tv_channel_sort_by_jikkyo_force">{{ $t('settings.general.tv_channel_sort_by_jikkyo_force.heading') }}</label>
                <label class="settings__item-label" for="tv_channel_sort_by_jikkyo_force" v-html="$t('settings.general.tv_channel_sort_by_jikkyo_force.label')"></label>
                <label class="settings__item-label" for="tv_channel_sort_by_jikkyo_force" v-html="$t('settings.general.tv_channel_sort_by_jikkyo_force.label_pin_note')"></label>
                <v-switch class="settings__item-switch" color="primary" id="tv_channel_sort_by_jikkyo_force" hide-details
                    v-model="settingsStore.settings.tv_channel_sort_by_jikkyo_force">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="tv_channel_up_down_buttons_reverse">{{ $t('settings.general.tv_channel_up_down_buttons_reverse.heading') }}</label>
                <!-- 文中にアイコンを差し込むため、<i18n-t> のスロット (arrow_up / arrow_down) でアイコンを描画する -->
                <label class="settings__item-label" for="tv_channel_up_down_buttons_reverse">
                    <i18n-t keypath="settings.general.tv_channel_up_down_buttons_reverse.label_1" tag="span" scope="global">
                        <template #arrow_up><Icon icon="fluent:ios-arrow-left-24-filled" style="transform: rotate(90deg); margin-bottom: -4px;" /></template>
                        <template #arrow_down><Icon icon="fluent:ios-arrow-right-24-filled" style="transform: rotate(90deg); margin-top: -4px;" /></template>
                    </i18n-t>
                    <br>
                    <i18n-t keypath="settings.general.tv_channel_up_down_buttons_reverse.label_2" tag="span" scope="global">
                        <template #arrow_up><Icon icon="fluent:ios-arrow-left-24-filled" style="transform: rotate(90deg); margin-bottom: -4px;" /></template>
                        <template #arrow_down><Icon icon="fluent:ios-arrow-right-24-filled" style="transform: rotate(90deg); margin-top: -4px;" /></template>
                    </i18n-t>
                    <br>
                </label>
                <v-switch class="settings__item-switch" color="primary" id="tv_channel_up_down_buttons_reverse" hide-details
                    v-model="settingsStore.settings.tv_channel_up_down_buttons_reverse">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <!-- {modifier} には Utils.AltOrOption() の戻り値 (Alt もしくは Option) が入る -->
                <label class="settings__item-heading" for="tv_channel_selection_requires_alt_key">{{ $t('settings.general.tv_channel_selection_requires_alt_key.heading', { modifier: Utils.AltOrOption() }) }}</label>
                <label class="settings__item-label" for="tv_channel_selection_requires_alt_key" v-html="$t('settings.general.tv_channel_selection_requires_alt_key.label', { modifier: Utils.AltOrOption() })"></label>
                <v-switch class="settings__item-switch" color="primary" id="tv_channel_selection_requires_alt_key" hide-details
                    v-model="settingsStore.settings.tv_channel_selection_requires_alt_key">
                </v-switch>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="use_28hour_clock">{{ $t('settings.general.use_28hour_clock.heading') }}</label>
                <label class="settings__item-label" for="use_28hour_clock" v-html="$t('settings.general.use_28hour_clock.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="use_28hour_clock" hide-details
                    v-model="settingsStore.settings.use_28hour_clock">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="show_original_broadcast_time_during_playback">{{ $t('settings.general.show_original_broadcast_time_during_playback.heading') }}</label>
                <label class="settings__item-label" for="show_original_broadcast_time_during_playback" v-html="$t('settings.general.show_original_broadcast_time_during_playback.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="show_original_broadcast_time_during_playback" hide-details
                    v-model="settingsStore.settings.show_original_broadcast_time_during_playback">
                </v-switch>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.general.panel_display_state.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.panel_display_state.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="panel_display_state" v-model="settingsStore.settings.panel_display_state">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.general.tv_panel_active_tab.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.tv_panel_active_tab.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="tv_panel_active_tab" v-model="settingsStore.settings.tv_panel_active_tab">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.general.video_panel_active_tab.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.video_panel_active_tab.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="video_panel_active_tab" v-model="settingsStore.settings.video_panel_active_tab">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.general.video_watched_history_max_count.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.video_watched_history_max_count.label')"></div>
                <v-text-field class="settings__item-form" color="primary" variant="outlined" hide-details
                    type="number" min="1" :suffix="$t('settings.general.video_watched_history_max_count.suffix')"
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model.number="settingsStore.settings.video_watched_history_max_count">
                </v-text-field>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.general.export.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.export.label')"></div>
            </div>
            <v-btn class="settings__save-button mt-4" variant="flat" @click="exportSettings()">
                <Icon icon="fa6-solid:download" class="mr-3" height="19px" />{{ $t('settings.general.export.button') }}
            </v-btn>
            <div class="settings__item">
                <div class="settings__item-heading text-error-lighten-1">{{ $t('settings.general.import.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.import.label')"></div>
                <v-file-input class="settings__item-form" color="primary" variant="outlined" hide-details
                    :label="$t('settings.general.import.file_label')"
                    :density="is_form_dense ? 'compact' : 'default'"
                    accept="application/json"
                    prepend-icon=""
                    prepend-inner-icon="mdi-paperclip"
                    v-model="import_settings_file">
                </v-file-input>
            </div>
            <v-btn class="settings__save-button bg-error mt-5" variant="flat" @click="openImportSettingsDialog()">
                <Icon icon="fa6-solid:upload" class="mr-3" height="19px" />{{ $t('settings.general.import.button') }}
            </v-btn>
            <v-dialog max-width="560" v-model="import_settings_dialog">
                <v-card>
                    <v-card-title class="import-settings-dialog__title d-flex justify-center font-weight-bold pt-6">{{ $t('settings.general.import_dialog.title') }}</v-card-title>
                    <v-card-text class="pt-2 pb-5">
                        <span v-html="$t('settings.general.import_dialog.body')"></span>
                        <p class="mt-2">
                            <strong>{{ $t('settings.general.import_dialog.body_strong') }}</strong><br>
                        </p>
                        <div class="d-flex justify-center align-center mt-3">
                            <div class="mx-auto pr-md-4">
                                <div class="d-flex align-center flex-column flex-md-row">
                                    <div class="d-inline-block text-center text-md-right mr-md-2" style="min-width: 150px;">{{ $t('settings.general.import_dialog.data_to_import_label') }}</div> <strong>{{ $t('settings.general.import_dialog.counts', { mylist: import_settings_mylist_count, history: import_settings_watched_history_count }) }}</strong>
                                </div>
                                <div class="d-flex align-center flex-column flex-md-row">
                                    <div class="d-inline-block text-center text-md-right mr-md-2" style="min-width: 150px;">{{ $t('settings.general.import_dialog.this_device_label') }}</div> <strong>{{ $t('settings.general.import_dialog.counts', { mylist: settingsStore.settings.mylist.length, history: settingsStore.settings.watched_history.length }) }}</strong>
                                </div>
                            </div>
                    </div>
                    </v-card-text>
                    <div class="d-flex flex-column px-4 pb-6 import-settings-dialog">
                        <v-btn class="settings__save-button text-error-lighten-1" color="background-lighten-1" variant="flat"
                            @click="executeImport(true)">
                            <Icon icon="fluent:document-arrow-down-16-filled" class="mr-2" height="22px" />
                            <span v-html="$t('settings.general.import_dialog.overwrite_button')"></span>
                        </v-btn>
                        <v-btn class="settings__save-button text-error-lighten-1 mt-3" color="background-lighten-1" variant="flat"
                            @click="executeImport(false)">
                            <Icon icon="fluent:document-checkmark-16-filled" class="mr-2" height="22px" />
                            <span v-html="$t('settings.general.import_dialog.keep_button')"></span>
                        </v-btn>
                        <v-btn class="settings__save-button mt-3" color="background-lighten-1" variant="flat"
                            @click="import_settings_dialog = false">
                            <Icon icon="fluent:dismiss-16-filled" class="mr-2" height="22px" />
                            {{ $t('settings.general.import_dialog.cancel_button') }}
                        </v-btn>
                    </div>
                </v-card>
            </v-dialog>
            <div class="settings__item">
                <div class="settings__item-heading text-error-lighten-1">{{ $t('settings.general.reset.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.general.reset.label')"></div>
            </div>
            <v-btn class="settings__save-button bg-error mt-5" variant="flat" @click="resetSettings()">
                <Icon icon="material-symbols:device-reset-rounded" class="mr-2" height="23px" />{{ $t('settings.general.reset.button') }}
            </v-btn>
        </div>
        <PinnedChannelSettings :modelValue="pinned_channel_settings_modal" @update:modelValue="pinned_channel_settings_modal = $event" />
        <TimeTableSettingsDialog v-model:isOpen="timetable_settings_modal" />
    </SettingsBase>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

import PinnedChannelSettings from '@/components/Settings/PinnedChannelSettings.vue';
import TimeTableSettingsDialog from '@/components/Settings/TimeTableSettings.vue';
import Message from '@/message';
import useSettingsStore from '@/stores/SettingsStore';
import Utils from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

export default defineComponent({
    name: 'Settings-General',
    components: {
        PinnedChannelSettings,
        TimeTableSettingsDialog,
        SettingsBase,
    },
    data() {
        return {

            // ユーティリティをテンプレートで使えるように
            Utils: Object.freeze(Utils),

            // フォームを小さくするかどうか
            is_form_dense: Utils.isSmartphoneHorizontal(),

            // ピン留め中チャンネルの並び替え設定のモーダルを表示するか
            pinned_channel_settings_modal: false,

            // 番組表の表示設定のモーダルを表示するか
            timetable_settings_modal: false,

            // 選択された設定データ (KonomiTV-Settings.json) が入る
            import_settings_file: null as File | null,

            // 設定インポートの確認ダイヤログを表示するか
            import_settings_dialog: false,

            // インポートする設定データに含まれるマイリスト・視聴履歴の件数 (確認ダイヤログでの表示用)
            import_settings_mylist_count: 0,
            import_settings_watched_history_count: 0,
        };
    },
    computed: {
        ...mapStores(useSettingsStore),

        // 表示言語の選択肢
        // 「自動」のラベルのみ翻訳し、各言語名は言語を問わず母語表記のまま表示する (一般的な言語切り替え UI の慣習)
        // 選択肢の title に $t() を用いているため、表示言語の切り替えに追従して自動で再翻訳される
        language_options() {
            return [
                {title: this.$t('settings.general.language.option_auto'), value: 'Auto'},
                {title: '日本語', value: 'Japanese'},
                {title: 'English', value: 'English'},
            ];
        },

        // デフォルトのパネルの表示状態の選択肢
        panel_display_state() {
            return [
                {title: this.$t('settings.general.panel_display_state.option_restore'), value: 'RestorePreviousState'},
                {title: this.$t('settings.general.panel_display_state.option_always_display'), value: 'AlwaysDisplay'},
                {title: this.$t('settings.general.panel_display_state.option_always_fold'), value: 'AlwaysFold'},
            ];
        },

        // テレビをみるときにデフォルトで表示されるパネルのタブの選択肢
        tv_panel_active_tab() {
            return [
                {title: this.$t('settings.general.tv_panel_active_tab.option_program'), value: 'Program'},
                {title: this.$t('settings.general.tv_panel_active_tab.option_channel'), value: 'Channel'},
                {title: this.$t('settings.general.tv_panel_active_tab.option_comment'), value: 'Comment'},
                {title: this.$t('settings.general.tv_panel_active_tab.option_twitter'), value: 'Twitter'},
            ];
        },

        // ビデオをみるときにデフォルトで表示されるパネルのタブの選択肢
        video_panel_active_tab() {
            return [
                {title: this.$t('settings.general.video_panel_active_tab.option_recorded_program'), value: 'RecordedProgram'},
                {title: this.$t('settings.general.video_panel_active_tab.option_series'), value: 'Series'},
                {title: this.$t('settings.general.video_panel_active_tab.option_comment'), value: 'Comment'},
                {title: this.$t('settings.general.video_panel_active_tab.option_twitter'), value: 'Twitter'},
            ];
        },
    },
    methods: {

        // 設定データをエクスポートする
        exportSettings() {

            // 設定データを JSON 化して取得
            const settings_json = JSON.stringify(this.settingsStore.settings, null, 4);

            // ダウンロードさせるために一旦 Blob にしてから、KonomiTV-Settings.json としてダウンロード
            const settings_json_blob = new Blob([settings_json], {type: 'application/json'});
            Utils.downloadBlobData(settings_json_blob, 'KonomiTV-Settings.json');
            Message.success(this.$t('settings.general.message.exported'));
        },

        // 設定インポートの確認ダイヤログを開く
        // インポート実行前に、マイリスト・視聴履歴を上書きするか維持するかをユーザーに選択させる
        async openImportSettingsDialog() {

            // 設定データが選択されていないときは実行しない
            if (this.import_settings_file === null) {
                Message.error(this.$t('settings.general.message.select_file'));
                return;
            }

            // ダイヤログにマイリスト・視聴履歴の件数を表示するため、選択されたファイルを先読みしてパースする
            let parsed_settings: {[key: string]: any} = {};
            try {
                parsed_settings = JSON.parse(await this.import_settings_file.text());
            } catch (error) {
                Message.error(this.$t('settings.general.message.invalid_data'));
                return;
            }

            // 取り込むデータに含まれるマイリスト・視聴履歴の件数を取得する
            // 生の設定データなので、念のため配列かどうか確認してから件数を数える
            this.import_settings_mylist_count = Array.isArray(parsed_settings.mylist) ? parsed_settings.mylist.length : 0;
            this.import_settings_watched_history_count = Array.isArray(parsed_settings.watched_history) ? parsed_settings.watched_history.length : 0;

            // 確認ダイヤログを表示
            this.import_settings_dialog = true;
        },

        // 設定データをインポートする
        // include_environment_specific: マイリスト・視聴履歴などの環境固有値も上書きするか (false なら現在のデバイスの値を維持する)
        async executeImport(include_environment_specific: boolean) {

            // ダイヤログを閉じる
            this.import_settings_dialog = false;

            // ダイヤログを開いた時点でファイルは選択済みだが、念のため再確認する
            if (this.import_settings_file === null) {
                return;
            }

            // 設定データのインポートを実行
            const result = await this.settingsStore.importClientSettings(this.import_settings_file, include_environment_specific);
            if (result === true) {
                Message.success(this.$t('settings.general.message.imported'));
                window.setTimeout(() => this.$router.go(0), 500);  // 念のためリロード
            } else {
                Message.error(this.$t('settings.general.message.invalid_data'));
            }
        },

        // 設定データをリセットする
        async resetSettings() {
            await this.settingsStore.resetClientSettings();
            Message.success(this.$t('settings.general.message.reset_done'));
            window.setTimeout(() => this.$router.go(0), 500);  // 念のためリロード
        },
    }
});

</script>
<style lang="scss" scoped>

// 設定インポートの確認ダイヤログのタイトル
.import-settings-dialog__title {
    // タイトルが長くスマホ縦では 1 行に収まらないため、折り返しを許可して中央寄せする
    // (Vuetify の v-card-title はデフォルトで white-space: nowrap のため、明示的に上書きする)
    white-space: normal;
    text-align: center;
    line-height: 1.5;
}

// 設定インポートの確認ダイヤログ内のアクションボタン (Account.vue の設定競合ダイヤログと同じ見た目に揃える)
.import-settings-dialog {
    .v-btn {
        @include smartphone-vertical {
            height: 50px !important;
            text-align: left;
        }
        // スマホ縦のときだけボタン文言を 2 行に折り返す
        br.smartphone-vertical-only {
            display: none;
            @include smartphone-vertical {
                display: inline;
            }
        }
    }
}

</style>
