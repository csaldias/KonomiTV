<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <Icon icon="fluent:subtitles-16-filled" width="25px" />
            <span class="ml-3">{{ $t('settings.caption.title') }}</span>
        </h2>
        <div class="settings__content">
            <div class="settings__item">
                <label class="settings__item-heading">{{ $t('settings.caption.caption_font.heading') }}</label>
                <label class="settings__item-label" v-html="$t('settings.caption.caption_font.label')"></label>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="caption_font" v-model="settingsStore.settings.caption_font">
                </v-select>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="always_border_caption_text">{{ $t('settings.caption.always_border_caption_text.heading') }}</label>
                <label class="settings__item-label" for="always_border_caption_text" v-html="$t('settings.caption.always_border_caption_text.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="always_border_caption_text" hide-details
                    v-model="settingsStore.settings.always_border_caption_text">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="specify_caption_opacity">{{ $t('settings.caption.specify_caption_opacity.heading') }}</label>
                <label class="settings__item-label" for="specify_caption_opacity" v-html="$t('settings.caption.specify_caption_opacity.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="specify_caption_opacity" hide-details
                    v-model="settingsStore.settings.specify_caption_opacity">
                </v-switch>
            </div>
            <div class="settings__item" :class="{'settings__item--disabled': settingsStore.settings.specify_caption_opacity === false}">
                <label class="settings__item-heading">{{ $t('settings.caption.caption_opacity.heading') }}</label>
                <label class="settings__item-label" v-html="$t('settings.caption.caption_opacity.label')"></label>
                <div class="settings__item-label" ref="caption_opacity">
                    <v-slider class="settings__item-form" color="primary" show-ticks="always" thumb-label hide-details
                        :min="0" :max="1" :step="0.05" v-model="settingsStore.settings.caption_opacity"
                        :disabled="settingsStore.settings.specify_caption_opacity === false">
                    </v-slider>
                </div>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="tv_show_superimpose">{{ $t('settings.caption.tv_show_superimpose.heading') }}</label>
                <label class="settings__item-label" for="tv_show_superimpose" v-html="$t('settings.caption.tv_show_superimpose.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="tv_show_superimpose" hide-details
                    v-model="settingsStore.settings.tv_show_superimpose">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="video_show_superimpose">{{ $t('settings.caption.video_show_superimpose.heading') }}</label>
                <label class="settings__item-label" for="video_show_superimpose" v-html="$t('settings.caption.video_show_superimpose.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="video_show_superimpose" hide-details
                    v-model="settingsStore.settings.video_show_superimpose">
                </v-switch>
            </div>
        </div>
    </SettingsBase>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

import useSettingsStore from '@/stores/SettingsStore';
import Utils from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

export default defineComponent({
    name: 'Settings-Caption',
    components: {
        SettingsBase,
    },
    data() {
        return {

            // フォームを小さくするかどうか
            is_form_dense: Utils.isSmartphoneHorizontal(),
        };
    },
    computed: {
        ...mapStores(useSettingsStore),

        // 字幕のフォントの選択肢
        // フォント名は固有名詞のため翻訳せず、末尾の「デフォルトのフォント」のみ表示言語に追従させる
        caption_font() {
            return [
                {title: 'Windows TV ゴシック', value: 'Windows TV Gothic'},
                {title: 'Windows TV 丸ゴシック', value: 'Windows TV MaruGothic'},
                {title: 'Windows TV 太丸ゴシック', value: 'Windows TV FutoMaruGothic'},
                {title: 'ヒラギノTV丸ゴ', value: 'Hiragino TV Sans Rd S'},
                {title: '新丸ゴ ARIB', value: 'TT-ShinMGo-regular'},
                {title: 'Rounded M+ 1m for ARIB', value: 'Rounded M+ 1m for ARIB'},
                {title: 'BIZ UDゴシック', value: 'BIZ UDGothic'},
                {title: 'Noto Sans JP', value: 'Noto Sans JP'},
                {title: '游ゴシック', value: 'Yu Gothic'},
                {title: this.$t('settings.caption.caption_font.option_default'), value: 'sans-serif'},
            ];
        },
    }
});

</script>
