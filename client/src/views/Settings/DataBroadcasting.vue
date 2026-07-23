<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <svg width="27px" height="27px" viewBox="0 0 512 512">
                <path fill="currentColor" d="M248.039 381.326L355.039 67.8258C367.539 28.3257 395.039 34.3258 406.539 34.3258C431.039 34.3258 453.376 61.3258 441.039 96.8258C362.639 322.426 343.539 375.326 340.539 384.826C338.486 391.326 342.039 391.326 345.539 391.326C377.039 391.326 386.539 418.326 386.539 435.326C386.539 458.826 371.539 477.326 350.039 477.326H214.539C179.039 477.326 85.8269 431.3 88.0387 335.826C91.0387 206.326 192.039 183.326 243.539 183.326H296.539L265.539 272.326H243.539C185.539 272.326 174.113 314.826 176.039 334.326C180.039 374.826 215.039 389.814 237.039 390.326C244.539 390.5 246.039 386.826 248.039 381.326Z" />
            </svg>
            <span class="ml-2">{{ $t('settings.data_broadcasting.title') }}</span>
        </h2>
        <div class="settings__content">
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" for="tv_show_data_broadcasting">{{ $t('settings.data_broadcasting.tv_show_data_broadcasting.heading') }}</label>
                <label class="settings__item-label" for="tv_show_data_broadcasting" v-html="$t('settings.data_broadcasting.tv_show_data_broadcasting.label_1')"></label>
                <label class="settings__item-label" for="tv_show_data_broadcasting" v-html="$t('settings.data_broadcasting.tv_show_data_broadcasting.label_2')"></label>
                <v-switch class="settings__item-switch" color="primary" id="tv_show_data_broadcasting" hide-details
                    v-model="settingsStore.settings.tv_show_data_broadcasting">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" for="enable_internet_access_from_data_broadcasting">{{ $t('settings.data_broadcasting.enable_internet_access.heading') }}</label>
                <label class="settings__item-label" for="enable_internet_access_from_data_broadcasting" v-html="$t('settings.data_broadcasting.enable_internet_access.label_1')"></label>
                <label class="settings__item-label" for="enable_internet_access_from_data_broadcasting" v-html="$t('settings.data_broadcasting.enable_internet_access.label_2')"></label>
                <v-switch class="settings__item-switch" color="primary" id="enable_internet_access_from_data_broadcasting" hide-details
                    v-model="settingsStore.settings.enable_internet_access_from_data_broadcasting">
                </v-switch>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item settings__item--sync-disabled" @submit.prevent>
                <label class="settings__item-heading">{{ $t('settings.data_broadcasting.zip_code.heading') }}</label>
                <label class="settings__item-label" v-html="$t('settings.data_broadcasting.zip_code.label')"></label>
                <v-text-field class="settings__item-form" color="primary" variant="outlined"
                    :placeholder="$t('settings.data_broadcasting.zip_code.placeholder')" :density="is_form_dense ? 'compact' : 'default'"
                    :rules="[data_broadcasting_zip_code_validation]" v-model="data_broadcasting_zip_code">
                </v-text-field>
            </div>
            <div class="settings__item settings__item--sync-disabled mt-2">
                <label class="settings__item-heading">{{ $t('settings.data_broadcasting.prefecture.heading') }}</label>
                <label class="settings__item-label" v-html="$t('settings.data_broadcasting.prefecture.label')"></label>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="data_broadcasting_prefectures" v-model="data_broadcasting_prefecture">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading text-error-lighten-1">{{ $t('settings.data_broadcasting.reset.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.data_broadcasting.reset.label')"></div>
            </div>
            <v-btn class="settings__save-button bg-error mt-5" variant="flat" @click="resetNVRAMSettings()">
                <Icon icon="material-symbols:device-reset-rounded" class="mr-2" height="23px" />{{ $t('settings.data_broadcasting.reset.button') }}
            </v-btn>
        </div>
    </SettingsBase>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

import Message from '@/message';
import useSettingsStore from '@/stores/SettingsStore';
import Utils from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

// データ放送の NVRAM のうち、郵便番号/都道府県設定の保存に使う LocalStorage キーのプレフィックス
const NVRAM_LOCAL_STORAGE_PREFIX = 'KonomiTV-BMLBrowser_nvram_prefix=receiverinfo%2F';

