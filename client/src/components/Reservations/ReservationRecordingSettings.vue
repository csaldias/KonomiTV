<template>
    <div class="reservation-recording-settings">
        <!-- 録画中の警告バナー -->
        <div v-if="reservation.is_recording_in_progress" class="recording-warning-banner">
            <Icon icon="fluent:warning-16-filled" class="recording-warning-banner__icon" />
            <span class="recording-warning-banner__text">
                {{ $t('reservations.settings.recording_locked') }}
            </span>
        </div>

        <!-- 録画設定プリセット選択（プリセットが2つ以上ある場合のみ表示） -->
        <div v-if="presets !== null && presets.presets.length >= 2" class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.preset') }}</div>
            <div class="reservation-recording-settings__description">
                {{ $t('reservations.settings.preset_label') }}
            </div>
            <v-select
                :disabled="reservation.is_recording_in_progress"
                v-model="selectedPresetId"
                :items="presetOptions"
                item-title="title"
                item-value="value"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="handlePresetChange">
            </v-select>
        </div>

        <!-- 録画予約の有効/無効 -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__header">
                <div class="reservation-recording-settings__label">{{ $t('reservations.settings.enabled') }}</div>
                <v-switch
                    :disabled="reservation.is_recording_in_progress"
                    style="height: 0; margin-top: -40px; margin-right: 6px;"
                    v-model="settings.is_enabled"
                    color="primary"
                    density="compact"
                    hide-details
                    @update:model-value="handleChange">
                </v-switch>
            </div>
            <div class="reservation-recording-settings__description mb-0">
                <span v-html="$t('reservations.settings.enabled_label')"></span>
            </div>
        </div>

        <!-- 録画予約の優先度 -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.priority') }}</div>
            <div class="reservation-recording-settings__description mb-0">
                {{ $t('reservations.settings.priority_label') }}
            </div>
            <div class="reservation-recording-settings__slider">
                <v-slider
                    :disabled="reservation.is_recording_in_progress"
                    v-model="settings.priority"
                    :min="1"
                    :max="5"
                    :step="1"
                    color="primary"
                    density="compact"
                    show-ticks="always"
                    thumb-label
                    hide-details
                    @update:model-value="handleChange">
                </v-slider>
            </div>
        </div>

        <!-- 録画フォルダのパス -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.folder') }}</div>
            <div class="reservation-recording-settings__description">
                {{ $t('reservations.settings.folder_label') }}
            </div>
            <v-text-field
                :disabled="reservation.is_recording_in_progress"
                v-model="recordingFolderPath"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                :placeholder="versionStore.is_linux_environment ? $t('reservations.settings.folder_placeholder_linux') : $t('reservations.settings.folder_placeholder_windows')"
                @update:model-value="handleChange">
            </v-text-field>
        </div>

        <!-- 録画ファイル名テンプレート -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.file_name') }}</div>
            <div class="reservation-recording-settings__description">
                <span v-html="$t('reservations.settings.file_name_label')"></span>
                <div class="mt-1">
                    <a class="link" href="https://github.com/xtne6f/EDCB/blob/work-plus-s/Document/Readme_EpgTimer.txt#L929-L1008" target="_blank">{{ $t('reservations.settings.template_syntax') }}</a> / <a class="link" href="https://github.com/xtne6f/EDCB/blob/work-plus-s/Document/Readme_Mod.txt#%E3%83%9E%E3%82%AF%E3%83%AD" target="_blank">{{ $t('reservations.settings.xtne6f_diff') }}</a>
                </div>
            </div>
            <v-text-field
                :disabled="reservation.is_recording_in_progress"
                v-model="recordingFileNameTemplate"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                placeholder="$ZtoH(Title)$.ts"
                @update:model-value="handleChange">
            </v-text-field>
        </div>

        <!-- 録画マージン -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.margin') }}</div>
            <div class="reservation-recording-settings__description">
                {{ $t('reservations.settings.margin_label') }}
            </div>
            <div class="reservation-recording-settings__margin-default">
                <v-checkbox
                    :disabled="reservation.is_recording_in_progress"
                    id="use-default-margin"
                    v-model="useDefaultMargin"
                    color="primary"
                    density="compact"
                    hide-details
                    @update:model-value="handleMarginDefaultChange">
                </v-checkbox>
                <label class="reservation-recording-settings__margin-default-text" for="use-default-margin"
                    style="user-select: none;">
                    {{ marginDefaultLabel }}
                </label>
            </div>
            <div class="reservation-recording-settings__margin-controls">
                <v-text-field
                    :disabled="reservation.is_recording_in_progress || useDefaultMargin"
                    v-model.number="settings.recording_start_margin"
                    color="primary"
                    variant="outlined"
                    density="compact"
                    type="number"
                    hide-details
                    :prefix="$t('reservations.settings.margin_start_prefix')"
                    :suffix="$t('reservations.settings.margin_start_suffix')"
                    style="width: 160px;"
                    @update:model-value="handleChange">
                </v-text-field>
                <v-text-field
                    :disabled="reservation.is_recording_in_progress || useDefaultMargin"
                    v-model.number="settings.recording_end_margin"
                    color="primary"
                    variant="outlined"
                    density="compact"
                    type="number"
                    hide-details
                    :prefix="$t('reservations.settings.margin_end_prefix')"
                    :suffix="$t('reservations.settings.margin_end_suffix')"
                    style="width: 166px;"
                    @update:model-value="handleChange">
                </v-text-field>
            </div>
        </div>

        <!-- 字幕データ録画設定 -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.caption') }}</div>
            <div class="reservation-recording-settings__description">
                <span v-html="$t('reservations.settings.caption_label')"></span>
            </div>
            <v-select
                :disabled="reservation.is_recording_in_progress"
                v-model="settings.caption_recording_mode"
                :items="captionRecordingOptions"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="handleChange">
            </v-select>
        </div>

        <!-- データ放送録画設定 -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.data_broadcasting') }}</div>
            <div class="reservation-recording-settings__description">
                <span v-html="$t('reservations.settings.data_broadcasting_label')"></span>
            </div>
            <v-select
                :disabled="reservation.is_recording_in_progress"
                v-model="settings.data_broadcasting_recording_mode"
                :items="dataBroadcastingRecordingOptions"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="handleChange">
            </v-select>
        </div>

        <!-- 録画後動作設定 -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.post_recording') }}</div>
            <div class="reservation-recording-settings__description">
                {{ $t('reservations.settings.post_recording_label') }}
            </div>
            <v-select
                :disabled="reservation.is_recording_in_progress"
                v-model="settings.post_recording_mode"
                :items="postRecordingOptions"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                @update:model-value="handleChange">
            </v-select>
        </div>

        <!-- 録画後実行スクリプトのパス -->
        <div class="reservation-recording-settings__section">
            <div class="reservation-recording-settings__label">{{ $t('reservations.settings.script') }}</div>
            <div class="reservation-recording-settings__description">
                {{ $t('reservations.settings.script_label', {extensions: versionStore.is_linux_environment ? '.sh / .lua' : '.bat / .ps1 / .lua'}) }}
            </div>
            <v-text-field
                :disabled="reservation.is_recording_in_progress"
                v-model="settings.post_recording_bat_file_path"
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                :placeholder="versionStore.is_linux_environment ? '/var/local/edcb/transcode.sh' : 'C:\\DTV\\EDCB\\Transcode.bat'"
                @update:model-value="handleChange">
            </v-text-field>
        </div>
    </div>
