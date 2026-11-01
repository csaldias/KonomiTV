<template>
    <CapturePage :crumbs="[
        { name: $t('common.home'), path: '/' },
        { name: $t('navigation.captures'), path: '/captures/' },
        { name: $t('captures.common.by_tag'), path: '/captures/tags/', disabled: true },
    ]">
        <CaptureHeader :title="$t('captures.common.by_tag')" :total="null" active-tab="Tags" />

        <div v-if="!isLoggedIn && !isLoading" class="capture-empty">
            <Icon class="capture-empty__icon" icon="fluent:person-20-regular" width="54px" height="54px" />
            <div class="capture-empty__message">{{ $t('captures.tags.login_required') }}</div>
            <div class="capture-empty__sub">{{ $t('captures.common.login_required_sub') }}</div>
            <v-btn class="mt-6 px-4" color="secondary" variant="flat" height="40" to="/login/">
                <Icon icon="fa:sign-in" class="mr-2" />{{ $t('account.login') }}
            </v-btn>
        </div>
        <!-- ログイン状態の確認中も、ほかのキャプチャの画面と同じく中央にスピナーを表示する -->
        <div v-else-if="!isLoggedIn" class="capture-loading">
            <Icon icon="line-md:loading-twotone-loop" width="48px" height="48px" />
        </div>
        <template v-else>
            <!-- 番組別のタブの検索欄と同じ位置・見た目で、タグの名前での絞り込みを配置する -->
            <!-- タグの作成は、絞り込みの入力と取り違えないよう、右のボタンからダイアログで行う -->
            <div class="capture-tags__toolbar">
                <v-text-field v-model="queryInput" class="capture-tags__search" color="primary" bg-color="background-lighten-1"
                    variant="solo" density="comfortable" hide-details flat clearable :placeholder="$t('captures.tags.filter_placeholder')">
                    <template #prepend-inner>
                        <Icon icon="fluent:search-20-regular" width="18px" class="text-text-darken-1" />
                    </template>
                </v-text-field>
                <v-btn color="primary" variant="flat" height="48" class="capture-tags__create-button" @click="startCreate">
                    <Icon icon="fluent:add-12-filled" width="18px" />
                    <span class="ml-1">{{ $t('captures.tags.create') }}</span>
                </v-btn>
            </div>

            <!-- 読み込み中は、ほかのキャプチャの画面と同じく見出しより下の領域の中央にスピナーを表示する -->
            <div v-if="isLoading" class="capture-loading">
                <Icon icon="line-md:loading-twotone-loop" width="48px" height="48px" />
            </div>
            <div v-else-if="isLoadFailed" class="capture-empty">
                <Icon class="capture-empty__icon" icon="fluent:cloud-error-20-regular" width="54px" height="54px" />
                <div class="capture-empty__message">{{ $t('captures.tags.load_failed') }}</div>
                <div class="capture-empty__sub">{{ $t('captures.common.load_failed_sub') }}</div>
            </div>
            <div v-else-if="tags.length === 0" class="capture-empty">
                <Icon class="capture-empty__icon" icon="fluent:tag-multiple-20-regular" width="54px" height="54px" />
                <div class="capture-empty__message">{{ $t('captures.tags.empty') }}</div>
                <div class="capture-empty__sub">{{ $t('captures.tags.empty_sub') }}</div>
            </div>
            <div v-else-if="filteredTags.length === 0" class="capture-empty">
                <Icon class="capture-empty__icon" icon="fluent:search-20-regular" width="54px" height="54px" />
                <div class="capture-empty__message">{{ $t('captures.tags.empty_filtered') }}</div>
                <div class="capture-empty__sub">{{ $t('captures.tags.empty_filtered_sub') }}</div>
            </div>
            <div class="capture-tags__list">
                <router-link v-for="tag in filteredTags" :key="tag.id" v-ripple class="capture-tag-card" :to="`/captures/tags/${tag.id}`">
                    <Icon class="capture-tag-card__icon" icon="fluent:tag-20-filled" width="22px" />
                    <div class="capture-tag-card__body">
                        <div class="capture-tag-card__name">{{ tag.name }}</div>
                        <div class="capture-tag-card__count">{{ $t('captures.common.count_unit', {count: tag.capture_count.toLocaleString()}) }}</div>
                    </div>
                    <v-menu location="bottom end">
                        <template #activator="{ props: menuProps }">
                            <div v-ripple class="capture-tag-card__menu" v-bind="menuProps" @click.prevent.stop>
                                <Icon icon="fluent:more-vertical-20-filled" width="20px" />
                            </div>
                        </template>
                        <v-list density="compact" bg-color="background-lighten-1">
                            <v-list-item @click="startRename(tag)">
                                <template #prepend><Icon icon="fluent:rename-20-regular" width="20px" /></template>
                                <v-list-item-title class="ml-3">{{ $t('captures.tags.rename') }}</v-list-item-title>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item class="text-error" @click="deletingTag = tag">
                                <template #prepend><Icon icon="fluent:delete-20-regular" width="20px" /></template>
                                <v-list-item-title class="ml-3">{{ $t('captures.tags.delete') }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </router-link>
            </div>
        </template>

        <!-- 見出し・余白・ボタンの並びは、ほかの画面の入力欄のあるダイアログ (Twitter.vue のアカウント連携など) と同じ作りにする -->
        <v-dialog max-width="480" :model-value="isCreateOpen" @update:model-value="isCreateOpen = false">
            <v-card>
                <v-card-title class="d-flex justify-center pt-6 font-weight-bold">{{ $t('captures.tags.create') }}</v-card-title>
                <v-card-text class="pt-2 pb-0">
                    <v-text-field v-model="newTagName" class="mt-4" color="primary" variant="outlined" hide-details
                        :label="$t('captures.tags.tag_name')" :placeholder="$t('captures.tags.name_placeholder')" maxlength="100" autofocus
                        @keydown.enter="createTag" />
                </v-card-text>
                <v-card-actions class="pt-6 px-6 pb-6">
                    <v-spacer></v-spacer>
                    <v-btn color="text" variant="text" height="40" @click="isCreateOpen = false">
                        <Icon icon="fluent:dismiss-16-filled" width="18px" height="18px" />
                        <span class="ml-1">{{ $t('common.cancel') }}</span>
                    </v-btn>
                    <v-btn color="secondary" variant="flat" height="40" class="px-3" :disabled="newTagName.trim() === ''" @click="createTag()">
                        <Icon icon="fluent:add-16-filled" width="18px" height="18px" />
                        <span class="ml-1">{{ $t('captures.tags.create') }}</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog max-width="480" :model-value="renamingTag !== null" @update:model-value="renamingTag = null">
            <v-card>
                <v-card-title class="d-flex justify-center pt-6 font-weight-bold">{{ $t('captures.tags.rename_title') }}</v-card-title>
                <v-card-text class="pt-2 pb-0">
                    <v-text-field v-model="renameInput" class="mt-4" color="primary" variant="outlined" hide-details
                        :label="$t('captures.tags.tag_name')" maxlength="100" autofocus @keydown.enter="renameTag" />
                </v-card-text>
                <v-card-actions class="pt-6 px-6 pb-6">
                    <v-spacer></v-spacer>
                    <v-btn color="text" variant="text" height="40" @click="renamingTag = null">
                        <Icon icon="fluent:dismiss-16-filled" width="18px" height="18px" />
                        <span class="ml-1">{{ $t('common.cancel') }}</span>
                    </v-btn>
                    <v-btn color="secondary" variant="flat" height="40" class="px-3" :disabled="renameInput.trim() === ''" @click="renameTag()">
                        <Icon icon="fluent:rename-16-regular" width="18px" height="18px" />
                        <span class="ml-1">{{ $t('captures.tags.rename') }}</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog max-width="480" :model-value="deletingTag !== null" @update:model-value="deletingTag = null">
            <v-card>
                <v-card-title class="d-flex justify-center pt-6 font-weight-bold">{{ $t('captures.tags.delete_title', {name: deletingTag?.name ?? ''}) }}</v-card-title>
                <v-card-text class="pt-2 pb-0">
                    <span v-html="$t('captures.tags.delete_text')"></span>
                </v-card-text>
                <v-card-actions class="pt-4 px-6 pb-6">
                    <v-spacer></v-spacer>
                    <v-btn color="text" variant="text" height="40" @click="deletingTag = null">
                        <Icon icon="fluent:dismiss-16-filled" width="18px" height="18px" />
                        <span class="ml-1">{{ $t('common.cancel') }}</span>
                    </v-btn>
                    <v-btn color="error" variant="flat" height="40" class="px-3" @click="deleteTag">
                        <Icon icon="fluent:delete-16-regular" width="18px" height="18px" />
                        <span class="ml-1">{{ $t('captures.tags.delete') }}</span>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </CapturePage>
</template>
<script lang="ts" setup>

import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import CaptureHeader from '@/components/Captures/CaptureHeader.vue';
import CapturePage from '@/components/Captures/CapturePage.vue';
import Message from '@/message';
import Captures, { ICaptureTag } from '@/services/Captures';
import useUserStore from '@/stores/UserStore';
import Utils from '@/utils';

const { t } = useI18n();


const userStore = useUserStore();
const tags = ref<ICaptureTag[]>([]);
const isLoading = ref(true);
// 読み込みに失敗したか (0件と区別して、読み込めなかったことを伝えるため)
const isLoadFailed = ref(false);
// 前回確認したログイン状態を初期値とし、ログイン済みならタグの作成フォームをすぐに表示する
const isLoggedIn = ref(userStore.is_logged_in);

// タグの名前での絞り込み (タグの一覧は取得済みなので、入力するたびに画面の中で絞り込む)
// 録画番組の検索と同じく、空白で区切った語をすべて含むタグに絞る
const queryInput = ref<string | null>('');
const filteredTags = computed(() => {
    const keywords = (queryInput.value ?? '').toLowerCase().split(/\s+/).filter(keyword => keyword !== '');
    return tags.value.filter(tag => keywords.every(keyword => tag.name.toLowerCase().includes(keyword)));
});

const isCreateOpen = ref(false);
const newTagName = ref('');
const startCreate = () => {
    newTagName.value = '';
    isCreateOpen.value = true;
};
const renamingTag = ref<ICaptureTag | null>(null);
const renameInput = ref('');
const deletingTag = ref<ICaptureTag | null>(null);

const load = async () => {
    const result = await Captures.fetchTags();
    isLoadFailed.value = result === null;
    tags.value = result ?? [];
};

// event は入力欄で Enter キーを押したときだけ渡される
const createTag = async (event?: KeyboardEvent) => {
    // IME で入力中の文字を確定する Enter キーでは作成しない
    if (event !== undefined && Utils.isIMEComposing(event)) {
        return;
    }
    const name = newTagName.value.trim();
    if (name === '') {
        return;
    }
    // 作成できなかったとき (同じ名前のタグがあるときなど) は、入力した名前を直せるよう、ダイアログを開いたままにする
    const tag = await Captures.createTag(name);
    if (tag !== null) {
        isCreateOpen.value = false;
        newTagName.value = '';
        Message.success(t('captures.tags.created', {name: tag.name}));
        await load();
    }
};

const startRename = (tag: ICaptureTag) => {
    renamingTag.value = tag;
    renameInput.value = tag.name;
};
// event は入力欄で Enter キーを押したときだけ渡される
const renameTag = async (event?: KeyboardEvent) => {
    // IME で入力中の文字を確定する Enter キーでは変更しない
    if (event !== undefined && Utils.isIMEComposing(event)) {
        return;
    }
    if (renamingTag.value === null || renameInput.value.trim() === '') {
        return;
    }
    // 名前を変えられなかったとき (同じ名前のタグがあるときなど) は、入力した名前を直せるよう、ダイアログを開いたままにする
    const target = renamingTag.value;
    const tag = await Captures.renameTag(target.id, renameInput.value.trim());
    if (tag === null) {
        return;
    }
    if (renamingTag.value?.id === target.id) {
        renamingTag.value = null;
    }
    await load();
};
const deleteTag = async () => {
    if (deletingTag.value === null) {
        return;
    }
    const name = deletingTag.value.name;
    const success = await Captures.deleteTag(deletingTag.value.id);
    deletingTag.value = null;
    if (success) {
        Message.success(t('captures.tags.deleted', {name}));
        await load();
    }
};

onMounted(async () => {
    await userStore.fetchUser();
    isLoggedIn.value = userStore.is_logged_in;
    if (isLoggedIn.value) {
        await load();
    }
    isLoading.value = false;
});

</script>
<style lang="scss" scoped>

.capture-tags {
    // 検索欄の高さ・幅・文字の大きさと下の余白は、番組別のタブの検索欄 (Programs.vue) にそろえる
    &__toolbar {
        display: flex;
        gap: 10px;
        margin-bottom: 16px;
        @include smartphone-horizontal {
            gap: 8px;
        }
        @include smartphone-vertical {
            gap: 8px;
        }
        :deep(.v-field__input) {
            font-size: 14px !important;
        }
    }
    &__search {
        flex: 0 1 420px;
        min-width: 0;
    }
    &__create-button {
        flex-shrink: 0;
        margin-left: auto;
        border-radius: 7px;
        letter-spacing: 0;
    }
    &__list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 12px;
        @include smartphone-vertical {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
        }
    }
}

.capture-tag-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 8px 14px 16px;
    border-radius: 10px;
    background: rgb(var(--v-theme-background-lighten-1));
    color: rgb(var(--v-theme-text));
    text-decoration: none;
    &:hover {
        background: rgb(var(--v-theme-background-lighten-2));
    }
    &__icon {
        flex-shrink: 0;
        color: rgb(var(--v-theme-primary));
    }
    &__body {
        flex: 1;
        min-width: 0;
    }
    &__name {
        font-size: 15px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    &__count {
        margin-top: 2px;
        font-size: 12.5px;
        color: rgb(var(--v-theme-text-darken-1));
    }
    &__menu {
        display: flex;
        flex-shrink: 0;
        padding: 6px;
        border-radius: 50%;
    }
}

</style>
