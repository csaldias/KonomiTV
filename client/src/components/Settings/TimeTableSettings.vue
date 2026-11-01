<template>
    <v-dialog max-width="700" transition="slide-y-transition" v-model="dialogOpen">
        <v-card class="timetable-settings-dialog">
            <v-card-title class="px-5 pt-6 pb-3 d-flex align-center font-weight-bold" style="height: 60px;">
                <Icon icon="fluent:settings-20-regular" height="26px" />
                <span class="ml-3">{{ $t('settings_dialogs.timetable.title') }}</span>
                <v-spacer></v-spacer>
                <div v-ripple class="d-flex align-center rounded-circle cursor-pointer px-2 py-2" @click="dialogOpen = false">
                    <Icon icon="fluent:dismiss-12-filled" width="23px" height="23px" />
                </div>
            </v-card-title>
            <div class="px-5 pb-6">
                <!-- チャンネル列の幅 -->
                <div class="settings__item" style="margin-top: 16px;">
                    <label class="settings__item-heading">
                        <Icon icon="fluent:arrow-autofit-width-20-regular" width="20px" />
                        <span class="ml-2">{{ $t('settings_dialogs.timetable.channel_width_heading') }}</span>
                    </label>
                    <label class="settings__item-label">
                        <span v-html="$t('settings_dialogs.timetable.channel_width_label')"></span>
                    </label>
                    <v-btn-toggle class="settings__item-form timetable-settings-dialog__toggle" v-model="channelWidth" mandatory density="comfortable">
                        <v-btn value="Wide">{{ $t('settings_dialogs.timetable.size_wide') }}</v-btn>
                        <v-btn value="Normal">{{ $t('settings_dialogs.timetable.size_normal') }}</v-btn>
                        <v-btn value="Narrow">{{ $t('settings_dialogs.timetable.size_narrow') }}</v-btn>
                    </v-btn-toggle>
                </div>

                <!-- 1時間ごとの高さ -->
                <div class="settings__item">
                    <label class="settings__item-heading">
                        <Icon icon="fluent:arrow-autofit-height-20-regular" width="20px" />
                        <span class="ml-2">{{ $t('settings_dialogs.timetable.hour_height_heading') }}</span>
                    </label>
                    <label class="settings__item-label">
                        <span v-html="$t('settings_dialogs.timetable.hour_height_label')"></span>
                    </label>
                    <v-btn-toggle class="settings__item-form timetable-settings-dialog__toggle" v-model="hourHeight" mandatory density="comfortable">
                        <v-btn value="Wide">{{ $t('settings_dialogs.timetable.size_wide') }}</v-btn>
                        <v-btn value="Normal">{{ $t('settings_dialogs.timetable.size_normal') }}</v-btn>
                        <v-btn value="Narrow">{{ $t('settings_dialogs.timetable.size_narrow') }}</v-btn>
                    </v-btn-toggle>
                </div>

                <!-- カーソルを重ねた時に番組詳細を自動表示する (PC のみ) -->
                <div class="settings__item settings__item--switch">
                    <label class="settings__item-heading" for="timetable_hover_expand">
                        <Icon icon="fluent:cursor-hover-20-regular" width="20px" />
                        <span class="ml-2">{{ $t('settings_dialogs.timetable.hover_expand_heading') }}</span>
                    </label>
                    <label class="settings__item-label" for="timetable_hover_expand">
                        <span v-html="$t('settings_dialogs.timetable.hover_expand_label')"></span>
                    </label>
                    <v-switch class="settings__item-switch" color="primary" id="timetable_hover_expand" hide-details
                        v-model="hoverExpand">
                    </v-switch>
                </div>

                <!-- ショッピング・通販番組を控えめに表示する -->
                <div class="settings__item settings__item--switch">
                    <label class="settings__item-heading" for="timetable_dim_shopping_programs">
                        <Icon icon="fluent:shopping-bag-20-regular" width="20px" />
                        <span class="ml-2">{{ $t('settings_dialogs.timetable.dim_shopping_heading') }}</span>
                    </label>
                    <label class="settings__item-label" for="timetable_dim_shopping_programs">
                        <span v-html="$t('settings_dialogs.timetable.dim_shopping_label')"></span>
                    </label>
                    <v-switch class="settings__item-switch" color="primary" id="timetable_dim_shopping_programs" hide-details
                        v-model="dimShoppingPrograms">
                    </v-switch>
                </div>

                <!-- ジャンル別のハイライト色 -->
                <div class="settings__item">
                    <label class="settings__item-heading">
                        <Icon icon="fluent:color-20-regular" width="20px" />
                        <span class="ml-2">{{ $t('settings_dialogs.timetable.genre_colors_heading') }}</span>
                    </label>
                    <label class="settings__item-label">
                        <span v-html="$t('settings_dialogs.timetable.genre_colors_label')"></span>
                    </label>
                    <div class="timetable-settings-dialog__genre-list">
                        <div class="timetable-settings-dialog__genre-item" v-for="genre in genreList" :key="genre">
                            <span class="timetable-settings-dialog__genre-name">{{ ProgramUtils.getGenreLabel(genre) }}</span>
                            <v-select class="timetable-settings-dialog__genre-select" variant="outlined" density="compact" hide-details
                                :items="colorItems" v-model="genreColors[genre]"
                                @update:model-value="onGenreColorChange(genre, $event)">
                                <template #selection="{ item }">
                                    <div class="timetable-settings-dialog__color-preview" :style="{ background: getColorValue(item.value) }"></div>
                                    <span>{{ item.title }}</span>
                                </template>
                                <template #item="{ item, props }">
                                    <v-list-item v-bind="props">
                                        <template #prepend>
                                            <div class="timetable-settings-dialog__color-preview" :style="{ background: getColorValue(item.value) }"></div>
                                        </template>
                                    </v-list-item>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>