</template>
<script lang="ts" setup>

import { objectHash } from 'ohash';
import { ref, computed, watch, onMounted, toRaw } from 'vue';
import { useI18n } from 'vue-i18n';

import { type IReservation, type IRecordSettings, type IRecordSettingsPresets } from '@/services/Reservations';
import useVersionStore from '@/stores/VersionStore';

const { t } = useI18n();

// Props
const props = defineProps<{
    reservation: IReservation;
    presets: IRecordSettingsPresets | null;
    hasChanges: boolean;
}>();

// Emits
const emit = defineEmits<{
    (e: 'updateSettings', settings: IRecordSettings): void;
    (e: 'changesDetected', hasChanges: boolean): void;
}>();

// ストア
const versionStore = useVersionStore();

// 設定のコピーを作成（元の設定を変更しないため）
const settings = ref<IRecordSettings>(structuredClone(toRaw(props.reservation.record_settings)));

// 初期設定を保存（変更検知用）
const initialSettings = ref<IRecordSettings>(structuredClone(toRaw(props.reservation.record_settings)));

// 録画フォルダパス・録画ファイル名テンプレートの computed（settings.value を単一の情報源とする）
// 録画フォルダは仕様上は複数指定できるが、複数指定はほとんど使われないので、KonomiTV では常に 0 番目の要素を使用する
// 録画フォルダが空の場合はデフォルトの録画フォルダに保存される（フォーム上は空欄としておく）
const recordingFolderPath = computed({
    get: () => settings.value.recording_folders.length > 0
        ? settings.value.recording_folders[0].recording_folder_path
        : '',
    set: (value: string) => {
        updateRecordingFolderSettings(value, recordingFileNameTemplate.value);
    },
});

const recordingFileNameTemplate = computed({
    get: () => settings.value.recording_folders.length > 0
        ? settings.value.recording_folders[0].recording_file_name_template || ''
        : '',
    set: (value: string) => {
        updateRecordingFolderSettings(recordingFolderPath.value, value);
    },
});