// 都道府県の選択肢テーブル (NVRAM の内部値と表示ラベルの翻訳キーの対応)
// 表示名を表示言語に追従させるため、value と翻訳キーのみを保持し、title は computed で組み立てる
const PREFECTURE_TABLE = [
    {value: '255-0b0', key: 'not_set'},
    {value: '2-0b000101101011', key: 'hokkaido_west'},
    {value: '1-0b000101101011', key: 'hokkaido_east'},
    {value: '3-0b010001100111', key: 'aomori'},
    {value: '4-0b010111010100', key: 'iwate'},
    {value: '5-0b011101011000', key: 'miyagi'},
    {value: '6-0b101011000110', key: 'akita'},
    {value: '7-0b111001001100', key: 'yamagata'},
    {value: '8-0b000110101110', key: 'fukushima'},
    {value: '9-0b110001101001', key: 'ibaraki'},
    {value: '10-0b111000111000', key: 'tochigi'},
    {value: '11-0b100110001011', key: 'gunma'},
    {value: '12-0b011001001011', key: 'saitama'},
    {value: '13-0b000111000111', key: 'chiba'},
    {value: '14-0b101010101100', key: 'tokyo'},
    {value: '49-0b101010101100', key: 'tokyo_islands'},
    {value: '15-0b010101101100', key: 'kanagawa'},
    {value: '16-0b010011001110', key: 'niigata'},
    {value: '17-0b010100111001', key: 'toyama'},
    {value: '18-0b011010100110', key: 'ishikawa'},
    {value: '19-0b100100101101', key: 'fukui'},
    {value: '20-0b110101001010', key: 'yamanashi'},
    {value: '21-0b100111010010', key: 'nagano'},
    {value: '22-0b101001100101', key: 'gifu'},
    {value: '23-0b101001011010', key: 'shizuoka'},
    {value: '24-0b100101100110', key: 'aichi'},
    {value: '25-0b001011011100', key: 'mie'},
    {value: '26-0b110011100100', key: 'shiga'},
    {value: '27-0b010110011010', key: 'kyoto'},
    {value: '28-0b110010110010', key: 'osaka'},
    {value: '29-0b011001110100', key: 'hyogo'},
    {value: '30-0b101010010011', key: 'nara'},
    {value: '31-0b001110010110', key: 'wakayama'},
    {value: '32-0b110100100011', key: 'tottori'},
    {value: '33-0b001100011011', key: 'shimane'},
    {value: '34-0b001010110101', key: 'okayama'},
    {value: '35-0b101100110001', key: 'hiroshima'},
    {value: '36-0b101110011000', key: 'yamaguchi'},
    {value: '37-0b111001100010', key: 'tokushima'},
    {value: '38-0b100110110100', key: 'kagawa'},
    {value: '39-0b000110011101', key: 'ehime'},
    {value: '40-0b001011100011', key: 'kochi'},
    {value: '41-0b011000101101', key: 'fukuoka'},
    {value: '42-0b100101011001', key: 'saga'},
    {value: '43-0b101000101011', key: 'nagasaki'},
    {value: '44-0b100010100111', key: 'kumamoto'},
    {value: '45-0b110010001101', key: 'oita'},
    {value: '46-0b110100011100', key: 'miyazaki'},
    {value: '47-0b110101000101', key: 'kagoshima'},
    {value: '50-0b110101000101', key: 'kagoshima_islands'},
    {value: '48-0b001101110010', key: 'okinawa'},
];