<script lang="ts" setup>

import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import useSettingsStore, { TimeTableGenreHighlightColor, TimeTableSizeOption, ITimeTableGenreColors } from '@/stores/SettingsStore';
import { ProgramUtils } from '@/utils';
import { TimeTableUtils } from '@/utils/TimeTableUtils';

const { t } = useI18n();

// Props
const props = defineProps<{
    isOpen: boolean;
}>();

// Emits
const emit = defineEmits<{
    (e: 'update:isOpen', value: boolean): void;
}>();

// ストア
const settingsStore = useSettingsStore();

// ダイアログの開閉状態
const dialogOpen = computed({
    get: () => props.isOpen,
    set: (value: boolean) => {
        emit('update:isOpen', value);
    },
});


// ローカル状態 (設定と同期)
const channelWidth = computed({
    get: () => settingsStore.settings.timetable_channel_width,
    set: (value: TimeTableSizeOption) => {
        settingsStore.settings.timetable_channel_width = value;
    },
});

const hourHeight = computed({
    get: () => settingsStore.settings.timetable_hour_height,
    set: (value: TimeTableSizeOption) => {
        settingsStore.settings.timetable_hour_height = value;
    },
});

const hoverExpand = computed({
    get: () => settingsStore.settings.timetable_hover_expand,
    set: (value: boolean) => {
        settingsStore.settings.timetable_hover_expand = value;
    },
});

const dimShoppingPrograms = computed({
    get: () => settingsStore.settings.timetable_dim_shopping_programs,
    set: (value: boolean) => {
        settingsStore.settings.timetable_dim_shopping_programs = value;
    },
});

const genreColors = ref<ITimeTableGenreColors>({ ...settingsStore.settings.timetable_genre_colors });

// ジャンル一覧 (CONTENT_TYPE のジャンル名と一致させる)
// ただし並び順はユーザーが認知しやすいように並び替えている
const genreList: (keyof ITimeTableGenreColors)[] = [
    'ニュース・報道',
    '情報・ワイドショー',
    'ドキュメンタリー・教養',
    'スポーツ',
    'ドラマ',
    'アニメ・特撮',
    'バラエティ',
    '音楽',
    '映画',
    '劇場・公演',
    '趣味・教育',
    '福祉',
    'その他',
];