// 録画フォルダ設定を更新する関数
const updateRecordingFolderSettings = (folderPath: string, fileNameTemplate: string) => {
    const hasFolderPath = folderPath.trim() !== '';
    const hasFileNameTemplate = fileNameTemplate.trim() !== '';

    if (!hasFolderPath && !hasFileNameTemplate) {
        // 両方とも空の場合は空リストにしてデフォルト設定を使用
        settings.value.recording_folders = [];
    } else {
        // どちらか一方でも指定されている場合は新しい要素を追加
        if (settings.value.recording_folders.length === 0) {
            settings.value.recording_folders.push({
                recording_folder_path: '',
                recording_file_name_template: null,
                is_oneseg_separate_recording_folder: false,
            });
        }
        // 録画フォルダパスとマクロを更新
        // 録画フォルダは仕様上は複数指定できるが、複数指定はほとんど使われないので、KonomiTV では常に 0 番目の要素を使用する
        settings.value.recording_folders[0].recording_folder_path = folderPath;
        settings.value.recording_folders[0].recording_file_name_template = fileNameTemplate || null;
    }
};

// デフォルトマージン使用フラグ
const useDefaultMargin = ref(
    settings.value.recording_start_margin === null && settings.value.recording_end_margin === null
);

// プリセット一覧のプルダウン選択肢
// プリセットが2つ以上ある場合のみ表示される
const presetOptions = computed(() => {
    if (props.presets === null) return [];
    return props.presets.presets.map(preset => ({
        title: preset.name,
        value: preset.id,
    }));
});

// 現在選択中のプリセット ID
const selectedPresetId = ref<number | null>(null);

// プリセットの選択が変更された時の処理
// フォーム全体をプリセットの録画設定値でリセットする
const handlePresetChange = (presetId: number) => {
    if (props.presets === null) return;
    const preset = props.presets.presets.find(p => p.id === presetId);
    if (!preset) return;

    // プリセットの録画設定をフォームに反映
    settings.value = structuredClone(toRaw(preset.record_settings));
    // デフォルトマージン使用フラグも再計算
    useDefaultMargin.value = (
        settings.value.recording_start_margin === null && settings.value.recording_end_margin === null
    );
    handleChange();
};

// 録画後動作モードの表示名 (表示言語に追従させる)
const postRecordingModeLabels = computed<Record<string, string>>(() => ({
    'Nothing': t('reservations.settings.post_nothing'),
    'Standby': t('reservations.settings.post_standby'),
    'StandbyAndReboot': t('reservations.settings.post_standby_reboot'),
    'Suspend': t('reservations.settings.post_suspend'),
    'SuspendAndReboot': t('reservations.settings.post_suspend_reboot'),
    'Shutdown': t('reservations.settings.post_shutdown'),
}));

// 字幕録画のオプション
// グローバルデフォルト値が取得できている場合は括弧書きで実際の値を表示
const captionRecordingOptions = computed(() => {
    const globalDefaults = props.presets?.global_defaults;
    const defaultLabel = globalDefaults
        ? t('reservations.settings.use_default_with', {value: globalDefaults.caption_recording_mode === 'Enable' ? t('reservations.settings.record') : t('reservations.settings.do_not_record')})
        : t('reservations.settings.use_default');
    return [
        { title: defaultLabel, value: 'Default' },
        { title: t('reservations.settings.record'), value: 'Enable' },
        { title: t('reservations.settings.do_not_record'), value: 'Disable' },
    ];
});

// データ放送録画のオプション
// グローバルデフォルト値が取得できている場合は括弧書きで実際の値を表示
const dataBroadcastingRecordingOptions = computed(() => {
    const globalDefaults = props.presets?.global_defaults;
    const defaultLabel = globalDefaults
        ? t('reservations.settings.use_default_with', {value: globalDefaults.data_broadcasting_recording_mode === 'Enable' ? t('reservations.settings.record') : t('reservations.settings.do_not_record')})
        : t('reservations.settings.use_default');
    return [
        { title: defaultLabel, value: 'Default' },
        { title: t('reservations.settings.record'), value: 'Enable' },
        { title: t('reservations.settings.do_not_record'), value: 'Disable' },
    ];
});

// 録画後動作のオプション
// グローバルデフォルト値が取得できている場合は括弧書きで実際の値を表示
const postRecordingOptions = computed(() => {
    const globalDefaults = props.presets?.global_defaults;
    const defaultLabel = globalDefaults
        ? t('reservations.settings.use_default_with', {value: postRecordingModeLabels.value[globalDefaults.post_recording_mode] ?? globalDefaults.post_recording_mode})
        : t('reservations.settings.use_default');
    return [
        { title: defaultLabel, value: 'Default' },
        { title: postRecordingModeLabels.value['Nothing'], value: 'Nothing' },
        { title: postRecordingModeLabels.value['Standby'], value: 'Standby' },
        { title: postRecordingModeLabels.value['StandbyAndReboot'], value: 'StandbyAndReboot' },
        { title: postRecordingModeLabels.value['Suspend'], value: 'Suspend' },
        { title: postRecordingModeLabels.value['SuspendAndReboot'], value: 'SuspendAndReboot' },
        { title: postRecordingModeLabels.value['Shutdown'], value: 'Shutdown' },
    ];
});

