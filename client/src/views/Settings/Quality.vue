<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <Icon icon="fluent:video-clip-multiple-16-filled" width="26px" />
            <span class="ml-3">{{ $t('settings.quality.title') }}</span>
        </h2>
        <div class="settings__quote mt-5 pb-2" v-html="$t('settings.quality.quote')"></div>
        <v-tabs class="settings__tab" color="primary" bg-color="transparent" align-tabs="center" v-model="tab">
            <v-tab style="text-transform: none !important;" v-for="network_circuit in network_circuits" :key="network_circuit">
                {{network_circuit}}
            </v-tab>
        </v-tabs>
        <!-- タブの表示ラベルは表示言語によって変わるため、Wi-Fi 回線時 (index: 0) とモバイル回線時 (index: 1) はインデックスで判定する -->
        <div v-show="tab === index" class="settings__content mt-0" v-for="(network_circuit, index) in network_circuits" :key="index">
            <div class="settings__content-heading mt-6">
                <Icon icon="fluent:tv-20-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.quality.section_tv') }}</span>
            </div>
            <div class="settings__item settings__item--sync-disabled">
                <div class="settings__item-heading">{{ $t('settings.quality.tv_streaming_quality.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.quality.tv_streaming_quality.label')"></div>
                <div class="settings__item-label mt-2" v-html="$t('settings.quality.tv_streaming_quality.note_original')"></div>
                <div class="settings__item-label mt-2" v-html="$t('settings.quality.tv_streaming_quality.note_60fps')"></div>
                <div class="settings__item-label mt-1" v-if="Utils.isAndroid()" v-html="$t('settings.quality.note_android')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'" v-if="index === 0"
                    :items="tv_streaming_quality" v-model="settingsStore.settings.tv_streaming_quality">
                </v-select>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'" v-if="index === 1"
                    :items="tv_streaming_quality_cellular" v-model="settingsStore.settings.tv_streaming_quality_cellular">
                </v-select>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled"
                :class="{'settings__item--disabled': PlayerUtils.isHEVCVideoSupported() === false}">
                <label class="settings__item-heading" :for="`tv_data_saver_mode${index === 1 ? '_cellular' : ''}`">
                    {{ $t('settings.quality.tv_data_saver_mode.heading') }}
                </label>
                <label class="settings__item-label" :for="`tv_data_saver_mode${index === 1 ? '_cellular' : ''}`">
                    <span v-html="$t('settings.quality.tv_data_saver_mode.label')"></span>
                    <div class="mt-1"></div>
                    <span v-html="$t('settings.quality.tv_data_saver_mode.note_recommend')"></span>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === false">
                        {{ $t('settings.quality.data_saver_unsupported_device') }}
                    </p>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === true">
                        {{ $t('settings.quality.data_saver_unsupported_firefox') }}
                    </p>
                </label>
                <v-switch class="settings__item-switch" color="primary" id="tv_data_saver_mode" hide-details v-if="index === 0"
                    v-model="settingsStore.settings.tv_data_saver_mode" :disabled="PlayerUtils.isHEVCVideoSupported() === false">
                </v-switch>
                <v-switch class="settings__item-switch" color="primary" id="tv_data_saver_mode_cellular" hide-details v-if="index === 1"
                    v-model="settingsStore.settings.tv_data_saver_mode_cellular" :disabled="PlayerUtils.isHEVCVideoSupported() === false">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" :for="`tv_low_latency_mode${index === 1 ? '_cellular' : ''}`">
                    {{ $t('settings.quality.tv_low_latency_mode.heading') }}
                </label>
                <label class="settings__item-label" :for="`tv_low_latency_mode${index === 1 ? '_cellular' : ''}`">
                    <span v-html="$t('settings.quality.tv_low_latency_mode.label')"></span>
                    <div class="mt-1"></div>
                    <span v-html="$t('settings.quality.tv_low_latency_mode.note')"></span>
                </label>
                <v-switch class="settings__item-switch" color="primary" id="tv_low_latency_mode" hide-details v-if="index === 0"
                    v-model="settingsStore.settings.tv_low_latency_mode">
                </v-switch>
                <v-switch class="settings__item-switch" color="primary" id="tv_low_latency_mode_cellular" hide-details v-if="index === 1"
                    v-model="settingsStore.settings.tv_low_latency_mode_cellular">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" :for="`tv_24fps_mode${index === 1 ? '_cellular' : ''}`">
                    {{ $t('settings.quality.tv_24fps_mode.heading') }}
                </label>
                <label class="settings__item-label" :for="`tv_24fps_mode${index === 1 ? '_cellular' : ''}`">
                    <span v-html="$t('settings.quality.tv_24fps_mode.label')"></span>
                    <div class="mt-1"></div>
                    <span v-html="$t('settings.quality.tv_24fps_mode.note')"></span>
                    <div class="mt-1"></div>
                    <span v-html="$t('settings.quality.tv_24fps_mode.note_original')"></span>
                </label>
                <v-switch class="settings__item-switch" color="primary" id="tv_24fps_mode" hide-details v-if="index === 0"
                    v-model="settingsStore.settings.tv_24fps_mode">
                </v-switch>
                <v-switch class="settings__item-switch" color="primary" id="tv_24fps_mode_cellular" hide-details v-if="index === 1"
                    v-model="settingsStore.settings.tv_24fps_mode_cellular">
                </v-switch>
            </div>
            <div class="settings__content-heading mt-6">
                <Icon icon="fluent:movies-and-tv-20-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.quality.section_video') }}</span>
            </div>
            <div class="settings__item settings__item--sync-disabled">
                <div class="settings__item-heading">{{ $t('settings.quality.video_streaming_quality.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.quality.video_streaming_quality.label')"></div>
                <div class="settings__item-label mt-2" v-html="$t('settings.quality.video_streaming_quality.note_original')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.quality.video_streaming_quality.note_original_limit')"></div>
                <div class="settings__item-label mt-2" v-html="$t('settings.quality.video_streaming_quality.note_60fps')"></div>
                <div class="settings__item-label mt-1" v-if="Utils.isAndroid()" v-html="$t('settings.quality.note_android')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'" v-if="index === 0"
                    :items="video_streaming_quality" v-model="settingsStore.settings.video_streaming_quality">
                </v-select>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'" v-if="index === 1"
                    :items="video_streaming_quality_cellular" v-model="settingsStore.settings.video_streaming_quality_cellular">
                </v-select>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled"
                :class="{'settings__item--disabled': PlayerUtils.isHEVCVideoSupported() === false}">
                <label class="settings__item-heading" :for="`video_data_saver_mode${index === 1 ? '_cellular' : ''}`">
                    {{ $t('settings.quality.video_data_saver_mode.heading') }}
                </label>
                <label class="settings__item-label" :for="`video_data_saver_mode${index === 1 ? '_cellular' : ''}`">
                    <span v-html="$t('settings.quality.video_data_saver_mode.label')"></span>
                    <div class="mt-1"></div>
                    <span v-html="$t('settings.quality.video_data_saver_mode.note_recommend')"></span>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === false">
                        {{ $t('settings.quality.data_saver_unsupported_device') }}
                    </p>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === true">
                        {{ $t('settings.quality.data_saver_unsupported_firefox') }}
                    </p>
                </label>
                <v-switch class="settings__item-switch" color="primary" id="video_data_saver_mode" hide-details v-if="index === 0"
                    v-model="settingsStore.settings.video_data_saver_mode" :disabled="PlayerUtils.isHEVCVideoSupported() === false">
                </v-switch>
                <v-switch class="settings__item-switch" color="primary" id="video_data_saver_mode_cellular" hide-details v-if="index === 1"
                    v-model="settingsStore.settings.video_data_saver_mode_cellular" :disabled="PlayerUtils.isHEVCVideoSupported() === false">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" :for="`video_24fps_mode${index === 1 ? '_cellular' : ''}`">
                    {{ $t('settings.quality.video_24fps_mode.heading') }}
                </label>
                <label class="settings__item-label" :for="`video_24fps_mode${index === 1 ? '_cellular' : ''}`">
                    <span v-html="$t('settings.quality.video_24fps_mode.label')"></span>
                    <div class="mt-1"></div>
                    <span v-html="$t('settings.quality.video_24fps_mode.note')"></span>
                    <div class="mt-1"></div>
                    <span v-html="$t('settings.quality.video_24fps_mode.note_original')"></span>
                </label>
                <v-switch class="settings__item-switch" color="primary" id="video_24fps_mode" hide-details v-if="index === 0"
                    v-model="settingsStore.settings.video_24fps_mode">
                </v-switch>
                <v-switch class="settings__item-switch" color="primary" id="video_24fps_mode_cellular" hide-details v-if="index === 1"
                    v-model="settingsStore.settings.video_24fps_mode_cellular">
                </v-switch>
            </div>
        </div>
    </SettingsBase>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

import Message from '@/message';
import useSettingsStore, { LiveStreamingQuality, VideoStreamingQuality } from '@/stores/SettingsStore';
import Utils, { PlayerUtils } from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

type QualitySelectItem = {
    title: string;
    value: LiveStreamingQuality | VideoStreamingQuality;
    props?: { disabled: boolean };
};

// 画質ごとのデータ量・平均ビットレート情報 (H.264 / H.265)
// 表示ラベルは表示言語に追従して単位表記を切り替えるため、ここでは数値のみを保持し、
// buildQualityItems() で quality_suffix と組み合わせて表示用の文字列を組み立てる
// Original (MPEG-2) は放送波をそのまま配信するため、通信節約モード (H.265 / HEVC) 時の値を持たない
const QUALITY_TABLE: {
    value: LiveStreamingQuality | VideoStreamingQuality;
    label: string;
    h264: {size: string; mbps: string};
    h265: {size: string; mbps: string} | null;
}[] = [
    {value: 'original',    label: 'Original (MPEG-2)', h264: {size: '7.65', mbps: '17.0'}, h265: null},
    {value: '1080p-60fps', label: '1080p (60fps)',     h264: {size: '4.50', mbps: '10.0'}, h265: {size: '1.80', mbps: '4.0'}},
    {value: '1080p',       label: '1080p',             h264: {size: '4.50', mbps: '10.0'}, h265: {size: '1.37', mbps: '3.0'}},
    {value: '810p',        label: '810p',              h264: {size: '2.62', mbps: '5.8'},  h265: {size: '1.05', mbps: '2.3'}},
    {value: '720p',        label: '720p',              h264: {size: '2.18', mbps: '4.9'},  h265: {size: '0.82', mbps: '1.8'}},
    {value: '540p',        label: '540p',              h264: {size: '1.52', mbps: '3.4'},  h265: {size: '0.53', mbps: '1.2'}},
    {value: '480p',        label: '480p',              h264: {size: '1.06', mbps: '2.3'},  h265: {size: '0.46', mbps: '1.0'}},
    {value: '360p',        label: '360p',              h264: {size: '0.60', mbps: '1.3'},  h265: {size: '0.30', mbps: '0.7'}},
    {value: '240p',        label: '240p',              h264: {size: '0.35', mbps: '0.8'},  h265: {size: '0.20', mbps: '0.4'}},
];

export default defineComponent({
    name: 'Settings-Quality',
    components: {
        SettingsBase,
    },
    data() {
        return {

            // ユーティリティをテンプレートで使えるように
            Utils: Object.freeze(Utils),
            PlayerUtils: Object.freeze(PlayerUtils),

            // フォームを小さくするかどうか
            is_form_dense: Utils.isSmartphoneHorizontal(),

            // タブの状態管理
            tab: null as number | null,
        };
    },
    computed: {
        ...mapStores(useSettingsStore),

        // ネットワーク回線の種類 (タブの表示ラベル)
        network_circuits(): string[] {
            return [this.$t('settings.quality.tab_wifi'), this.$t('settings.quality.tab_cellular')];
        },

        // テレビのデフォルトのストリーミング画質の選択肢
        tv_streaming_quality(): QualitySelectItem[] {
            return this.buildQualityItems(this.settingsStore.settings.tv_data_saver_mode);
        },
        tv_streaming_quality_cellular(): QualitySelectItem[] {
            return this.buildQualityItems(this.settingsStore.settings.tv_data_saver_mode_cellular);
        },

        // ビデオのデフォルトのストリーミング画質の選択肢
        video_streaming_quality(): QualitySelectItem[] {
            return this.buildQualityItems(this.settingsStore.settings.video_data_saver_mode);
        },
        video_streaming_quality_cellular(): QualitySelectItem[] {
            return this.buildQualityItems(this.settingsStore.settings.video_data_saver_mode_cellular);
        },
    },
    watch: {
        'settingsStore.settings.tv_data_saver_mode': {
            immediate: true,
            handler(value: boolean) {
                this.ensureQualityCompatibleWithDataSaverMode('tv', value);
            },
        },
        'settingsStore.settings.tv_data_saver_mode_cellular': {
            immediate: true,
            handler(value: boolean) {
                this.ensureQualityCompatibleWithDataSaverMode('tv_cellular', value);
            },
        },
        'settingsStore.settings.video_data_saver_mode': {
            immediate: true,
            handler(value: boolean) {
                this.ensureQualityCompatibleWithDataSaverMode('video', value);
            },
        },
        'settingsStore.settings.video_data_saver_mode_cellular': {
            immediate: true,
            handler(value: boolean) {
                this.ensureQualityCompatibleWithDataSaverMode('video_cellular', value);
            },
        },
        'settingsStore.settings.tv_streaming_quality_cellular'(value: LiveStreamingQuality, old_value: LiveStreamingQuality | undefined) {
            this.notifyMobileOriginalQualityWarning(value, old_value, this.settingsStore.settings.tv_data_saver_mode_cellular);
        },
        'settingsStore.settings.video_streaming_quality_cellular'(value: VideoStreamingQuality, old_value: VideoStreamingQuality | undefined) {
            this.notifyMobileOriginalQualityWarning(value, old_value, this.settingsStore.settings.video_data_saver_mode_cellular);
        },
    },
    methods: {

        /**
         * 通信節約モードの状態に応じた画質選択肢を、表示言語に応じた単位表記付きで生成する
         * 通信節約モードオン時は H.265 のビットレート表記を使い、Original (MPEG-2) は disabled 状態で表示する
         * @param data_saver_mode 通信節約モードがオンかどうか
         * @returns 画質選択肢
         */
        buildQualityItems(data_saver_mode: boolean): QualitySelectItem[] {
            return QUALITY_TABLE.map((quality) => {

                // 通信節約モードがオフなら、H.264 のビットレート表記を使う
                if (data_saver_mode === false || quality.h265 === null) {
                    const item: QualitySelectItem = {
                        title: `${quality.label} ${this.$t('settings.quality.quality_suffix', quality.h264)}`,
                        value: quality.value,
                    };
                    // 通信節約モードオン時の Original (MPEG-2) は選択できないようにする
                    if (data_saver_mode === true) {
                        item.props = { disabled: true };
                    }
                    return item;
                }

                // 通信節約モードがオンなら、H.265 のビットレート表記を使う
                return {
                    title: `${quality.label} ${this.$t('settings.quality.quality_suffix', quality.h265)}`,
                    value: quality.value,
                };
            });
        },

        /**
         * 通信節約モードオン時に Original 画質が選択されていた場合、1080p (60fps) へ自動切り替えする
         * @param target 画質設定の対象
         * @param data_saver_mode 通信節約モードがオンかどうか
         */
        ensureQualityCompatibleWithDataSaverMode(
            target: 'tv' | 'tv_cellular' | 'video' | 'video_cellular',
            data_saver_mode: boolean,
        ): void {
            if (data_saver_mode === false) {
                return;
            }

            const setting_key_map = {
                tv: 'tv_streaming_quality',
                tv_cellular: 'tv_streaming_quality_cellular',
                video: 'video_streaming_quality',
                video_cellular: 'video_streaming_quality_cellular',
            } as const;
            const setting_key = setting_key_map[target];

            if (this.settingsStore.settings[setting_key] !== 'original') {
                return;
            }

            this.settingsStore.settings[setting_key] = '1080p-60fps';
            Message.warning(this.$t('settings.quality.message_data_saver_original_auto_switch'), 10);  // 10秒表示
        },

        /**
         * モバイル回線プロファイルで通信節約モードオフの状態から Original 画質が選ばれた際に警告を表示する
         * @param value 新しい画質
         * @param old_value 以前の画質
         * @param data_saver_mode 通信節約モードがオンかどうか
         */
        notifyMobileOriginalQualityWarning(
            value: LiveStreamingQuality | VideoStreamingQuality,
            old_value: LiveStreamingQuality | VideoStreamingQuality | undefined,
            data_saver_mode: boolean,
        ): void {
            if (data_saver_mode === true) {
                return;
            }
            if (value !== 'original') {
                return;
            }
            // 通信節約モードオン時の自動切り替え (original → 1080p-60fps) では警告しない
            if (old_value === undefined || old_value === 'original') {
                return;
            }

            Message.warning(this.$t('settings.quality.message_mobile_original_quality_warning'), 10);  // 10秒表示
        },
    },
});

</script>
<style lang="scss" scoped>

.settings__tab {
    position: sticky;
    top: 65px;
    z-index: 4;
    background-color: rgb(var(--v-theme-background-lighten-1)) !important;
    @include smartphone-horizontal {
        top: 0px;
    }
    @include smartphone-vertical {
        top: 60px;
        background-color: rgb(var(--v-theme-background)) !important;
    }

    .v-tab {
        letter-spacing: 0.0892857143em !important;
    }
}

</style>