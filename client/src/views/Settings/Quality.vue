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
        <div v-show="tab === index" class="settings__content mt-0" v-for="(network_circuit, index) in network_circuits" :key="network_circuit">
            <div class="settings__content-heading mt-6">
                <Icon icon="fluent:tv-20-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.quality.section_tv') }}</span>
            </div>
            <div class="settings__item settings__item--sync-disabled">
                <div class="settings__item-heading">{{ $t('settings.quality.tv_streaming_quality.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.quality.tv_streaming_quality.label')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.quality.tv_streaming_quality.note_60fps')"></div>
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
                <label class="settings__item-label" :for="`tv_data_saver_mode${index === 1 ? '_cellular' : ''}`"
                    v-html="$t('settings.quality.tv_data_saver_mode.label')">
                </label>
                <div class="settings__item-label mt-1">
                    <span v-html="$t('settings.quality.tv_data_saver_mode.note_recommend')"></span>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === false">
                        {{ $t('settings.quality.data_saver_unsupported_device') }}
                    </p>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === true">
                        {{ $t('settings.quality.data_saver_unsupported_firefox') }}
                    </p>
                </div>
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
                <label class="settings__item-label" :for="`tv_low_latency_mode${index === 1 ? '_cellular' : ''}`"
                    v-html="$t('settings.quality.tv_low_latency_mode.label')">
                </label>
                <div class="settings__item-label mt-1" v-html="$t('settings.quality.tv_low_latency_mode.note')"></div>
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
                <label class="settings__item-label" :for="`tv_24fps_mode${index === 1 ? '_cellular' : ''}`"
                    v-html="$t('settings.quality.tv_24fps_mode.label')">
                </label>
                <div class="settings__item-label mt-1" v-html="$t('settings.quality.tv_24fps_mode.note')"></div>
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
                <div class="settings__item-label mt-1" v-html="$t('settings.quality.video_streaming_quality.note_60fps')"></div>
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
                <label class="settings__item-label" :for="`video_data_saver_mode${index === 1 ? '_cellular' : ''}`"
                    v-html="$t('settings.quality.video_data_saver_mode.label')">
                </label>
                <div class="settings__item-label mt-1">
                    <span v-html="$t('settings.quality.video_data_saver_mode.note_recommend')"></span>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === false">
                        {{ $t('settings.quality.data_saver_unsupported_device') }}
                    </p>
                    <p class="mt-1 mb-0 text-error-lighten-1" v-if="PlayerUtils.isHEVCVideoSupported() === false && Utils.isFirefox() === true">
                        {{ $t('settings.quality.data_saver_unsupported_firefox') }}
                    </p>
                </div>
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
                <label class="settings__item-label" :for="`video_24fps_mode${index === 1 ? '_cellular' : ''}`"
                    v-html="$t('settings.quality.video_24fps_mode.label')">
                </label>
                <div class="settings__item-label mt-1" v-html="$t('settings.quality.video_24fps_mode.note')"></div>
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

import useSettingsStore from '@/stores/SettingsStore';
import Utils, { PlayerUtils } from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

// 画質ごとのデータ量・平均ビットレート情報 (H.264 / H.265)
// 表示ラベルは表示言語に追従して単位表記を切り替えるため、ここでは数値のみを保持し、
// buildQualityItems() で quality_suffix と組み合わせて表示用の文字列を組み立てる
const QUALITY_TABLE = [
    {value: '1080p-60fps', label: '1080p (60fps)', h264: {size: '4.50', mbps: '10.0'}, h265: {size: '1.80', mbps: '4.0'}},
    {value: '1080p',       label: '1080p',         h264: {size: '4.50', mbps: '10.0'}, h265: {size: '1.37', mbps: '3.0'}},
    {value: '810p',        label: '810p',          h264: {size: '2.62', mbps: '5.8'},  h265: {size: '1.05', mbps: '2.3'}},
    {value: '720p',        label: '720p',          h264: {size: '2.18', mbps: '4.9'},  h265: {size: '0.82', mbps: '1.8'}},
    {value: '540p',        label: '540p',          h264: {size: '1.52', mbps: '3.4'},  h265: {size: '0.53', mbps: '1.2'}},
    {value: '480p',        label: '480p',          h264: {size: '1.06', mbps: '2.3'},  h265: {size: '0.46', mbps: '1.0'}},
    {value: '360p',        label: '360p',          h264: {size: '0.60', mbps: '1.3'},  h265: {size: '0.30', mbps: '0.7'}},
    {value: '240p',        label: '240p',          h264: {size: '0.35', mbps: '0.8'},  h265: {size: '0.20', mbps: '0.4'}},
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
        // 通信節約モードがオンなら H.265、オフなら H.264 のデータ量表記を用いる
        // (以前は data_saver_mode の変更を watch して差し替えていたが、computed にすることで watch と created を不要にした)
        tv_streaming_quality() {
            return this.buildQualityItems(this.settingsStore.settings.tv_data_saver_mode ? 'h265' : 'h264');
        },
        tv_streaming_quality_cellular() {
            return this.buildQualityItems(this.settingsStore.settings.tv_data_saver_mode_cellular ? 'h265' : 'h264');
        },

        // ビデオのデフォルトのストリーミング画質の選択肢
        video_streaming_quality() {
            return this.buildQualityItems(this.settingsStore.settings.video_data_saver_mode ? 'h265' : 'h264');
        },
        video_streaming_quality_cellular() {
            return this.buildQualityItems(this.settingsStore.settings.video_data_saver_mode_cellular ? 'h265' : 'h264');
        },
    },
    methods: {

        // 指定したコーデックの画質選択肢リストを、表示言語に応じた単位表記付きで組み立てる
        // codec: 'h264' (通常) or 'h265' (通信節約モード)
        buildQualityItems(codec: 'h264' | 'h265') {
            return QUALITY_TABLE.map((quality) => ({
                title: `${quality.label} ${this.$t('settings.quality.quality_suffix', {size: quality[codec].size, mbps: quality[codec].mbps})}`,
                value: quality.value,
            }));
        },
    }
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