// 変更があるかどうかを計算
// ohash を使ってオブジェクトのハッシュ値を比較することで、より信頼性の高い変更検知を実現
const hasChangesComputed = computed(() => {
    return objectHash(settings.value) !== objectHash(initialSettings.value);
});

// 変更を監視
watch(hasChangesComputed, (newValue) => {
    emit('changesDetected', newValue);
});

// 保存後に initialSettings を更新（親から hasChanges が false になったことを監視）
// これにより、保存後は保存した状態が新しい基準となり、その状態からの差分で変更検知が行われる
watch(() => props.hasChanges, (newValue, oldValue) => {
    // hasChanges が true から false に変わったとき（保存完了時）
    if (oldValue === true && newValue === false) {
        // 現在の設定を新しい初期設定として保存
        initialSettings.value = structuredClone(toRaw(settings.value));
    }
});

// 変更時の処理（settings.value の変更を親に通知）
const handleChange = () => {
    emit('updateSettings', settings.value);
};

// マージンの「デフォルト設定を使う」ラベル
// グローバルデフォルト値が取得できている場合は括弧書きで実際の値を表示
const marginDefaultLabel = computed(() => {
    const globalDefaults = props.presets?.global_defaults;
    if (globalDefaults) {
        return t('reservations.settings.use_default_margin', {start: globalDefaults.recording_start_margin, end: globalDefaults.recording_end_margin});
    }
    return t('reservations.settings.use_default');
});

// マージンデフォルト設定の変更
// デフォルト → カスタムに切り替えた際は、グローバルデフォルト値を初期値として設定する
const handleMarginDefaultChange = () => {
    if (useDefaultMargin.value) {
        settings.value.recording_start_margin = null;
        settings.value.recording_end_margin = null;
    } else {
        // グローバルデフォルト値が取得できている場合はその値を使い、取得できていない場合はフォールバック値を使う
        const globalDefaults = props.presets?.global_defaults;
        settings.value.recording_start_margin = globalDefaults?.recording_start_margin ?? 5;
        settings.value.recording_end_margin = globalDefaults?.recording_end_margin ?? 2;
    }
    handleChange();
};

// props の予約情報が変更された時の処理
watch(() => props.reservation, (newReservation) => {
    settings.value = structuredClone(toRaw(newReservation.record_settings));
    initialSettings.value = structuredClone(toRaw(newReservation.record_settings));
    // フォルダパス等は computed で自動的に更新される
    // プリセット選択状態とデフォルトマージン使用フラグもリセット
    selectedPresetId.value = null;
    useDefaultMargin.value = (
        newReservation.record_settings.recording_start_margin === null &&
        newReservation.record_settings.recording_end_margin === null
    );
}, { deep: true });

// コンポーネントマウント時にバージョン情報を取得
onMounted(async () => {
    await versionStore.fetchServerVersion();
});

</script>
<style lang="scss" scoped>

.reservation-recording-settings {
    display: flex;
    flex-direction: column;
    gap: 16px;

    &__section {
        display: flex;
        flex-direction: column;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__label {
        font-size: 13.5px;
        font-weight: 700;
        line-height: 1.5;
        letter-spacing: 0.04em;
        color: rgb(var(--v-theme-text));
    }

    &__description {
        font-size: 12px;
        font-weight: 500;
        line-height: 1.55;
        color: rgb(var(--v-theme-text-darken-1));
        margin-top: 6px;
        margin-bottom: 10px;
    }

    &__description-small {
        font-size: 11.5px;
        font-weight: 500;
        line-height: 1.5;
        color: rgb(var(--v-theme-text-darken-1));
        margin-top: 6px;
    }

    &__slider {
        margin-top: 8px;
    }

    &__margin-controls {
        display: flex;
        gap: 6px;
    }

    &__margin-default {
        display: flex;
        align-items: center;
        gap: 4px;
        height: 20px;
        margin-left: -3px;
        margin-bottom: 10px;

        &-text {
            font-size: 12.5px;
        }
    }
}

// 録画中の警告バナー
.recording-warning-banner {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 4px;
    background-color: rgb(var(--v-theme-warning-darken-3), 0.5);
    border-radius: 6px;

    &__icon {
        color: rgb(var(--v-theme-warning));
        width: 22px;
        height: 22px;
        margin-right: 8px;
        flex-shrink: 0;
    }

    &__text {
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5;
        color: rgb(var(--v-theme-warning-lighten-1));
    }
}

</style>