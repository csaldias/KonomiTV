<template>
    <div v-ripple class="program-info-language-button" role="button"
        :class="{'program-info-language-button--english': isEnglish}"
        :title="isEnglish ? $t('header.program_info_language_to_japanese') : $t('header.program_info_language_to_english')"
        @click="programTranslationsStore.toggleDisplayLanguage()">
        <Icon icon="fluent:translate-20-regular" height="20px" />
        <span class="program-info-language-button__label">{{isEnglish ? 'EN' : 'JA'}}</span>
    </div>
</template>
<script lang="ts" setup>

import { computed } from 'vue';

import useProgramTranslationsStore from '@/stores/ProgramTranslationsStore';

const programTranslationsStore = useProgramTranslationsStore();

// 番組情報を英語で表示しているかどうか
// ボタンには、現在表示している言語を表示する
const isEnglish = computed(() => programTranslationsStore.isEnglishEnabled());

</script>
<style lang="scss" scoped>

.program-info-language-button {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 36px;
    padding: 0 10px;
    border-radius: 8px;
    color: rgb(var(--v-theme-text));
    background: rgb(var(--v-theme-background-lighten-1));
    cursor: pointer;
    user-select: none;
    transition: background-color 0.15s ease;

    @include smartphone-horizontal {
        height: 30px;
        padding: 0 8px;
    }
    @include smartphone-vertical {
        height: 32px;
        padding: 0 8px;
    }

    // 英語で表示しているときは、切り替えていることが分かるようにハイライトする
    &--english {
        background: rgb(var(--v-theme-primary));
    }

    &__label {
        margin-left: 4px;
        font-size: 13px;
        font-weight: bold;
        letter-spacing: 0.05em;
    }
}

</style>