// 色の選択肢 (表示名は表示言語に追従させる)
const colorItems = computed<{ title: string; value: TimeTableGenreHighlightColor }[]>(() => [
    { title: t('settings_dialogs.timetable.color_white'), value: 'White' },
    { title: t('settings_dialogs.timetable.color_pink'), value: 'Pink' },
    { title: t('settings_dialogs.timetable.color_red'), value: 'Red' },
    { title: t('settings_dialogs.timetable.color_orange'), value: 'Orange' },
    { title: t('settings_dialogs.timetable.color_yellow'), value: 'Yellow' },
    { title: t('settings_dialogs.timetable.color_lime'), value: 'Lime' },
    { title: t('settings_dialogs.timetable.color_teal'), value: 'Teal' },
    { title: t('settings_dialogs.timetable.color_cyan'), value: 'Cyan' },
    { title: t('settings_dialogs.timetable.color_blue'), value: 'Blue' },
    { title: t('settings_dialogs.timetable.color_ochre'), value: 'Ochre' },
    { title: t('settings_dialogs.timetable.color_brown'), value: 'Brown' },
]);

/**
 * 色の値を取得
 */
function getColorValue(color: TimeTableGenreHighlightColor): string {
    return TimeTableUtils.GENRE_HIGHLIGHT_COLORS[color].highlight;
}

/**
 * ジャンル色変更時のハンドラ
 */
function onGenreColorChange(genreKey: keyof ITimeTableGenreColors, color: TimeTableGenreHighlightColor): void {
    genreColors.value[genreKey] = color;
    settingsStore.settings.timetable_genre_colors = { ...genreColors.value };
}

// ダイアログを開いた時にジャンル色を同期
watch(dialogOpen, (value) => {
    if (value) {
        genreColors.value = { ...settingsStore.settings.timetable_genre_colors };
    }
});

</script>
<style lang="scss" scoped>

.timetable-settings-dialog {
    .v-card-title, & > div {
        @include smartphone-vertical {
            padding-left: 12px !important;
            padding-right: 12px !important;
        }
    }
    .v-card-title span {
        font-size: 20px;
        @include smartphone-vertical {
            font-size: 19px;
        }
    }
}

// views/Settings/Base.vue から抜粋して一部編集
.settings__item {
    display: flex;
    position: relative;
    flex-direction: column;
    margin-top: 24px;
    @include smartphone-horizontal {
        margin-top: 16px;
    }

    &--switch {
        margin-right: 62px;
    }

    &-heading {
        display: flex;
        align-items: center;
        color: rgb(var(--v-theme-text));
        font-size: 16.5px;
        @include smartphone-horizontal {
            font-size: 15px;
        }
    }
    &-label {
        margin-top: 8px;
        color: rgb(var(--v-theme-text-darken-1));
        font-size: 13.5px;
        line-height: 1.6;
        @include smartphone-horizontal {
            font-size: 11px;
            line-height: 1.7;
        }
    }
    &-form {
        margin-top: 14px;
        @include smartphone-horizontal {
            font-size: 13.5px;
        }
    }
    &-switch {
        display: flex !important;
        align-items: center;
        position: absolute;
        top: 0;
        right: -60px;
        bottom: 0px;
        margin-top: 0;
    }

    p {
        margin-bottom: 8px;
        &:last-of-type {
            margin-bottom: 0px;
        }
    }
}

.timetable-settings-dialog__toggle {
    :deep(.v-btn) {
        height: 36px;
        font-size: 14px;
        background-color: rgb(var(--v-theme-background-lighten-1)) !important;
    }
    :deep(.v-btn--active) {
        background-color: rgb(var(--v-theme-secondary)) !important;
    }
}

.timetable-settings-dialog__genre-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 14px;
}

.timetable-settings-dialog__genre-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.timetable-settings-dialog__genre-name {
    flex-shrink: 0;
    font-size: 14px;
    color: rgb(var(--v-theme-text));
    min-width: 155px;
}

.timetable-settings-dialog__genre-select {
    flex-shrink: 0;
    width: 140px;

    :deep(.v-field) {
        border-radius: 6px;
    }

    :deep(.v-field__input) {
        padding-top: 4px;
        padding-bottom: 4px;
        min-height: 36px;
        font-size: 13px;
    }
}

.timetable-settings-dialog__color-preview {
    width: 16px;
    height: 16px;
    border-radius: 4px;
    margin-right: 8px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

</style>
