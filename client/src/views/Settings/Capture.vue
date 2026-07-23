<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <Icon icon="fluent:image-multiple-16-filled" width="26px" />
            <span class="ml-2">{{ $t('settings.capture.title') }}</span>
        </h2>
        <div class="settings__content">
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.capture.capture_save_mode.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.capture.capture_save_mode.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="capture_save_mode" v-model="settingsStore.settings.capture_save_mode">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.capture.capture_caption_mode.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.capture.capture_caption_mode.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="capture_caption_mode" v-model="settingsStore.settings.capture_caption_mode">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.capture.filename_pattern.heading') }}</div>
                <div class="settings__item-label">
                    <span v-html="$t('settings.capture.filename_pattern.label')"></span>
                    <v-btn class="settings__save-button mt-3 px-3 py-0" style="height: 36px; font-size: 14px;" variant="flat"
                        @click="is_macro_list_visible = !is_macro_list_visible">
                        <Icon :icon="is_macro_list_visible ? 'fluent:chevron-up-20-filled' : 'fluent:chevron-down-20-filled'"
                            class="mr-1" height="19px" />
                        {{ is_macro_list_visible ? $t('settings.capture.filename_pattern.macro_toggle_hide') : $t('settings.capture.filename_pattern.macro_toggle_show') }}
                    </v-btn>
                    <ul class="ml-4 mt-3" v-if="is_macro_list_visible" v-html="$t('settings.capture.filename_pattern.macro_list')"></ul>
                </div>
                <v-text-field class="settings__item-form mt-6" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :label="capture_filename_pattern_preview"
                    v-model="settingsStore.settings.capture_filename_pattern">
                </v-text-field>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" for="capture_copy_to_clipboard">{{ $t('settings.capture.capture_copy_to_clipboard.heading') }}</label>
                <label class="settings__item-label" for="capture_copy_to_clipboard" v-html="$t('settings.capture.capture_copy_to_clipboard.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="capture_copy_to_clipboard" hide-details
                    v-model="settingsStore.settings.capture_copy_to_clipboard">
                </v-switch>
            </div>
        </div>
    </SettingsBase>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

import CaptureManager from '@/services/player/managers/CaptureManager';
import useSettingsStore from '@/stores/SettingsStore';
import Utils from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

export default defineComponent({
    name: 'Settings-Capture',
    components: {
        SettingsBase,
    },
    data() {
        return {

            // フォームを小さくするかどうか
            is_form_dense: Utils.isSmartphoneHorizontal(),

            // マクロ一覧を表示するか
            is_macro_list_visible: false,
        };
    },
    computed: {
        ...mapStores(useSettingsStore),

        // キャプチャの保存先の選択肢
        capture_save_mode() {
            return [
                {title: this.$t('settings.capture.capture_save_mode.option_browser'), value: 'Browser'},
                {title: this.$t('settings.capture.capture_save_mode.option_upload_server'), value: 'UploadServer'},
                {title: this.$t('settings.capture.capture_save_mode.option_both'), value: 'Both'},
            ];
        },

        // 字幕が表示されているときのキャプチャの保存モードの選択肢
        capture_caption_mode() {
            return [
                {title: this.$t('settings.capture.capture_caption_mode.option_video_only'), value: 'VideoOnly'},
                {title: this.$t('settings.capture.capture_caption_mode.option_compositing_caption'), value: 'CompositingCaption'},
                {title: this.$t('settings.capture.capture_caption_mode.option_both'), value: 'Both'},
            ];
        },

        // キャプチャの保存ファイル名パターンのプレビュー
        // generateCaptureFilename() 内で capture_filename_pattern を参照するため、パターン変更に追従して再計算される
        // (以前は watch で更新していたが、computed にすることで表示言語の切り替えにも同時に追従できる)
        capture_filename_pattern_preview() {
            const filename_base = CaptureManager.generateCaptureFilename();
            return this.$t('settings.capture.filename_pattern.preview', {base: filename_base});
        },
    }
});

</script>
