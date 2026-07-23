
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/ja';
import { createI18n } from 'vue-i18n';
import { en as vuetifyEn, ja as vuetifyJa } from 'vuetify/locale';

import enMessages from '@/locales/en';
import jaMessages from '@/locales/ja';


// UI に表示可能な言語コード (vue-i18n / dayjs / Vuetify で共通利用する)
export type LocaleCode = 'ja' | 'en';

// 設定 (settings.language) に保存される表示言語の選択値
// 'Auto' はブラウザの言語設定に従う特別な値で、実際のロケールは resolveLocale() で決定する
export type Language = 'Auto' | 'Japanese' | 'English';


/**
 * 表示言語の設定値から、実際に適用するロケールコードを解決する
 * 'Auto' の場合はブラウザの言語設定を参照し、日本語圏なら 'ja'、それ以外は 'en' にフォールバックする
 * @param language 表示言語の設定値
 * @returns 実際に適用するロケールコード
 */
export function resolveLocale(language: Language): LocaleCode {
    if (language === 'Japanese') {
        return 'ja';
    }
    if (language === 'English') {
        return 'en';
    }
    // 'Auto': ブラウザの優先言語が日本語なら 'ja'、そうでなければ 'en' を採用する
    return navigator.language.toLowerCase().startsWith('ja') ? 'ja' : 'en';
}


/**
 * Pinia (SettingsStore) の初期化前でも初回描画から正しい言語で表示できるよう、
 * LocalStorage に保存された生の設定データから表示言語の設定値を直接読み出す
 * (SettingsStore を経由すると循環参照や初期化順序の問題が生じるため、あえて生データを直接参照している)
 * @returns 表示言語の設定値 (未設定・パース失敗時は 'Auto')
 */
function getInitialLanguage(): Language {
    try {
        const raw = localStorage.getItem('KonomiTV-Settings');
        if (raw !== null) {
            const language = JSON.parse(raw).language;
            if (language === 'Auto' || language === 'Japanese' || language === 'English') {
                return language;
            }
        }
    } catch {
        // パースに失敗しても後続処理に影響しないため、握りつぶして 'Auto' にフォールバックする
    }
    return 'Auto';
}


// vue-i18n インスタンスを生成する
// - legacy: false / globalInjection: true にすることで、Options API・Composition API の双方の
//   テンプレートで $t() を、<script setup> で useI18n() をそのまま利用できる
// - Vuetify 標準コンポーネントの文言 ($vuetify 名前空間) も同じカタログにマージし、
//   Vuetify 側は vue-i18n アダプター経由でこのロケールに追従させる (plugins/vuetify.ts を参照)
// - メッセージ内に <br> や <strong> を意図的に含めて v-html で描画するため、warnHtmlMessage を無効化している
const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: resolveLocale(getInitialLanguage()),
    fallbackLocale: 'ja',
    warnHtmlMessage: false,
    messages: {
        ja: { ...jaMessages, $vuetify: vuetifyJa },
        en: { ...enMessages, $vuetify: vuetifyEn },
    },
});


/**
 * 表示言語の設定値を UI 全体に適用する
 * vue-i18n のロケールに加え、dayjs のロケールと <html lang> 属性も合わせて切り替える
 * (Vuetify のロケールは vue-i18n アダプター経由で自動的に追従するため、ここでは触れない)
 * @param language 表示言語の設定値
 */
export function setLanguage(language: Language): void {
    const locale = resolveLocale(language);
    // vue-i18n のロケールを切り替える (legacy: false のため locale は WritableRef)
    i18n.global.locale.value = locale;
    // dayjs はシングルトンのため、ここで切り替えると Utils 側の dayjs にも反映される
    dayjs.locale(locale);
    // スクリーンリーダーや :lang() セレクタのために <html lang> 属性も更新する
    document.documentElement.setAttribute('lang', locale);
    // CSS の content 擬似要素で表示している「デバイス間同期無効」バッジ (Base.vue) の文言を、
    // CSS 変数経由で現在のロケールに追従させる (JSON.stringify で CSS 文字列リテラル用にダブルクオートで囲む)
    document.documentElement.style.setProperty(
        '--konomitv-sync-disabled-badge',
        JSON.stringify(i18n.global.t('settings.common.sync_disabled_badge')),
    );
}

// 初回描画時点で <html lang> と dayjs のロケールを初期値に揃えておく
setLanguage(getInitialLanguage());


export default i18n;