export default defineComponent({
    name: 'Settings-DataBroadcasting',
    components: {
        SettingsBase,
    },
    data() {
        return {

            // フォームを小さくするかどうか
            is_form_dense: Utils.isSmartphoneHorizontal(),

            // データ放送向け郵便番号設定
            data_broadcasting_zip_code: '' as string,

            // データ放送向け都道府県設定
            data_broadcasting_prefecture: '255-0b0' as string,
        };
    },
    computed: {
        ...mapStores(useSettingsStore),

        // データ放送向け都道府県の選択肢 (表示名を表示言語に追従させる)
        data_broadcasting_prefectures() {
            return PREFECTURE_TABLE.map((prefecture) => ({
                title: this.$t(`settings.data_broadcasting.prefecture_option.${prefecture.key}`),
                value: prefecture.value,
            }));
        },
    },
    watch: {
        async data_broadcasting_zip_code(new_value: string) {
            // バリデーションチェック
            // なぜか Vuetify のバリデーション機能を使うと一つ前の入力値のバリデーション結果が返ってきてしまう (?) ので、自前でチェックする
            if (this.data_broadcasting_zip_code_validation(new_value) !== true) {
                return;
            }
            // 郵便番号設定を LocalStorage に保存する
            if (new_value !== '') {
                // - を除去してから Base64 エンコードする
                const zip_code_raw = window.btoa(new_value.replace('-', ''));
                localStorage.setItem(`${NVRAM_LOCAL_STORAGE_PREFIX}zipcode`, zip_code_raw);
            } else {
                // 未設定の場合は LocalStorage から削除する
                localStorage.removeItem(`${NVRAM_LOCAL_STORAGE_PREFIX}zipcode`);
            }
        },
        data_broadcasting_prefecture(new_value: string) {
            // 都道府県設定を LocalStorage に保存する
            if (new_value !== '255-0b0') {
                const value = new_value.split('-0b');
                const prefecture_number = parseInt(value[0]);
                const prefecture_raw = window.btoa(String.fromCharCode(prefecture_number));
                localStorage.setItem(`${NVRAM_LOCAL_STORAGE_PREFIX}prefecture`, prefecture_raw);
                const region_code_number = parseInt(value[1], 2);  // 2進数の文字列を10進数の数値に変換する
                const region_code_raw = window.btoa(String.fromCharCode(region_code_number >> 8, region_code_number & 0xff));
                localStorage.setItem(`${NVRAM_LOCAL_STORAGE_PREFIX}regioncode`, region_code_raw);
            } else {
                // 未設定の場合は LocalStorage から削除する
                localStorage.removeItem(`${NVRAM_LOCAL_STORAGE_PREFIX}prefecture`);
                localStorage.removeItem(`${NVRAM_LOCAL_STORAGE_PREFIX}regioncode`);
            }
        }
    },
    created() {
        // 郵便番号設定を LocalStorage から読み込む
        const zip_code_raw = localStorage.getItem(`${NVRAM_LOCAL_STORAGE_PREFIX}zipcode`);
        if (zip_code_raw) {
            try {
                // 3文字目と4文字目の間に - を挿入する
                this.data_broadcasting_zip_code = window.atob(zip_code_raw);
                this.data_broadcasting_zip_code = this.data_broadcasting_zip_code.slice(0, 3) + '-' + this.data_broadcasting_zip_code.slice(3);
            } catch (error) {
                // 何もしない
            }
        }
        // 都道府県設定を LocalStorage から読み込む
        // 現在設定されている都道府県を特定するだけなら regioncode は不要なので、省略している
        const prefecture_raw = localStorage.getItem(`${NVRAM_LOCAL_STORAGE_PREFIX}prefecture`);
        if (prefecture_raw) {
            try {
                const prefecture = window.atob(prefecture_raw).charCodeAt(0);
                for (const item of this.data_broadcasting_prefectures) {
                    if (item.value.startsWith(`${prefecture}-`)) {
                        this.data_broadcasting_prefecture = item.value;
                        break;
                    }
                }
            } catch (error) {
                // 何もしない
            }
        }
    },
    methods: {

        // データ放送向け郵便番号（日本）のバリデーション関数
        data_broadcasting_zip_code_validation(value: string): boolean | string {
            if (value === '') {
                return true;
            }
            if (value.match(/^[0-9]{3}-[0-9]{4}$/) === null) {
                return this.$t('settings.data_broadcasting.zip_code.validation');
            }
            return true;
        },

        resetNVRAMSettings() {
            // KonomiTV-BMLBrowser_nvram_ から始まる LocalStorage の項目をすべて削除する
            for (const key in localStorage) {
                if (key.startsWith('KonomiTV-BMLBrowser_nvram_')) {
                    localStorage.removeItem(key);
                }
            }
            this.data_broadcasting_zip_code = '';
            this.data_broadcasting_prefecture = '255-0b0';
            Message.success(this.$t('settings.data_broadcasting.message_reset_done'));
        }
    }
});

</script>
