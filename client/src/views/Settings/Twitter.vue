<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <Icon icon="fa-brands:twitter" width="22px" />
            <span class="ml-3">{{ $t('settings.twitter.title') }}</span>
        </h2>
        <div class="settings__content" :class="{'settings__content--loading': is_loading}">
            <div class="twitter-accounts">
                <div class="twitter-accounts__heading" v-if="has_linked_accounts">
                    <Icon icon="fluent:person-board-20-filled" class="mr-2" height="30" />{{ $t('settings.twitter.linked_heading') }}
                </div>
                <div class="twitter-accounts__guide" v-if="has_no_linked_accounts">
                    <Icon class="flex-shrink-0" icon="fa-brands:twitter" width="45px" />
                    <div class="ml-4">
                        <div class="font-weight-bold text-h6">{{ $t('settings.twitter.guide_no_link_title') }}</div>
                        <div class="text-text-darken-1 text-subtitle-2 mt-1">
                            {{ $t('settings.twitter.guide_no_link_description') }}
                        </div>
                    </div>
                </div>
                <div class="twitter-account"
                    v-for="twitter_account in (userStore.user !== null ? userStore.user.twitter_accounts: [])"
                    :key="`twitter-${twitter_account.id}`">
                    <div class="twitter-account__icon-wrapper">
                        <img class="twitter-account__icon" :src="twitter_account.icon_url">
                        <span class="twitter-account__service-badge twitter-account__service-badge--twitter">
                            <Icon icon="fa-brands:twitter" />
                        </span>
                    </div>
                    <div class="twitter-account__info">
                        <div class="twitter-account__info-name">
                            <span class="twitter-account__info-name-text">{{twitter_account.name}}</span>
                        </div>
                        <span class="twitter-account__info-screen-name">
                            <span class="twitter-account__info-screen-name-handle">@{{twitter_account.screen_name}}</span>
                        </span>
                    </div>
                    <v-btn class="twitter-account__logout ml-auto" width="124" height="52" variant="flat"
                        @click="logoutTwitterAccount(twitter_account.screen_name)">
                        <Icon icon="fluent:plug-disconnected-20-filled" class="mr-2" height="24" />{{ $t('settings.twitter.logout_button') }}
                    </v-btn>
                </div>
                <div class="twitter-account"
                    v-for="bluesky_account in (userStore.user !== null ? userStore.user.bluesky_accounts: [])"
                    :key="`bluesky-${bluesky_account.id}`">
                    <div class="twitter-account__icon-wrapper">
                        <img class="twitter-account__icon" :src="bluesky_account.icon_url || '/assets/images/account-icon-default.png'">
                        <span class="twitter-account__service-badge twitter-account__service-badge--bluesky">
                            <Icon icon="simple-icons:bluesky" />
                        </span>
                    </div>
                    <div class="twitter-account__info">
                        <div class="twitter-account__info-name">
                            <span class="twitter-account__info-name-text">{{bluesky_account.name}}</span>
                        </div>
                        <span class="twitter-account__info-screen-name">
                            <span class="twitter-account__info-screen-name-handle">@{{bluesky_account.handle}}</span>
                        </span>
                    </div>
                    <v-btn class="twitter-account__logout ml-auto" width="124" height="52" variant="flat"
                        @click="logoutBlueskyAccount(bluesky_account.handle)">
                        <Icon icon="fluent:plug-disconnected-20-filled" class="mr-2" height="24" />{{ $t('settings.twitter.logout_button') }}
                    </v-btn>
                </div>
                <v-btn class="twitter-account__login" color="secondary" max-width="300" height="50" variant="flat"
                    @click="loginTwitterAccountWithCookieForm()">
                    <Icon icon="fluent:plug-connected-20-filled" class="mr-2" height="24" />{{ $t('settings.twitter.add_twitter_button') }}
                </v-btn>
                <v-btn class="twitter-account__login twitter-account__login--bluesky" color="secondary" max-width="300" height="50" variant="flat"
                    @click="loginBlueskyAccountWithAppPasswordForm()">
                    <Icon icon="fluent:plug-connected-20-filled" class="mr-2" height="24" />{{ $t('settings.twitter.add_bluesky_button') }}
                </v-btn>
                <v-dialog max-width="740" v-model="twitter_cookie_auth_dialog">
                    <v-card>
                        <v-card-title class="d-flex justify-center pt-6 font-weight-bold">{{ $t('settings.twitter.cookie_dialog.title') }}</v-card-title>
                        <v-card-text class="pt-2 pb-0">
                            <div v-html="$t('settings.twitter.cookie_dialog.body')"></div>
                            <v-form class="settings__item" ref="twitter_form" @submit.prevent>
                                <v-textarea class="settings__item-form mt-4" style="height: 200px !important;" color="primary" variant="outlined"
                                    :label="$t('settings.twitter.cookie_dialog.cookie_label')"
                                    :placeholder="$t('settings.twitter.cookie_dialog.cookie_placeholder')"
                                    v-model="twitter_cookie"
                                    :density="is_form_dense ? 'compact' : 'default'"
                                    :rules="[(value: string) => !value ? $t('settings.twitter.validation.cookie_required') : true]">
                                </v-textarea>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="pt-0 px-6 pb-6">
                            <v-spacer></v-spacer>
                            <v-btn color="text" variant="text" height="40" @click="twitter_cookie_auth_dialog = false">{{ $t('settings.twitter.cookie_dialog.cancel') }}</v-btn>
                            <v-btn color="secondary" variant="flat" height="40" class="px-4" @click="loginTwitterAccountWithCookie()">
                                <Icon icon="fa:sign-in" class="mr-2" height="17px" />{{ $t('settings.twitter.cookie_dialog.login') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-dialog max-width="590" v-model="bluesky_auth_dialog">
                    <v-card>
                        <v-card-title class="d-flex justify-center pt-6 font-weight-bold">{{ $t('settings.twitter.bluesky_dialog.title') }}</v-card-title>
                        <v-card-text class="pt-2 pb-0">
                            <div v-html="$t('settings.twitter.bluesky_dialog.body')"></div>
                            <v-form class="settings__item" ref="bluesky_form" @submit.prevent>
                                <v-text-field class="settings__item-form mt-6" color="primary" variant="outlined"
                                    :label="$t('settings.twitter.bluesky_dialog.handle_label')" placeholder="example.bsky.social"
                                    v-model="bluesky_handle" :density="is_form_dense ? 'compact' : 'default'"
                                    :rules="[validateBlueskyHandle]">
                                </v-text-field>
                                <v-text-field class="settings__item-form mt-3" color="primary" variant="outlined"
                                    :label="$t('settings.twitter.bluesky_dialog.app_password_label')" placeholder="xxxx-xxxx-xxxx-xxxx"
                                    v-model="bluesky_app_password" :density="is_form_dense ? 'compact' : 'default'"
                                    :type="bluesky_app_password_showing ? 'text' : 'password'"
                                    :append-inner-icon="bluesky_app_password_showing ? 'mdi-eye' : 'mdi-eye-off'"
                                    @click:appendInner="bluesky_app_password_showing = !bluesky_app_password_showing"
                                    :rules="[(value: string) => !value ? $t('settings.twitter.validation.app_password_required') : true]">
                                </v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="pt-0 px-6 pb-6">
                            <v-spacer></v-spacer>
                            <v-btn color="text" variant="text" height="40" @click="closeBlueskyAuthDialog()">{{ $t('settings.twitter.bluesky_dialog.cancel') }}</v-btn>
                            <v-btn color="secondary" variant="flat" height="40" class="px-4" @click="loginBlueskyAccountWithAppPassword()">
                                <Icon icon="fa:sign-in" class="mr-2" height="17px" />{{ $t('settings.twitter.bluesky_dialog.login') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <div class="twitter-accounts mt-6">
                <div class="twitter-accounts__heading">
                    <Icon icon="fluent:link-20-filled" class="mr-2" height="28" />{{ $t('settings.twitter.account_link_heading') }}
                </div>
                <div class="twitter-accounts__guide mt-4" v-if="userStore.user === null || userStore.user.account_links.length === 0">
                    <Icon class="flex-shrink-0" icon="fluent:link-20-filled" width="45px" />
                    <div class="ml-4">
                        <div class="font-weight-bold text-h6">{{ $t('settings.twitter.account_link_guide_title') }}</div>
                        <div class="text-text-darken-1 text-subtitle-2 mt-1">
                            {{ $t('settings.twitter.account_link_guide_description') }}
                        </div>
                    </div>
                </div>
                <div class="twitter-account"
                    v-for="account_link in (userStore.user !== null ? userStore.user.account_links: [])"
                    :key="account_link.id">
                    <div class="linked-account-icon">
                        <img class="twitter-account__icon" :src="account_link.twitter_account.icon_url">
                        <img class="linked-account-icon__badge" :src="account_link.bluesky_account.icon_url || '/assets/images/account-icon-default.png'">
                    </div>
                    <div class="twitter-account__info">
                        <div v-for="row in getAccountLinkNameRows(account_link)" :key="row.id" class="twitter-account__info-name">
                            <Icon v-if="row.icon" class="twitter-account__info-name-service-icon" :icon="row.icon" />
                            <span class="twitter-account__info-name-text">{{row.text}}</span>
                        </div>
                        <span class="twitter-account__info-screen-name">
                            <span class="twitter-account__info-screen-name-handle">@{{account_link.twitter_account.screen_name}}</span>
                            <Icon class="twitter-account__info-screen-name-link-icon" icon="fluent:link-20-filled" height="17px" />
                            <span class="twitter-account__info-screen-name-handle">@{{account_link.bluesky_account.handle}}</span>
                        </span>
                    </div>
                    <v-btn class="twitter-account__logout ml-auto" width="124" height="52" variant="flat"
                        @click="deleteAccountLink(account_link.id)">
                        <Icon icon="fluent:link-dismiss-20-filled" class="mr-2" height="24" />{{ $t('settings.twitter.unlink_button') }}
                    </v-btn>
                </div>
                <v-btn class="twitter-account__login" color="secondary" max-width="330" height="50" variant="flat"
                    :disabled="account_link_twitter_items.length === 0 || account_link_bluesky_items.length === 0"
                    @click="account_link_dialog = true">
                    <Icon icon="fluent:link-add-20-filled" class="mr-2" height="24" />{{ $t('settings.twitter.add_link_button') }}
                </v-btn>
                <v-dialog max-width="560" v-model="account_link_dialog">
                    <v-card>
                        <v-card-title class="d-flex justify-center pt-6 font-weight-bold">{{ $t('settings.twitter.account_link_dialog.title') }}</v-card-title>
                        <v-card-text class="pt-2 pb-0">
                            <v-select class="settings__item-form mt-4" color="primary" variant="outlined"
                                :label="$t('settings.twitter.account_link_dialog.twitter_label')" :items="account_link_twitter_items" v-model="account_link_twitter_account_id">
                            </v-select>
                            <v-select class="settings__item-form mt-3" color="primary" variant="outlined"
                                :label="$t('settings.twitter.account_link_dialog.bluesky_label')" :items="account_link_bluesky_items" v-model="account_link_bluesky_account_id">
                            </v-select>
                        </v-card-text>
                        <v-card-actions class="pt-0 px-6 pb-6">
                            <v-spacer></v-spacer>
                            <v-btn color="text" variant="text" height="40" @click="account_link_dialog = false">{{ $t('settings.twitter.account_link_dialog.cancel') }}</v-btn>
                            <v-btn color="secondary" variant="flat" height="40" class="px-4" @click="createAccountLink()">
                                <Icon icon="fluent:add-12-filled" class="mr-2" height="17px" />{{ $t('settings.twitter.account_link_dialog.add') }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="fold_panel_after_sending_tweet">{{ $t('settings.twitter.fold_panel_after_sending_tweet.heading') }}</label>
                <label class="settings__item-label" for="fold_panel_after_sending_tweet" v-html="$t('settings.twitter.fold_panel_after_sending_tweet.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="fold_panel_after_sending_tweet" hide-details
                    v-model="settingsStore.settings.fold_panel_after_sending_tweet">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="reset_hashtag_when_program_switches">{{ $t('settings.twitter.reset_hashtag_when_program_switches.heading') }}</label>
                <label class="settings__item-label" for="reset_hashtag_when_program_switches" v-html="$t('settings.twitter.reset_hashtag_when_program_switches.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="reset_hashtag_when_program_switches" hide-details
                    v-model="settingsStore.settings.reset_hashtag_when_program_switches">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="auto_add_watching_channel_hashtag">{{ $t('settings.twitter.auto_add_watching_channel_hashtag.heading') }}</label>
                <label class="settings__item-label" for="auto_add_watching_channel_hashtag" v-html="$t('settings.twitter.auto_add_watching_channel_hashtag.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="auto_add_watching_channel_hashtag" hide-details
                    v-model="settingsStore.settings.auto_add_watching_channel_hashtag">
                </v-switch>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.twitter.twitter_reply_thread.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.twitter.twitter_reply_thread.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.twitter.twitter_reply_thread.label_2')"></div>
                <div class="settings__item-label mt-2" v-html="$t('settings.twitter.twitter_reply_thread.label_per_hashtag')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.twitter.twitter_reply_thread.label_per_day')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.twitter.twitter_reply_thread.label_disabled')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="twitter_reply_thread_mode" v-model="settingsStore.settings.twitter_reply_thread_mode">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.twitter.bluesky_reply_thread.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.twitter.bluesky_reply_thread.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.twitter.bluesky_reply_thread.label_2')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="bluesky_reply_thread_mode" v-model="settingsStore.settings.bluesky_reply_thread_mode">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.twitter.twitter_active_tab.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.twitter.twitter_active_tab.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="twitter_active_tab" v-model="settingsStore.settings.twitter_active_tab">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.twitter.tweet_hashtag_position.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.twitter.tweet_hashtag_position.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="tweet_hashtag_position" v-model="settingsStore.settings.tweet_hashtag_position">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.twitter.tweet_capture_watermark_position.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.twitter.tweet_capture_watermark_position.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="tweet_capture_watermark_position" v-model="settingsStore.settings.tweet_capture_watermark_position">
                </v-select>
            </div>
        </div>
        <v-overlay class="align-center justify-center" :persistent="true"
            :model-value="is_twitter_cookie_auth_sending || is_bluesky_auth_sending" z-index="300">
            <v-progress-circular color="secondary" indeterminate size="64" />
        </v-overlay>
    </SettingsBase>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';
import { VForm } from 'vuetify/components';

import Message from '@/message';
import AccountLinks from '@/services/AccountLinks';
import Bluesky, { IBlueskyAuthRequest } from '@/services/Bluesky';
import Twitter, { IBrowserEnvironmentInfoRequest, ITwitterCookieAuthRequest } from '@/services/Twitter';
import { IAccountLink } from '@/services/Users';
import useSettingsStore from '@/stores/SettingsStore';
import useUserStore from '@/stores/UserStore';
import Utils from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

/** 紐付けアカウントの表示名行を表すインターフェイス */
interface IAccountLinkNameRow {
    id: string;
    icon?: string;
    text: string;
}

export default defineComponent({
    name: 'Settings-Twitter',
    components: {
        SettingsBase,
    },
    data() {
        return {

            // フォームを小さくするかどうか
            is_form_dense: Utils.isSmartphoneHorizontal(),

            // ローディング中かどうか
            is_loading: true,

            // Cookie 認証実行中かどうか
            is_twitter_cookie_auth_sending: false,

            // Bluesky 認証実行中かどうか
            is_bluesky_auth_sending: false,

            // Cookie 認証用ダイヤログ
            twitter_cookie_auth_dialog: false,

            // Twitter の Cookie
            twitter_cookie: '',

            // Bluesky 認証用ダイヤログ
            bluesky_auth_dialog: false,

            // Bluesky の handle
            bluesky_handle: '',

            // Bluesky の App Password
            bluesky_app_password: '',

            // Bluesky の App Password を表示するかどうか
            bluesky_app_password_showing: false,

            // Twitter / Bluesky 紐付け追加ダイヤログ
            account_link_dialog: false,

            // 紐付ける Twitter アカウント ID
            account_link_twitter_account_id: null as number | null,

            // 紐付ける Bluesky アカウント ID
            account_link_bluesky_account_id: null as number | null,
        };
    },
    computed: {
        ...mapStores(useSettingsStore, useUserStore),

        // Twitter のリプライツリー実況モードの選択肢
        twitter_reply_thread_mode() {
            return [
                {title: this.$t('settings.twitter.twitter_reply_thread.option_per_hashtag'), value: 'PerHashtag'},
                {title: this.$t('settings.twitter.twitter_reply_thread.option_per_day'), value: 'PerDay'},
                {title: this.$t('settings.twitter.twitter_reply_thread.option_disabled'), value: 'Disabled'},
            ];
        },

        // Bluesky のリプライツリー実況モードの選択肢
        bluesky_reply_thread_mode() {
            return [
                {title: this.$t('settings.twitter.bluesky_reply_thread.option_per_hashtag'), value: 'PerHashtag'},
                {title: this.$t('settings.twitter.bluesky_reply_thread.option_per_day'), value: 'PerDay'},
                {title: this.$t('settings.twitter.bluesky_reply_thread.option_disabled'), value: 'Disabled'},
            ];
        },

        // デフォルトで表示されるパネルのタブの選択肢
        twitter_active_tab() {
            return [
                {title: this.$t('settings.twitter.twitter_active_tab.option_search'), value: 'Search'},
                {title: this.$t('settings.twitter.twitter_active_tab.option_timeline'), value: 'Timeline'},
                {title: this.$t('settings.twitter.twitter_active_tab.option_capture'), value: 'Capture'},
            ];
        },

        // ツイートにつけるハッシュタグの位置の選択肢
        tweet_hashtag_position() {
            return [
                {title: this.$t('settings.twitter.tweet_hashtag_position.option_prepend'), value: 'Prepend'},
                {title: this.$t('settings.twitter.tweet_hashtag_position.option_append'), value: 'Append'},
                {title: this.$t('settings.twitter.tweet_hashtag_position.option_prepend_linebreak'), value: 'PrependWithLineBreak'},
                {title: this.$t('settings.twitter.tweet_hashtag_position.option_append_linebreak'), value: 'AppendWithLineBreak'},
            ];
        },

        // ツイートするキャプチャに番組タイトルの透かしを描画する位置の選択肢
        tweet_capture_watermark_position() {
            return [
                {title: this.$t('settings.twitter.tweet_capture_watermark_position.option_none'), value: 'None'},
                {title: this.$t('settings.twitter.tweet_capture_watermark_position.option_top_left'), value: 'TopLeft'},
                {title: this.$t('settings.twitter.tweet_capture_watermark_position.option_top_right'), value: 'TopRight'},
                {title: this.$t('settings.twitter.tweet_capture_watermark_position.option_bottom_left'), value: 'BottomLeft'},
                {title: this.$t('settings.twitter.tweet_capture_watermark_position.option_bottom_right'), value: 'BottomRight'},
            ];
        },

        has_linked_accounts(): boolean {
            if (this.userStore.user === null) {
                return false;
            }
            return this.userStore.user.twitter_accounts.length > 0 ||
                this.userStore.user.bluesky_accounts.length > 0;
        },

        has_no_linked_accounts(): boolean {
            return this.has_linked_accounts === false;
        },

        account_link_twitter_items(): {title: string; value: number;}[] {
            const linked_twitter_ids = new Set(this.userStore.user?.account_links.map(account_link => account_link.twitter_account.id) ?? []);
            return (this.userStore.user?.twitter_accounts ?? [])
                .filter(twitter_account => linked_twitter_ids.has(twitter_account.id) === false)
                .map(twitter_account => ({title: `@${twitter_account.screen_name}`, value: twitter_account.id}));
        },

        account_link_bluesky_items(): {title: string; value: number;}[] {
            const linked_bluesky_ids = new Set(this.userStore.user?.account_links.map(account_link => account_link.bluesky_account.id) ?? []);
            return (this.userStore.user?.bluesky_accounts ?? [])
                .filter(bluesky_account => linked_bluesky_ids.has(bluesky_account.id) === false)
                .map(bluesky_account => ({title: `@${bluesky_account.handle}`, value: bluesky_account.id}));
        },
    },
    async created() {

        // アカウント情報を更新
        await this.userStore.fetchUser();

        // ローディング状態を解除
        this.is_loading = false;
    },
    watch: {
        bluesky_auth_dialog(is_bluesky_auth_dialog_open: boolean) {
            // ダイヤログ外クリックや Esc キーで閉じた場合も、保存しない App Password を画面状態から確実に消す
            if (is_bluesky_auth_dialog_open === false) {
                this.bluesky_app_password = '';
                this.bluesky_app_password_showing = false;
            }
        },
    },
    methods: {
        normalizeBlueskyHandle(handle: string): string {
            let normalized_handle = handle.trim();

            // プロフィール URL はクエリや末尾パスが付くことがあるため、URL として分解する
            // 通常のハンドルは URL として解釈できないので、その場合は従来通り入力文字列を正規化する
            try {
                const profile_url = new URL(normalized_handle);
                const profile_path_segments = profile_url.pathname.split('/').filter(segment => segment.length > 0);
                const is_bluesky_profile_url =
                    (profile_url.hostname === 'bsky.app' || profile_url.hostname.endsWith('.bsky.app')) &&
                    profile_path_segments[0] === 'profile' &&
                    profile_path_segments[1] !== undefined;
                if (is_bluesky_profile_url === true && profile_path_segments[1] !== undefined) {
                    normalized_handle = decodeURIComponent(profile_path_segments[1]);
                }
            } catch {
                // URL として解釈できない入力は、通常のハンドルとして後続の正規化へ進める
            }
            if (normalized_handle.startsWith('@') === true) {
                normalized_handle = normalized_handle.slice(1).trim();
            }
            return normalized_handle.toLowerCase();
        },

        validateBlueskyHandle(value: string): true | string {
            if (this.normalizeBlueskyHandle(value ?? '') === '') {
                return this.$t('settings.twitter.validation.bluesky_handle_required');
            }
            return true;
        },

        getAccountLinkNameRows(account_link: IAccountLink): IAccountLinkNameRow[] {
            const twitter_name = account_link.twitter_account.name;
            const bluesky_name = account_link.bluesky_account.name;

            // 表示名が完全一致する場合は重複表示せず、1行だけ出す
            if (twitter_name === bluesky_name) {
                return [{id: 'shared-name', text: twitter_name}];
            }

            // 表示名が異なる場合はサービスアイコン付きで各行を独立して ellipsis する
            return [
                {id: 'twitter-name', icon: 'fa-brands:twitter', text: twitter_name},
                {id: 'bluesky-name', icon: 'simple-icons:bluesky', text: bluesky_name},
            ];
        },

        async loginTwitterAccountWithCookieForm() {
            // ログインしていない場合はエラーにする
            if (this.userStore.is_logged_in === false) {
                Message.warning(this.$t('settings.twitter.message.login_required'));
                await Utils.sleep(0.01);
                this.twitter_cookie_auth_dialog = false;
                return;
            }
            this.twitter_cookie_auth_dialog = true;
        },

        async collectBrowserEnvironmentInfo(): Promise<IBrowserEnvironmentInfoRequest | null> {
            // Cookie 採取元と同じブラウザで貼り付ける運用を前提に、そのブラウザの OS / ロケール情報を一緒に保存する
            // 未対応ブラウザでは Cookie 認証を優先し、サーバー側の UA / UA-CH 補正だけを無効にする
            if (typeof navigator.userAgentData?.getHighEntropyValues !== 'function') {
                return null;
            }

            try {
                // 詳細なバージョン情報やブランド情報はサーバー側 Chrome の現在値を使うため、ここでは OS 環境の値だけを取る
                const high_entropy_values = await navigator.userAgentData.getHighEntropyValues([
                    'architecture',
                    'bitness',
                    'mobile',
                    'model',
                    'platform',
                    'platformVersion',
                    'wow64',
                ]);
                // ブラウザ実装や拡張の影響で空値が返っても、Cookie 認証自体は止めず補正情報なしで続行する
                if (high_entropy_values === null || high_entropy_values === undefined) {
                    console.warn('Failed to collect browser environment info: getHighEntropyValues returned empty result.');
                    return null;
                }

                // Accept-Language は API リクエストからサーバー側で採取するため、
                // JavaScript 側では HTTP ヘッダーに載らない navigator.platform / Intl 系だけを送る
                const intl_options = Intl.DateTimeFormat().resolvedOptions();
                return {
                    user_agent_data: {
                        platform: high_entropy_values.platform ?? '',
                        platform_version: high_entropy_values.platformVersion ?? '',
                        architecture: high_entropy_values.architecture ?? '',
                        bitness: high_entropy_values.bitness ?? '',
                        mobile: high_entropy_values.mobile ?? false,
                        model: high_entropy_values.model ?? '',
                        wow64: high_entropy_values.wow64 ?? false,
                    },
                    navigator_platform: navigator.platform ?? '',
                    locale: intl_options.locale ?? '',
                    timezone: intl_options.timeZone ?? '',
                };
            } catch (error) {
                // 環境情報は補助情報なので、採取に失敗しても処理を実行する
                console.warn('Failed to collect browser environment info:', error);
                return null;
            }
        },

        async loginTwitterAccountWithCookie() {

            // バリデーションを実行
            if ((await (this.$refs.twitter_form as VForm).validate()).valid === false) {
                return;
            }

            // 空文字が入力されている場合は弾く
            if (this.twitter_cookie === null || this.twitter_cookie.trim() === '') {
                Message.warning(this.$t('settings.twitter.message.cookie_required'));
                return;
            }

            // Cookie と採取したブラウザ環境情報をまとめて送信
            const browser_info = await this.collectBrowserEnvironmentInfo();
            const twitter_auth_request: ITwitterCookieAuthRequest = {
                cookies_txt: this.twitter_cookie,
                browser_info: browser_info,
            };

            // Twitter 認証 API にリクエスト
            this.is_twitter_cookie_auth_sending = true;
            const result = await Twitter.auth(twitter_auth_request);
            this.is_twitter_cookie_auth_sending = false;
            if (result === false) {
                return;
            }

            // アカウント情報を強制的に更新
            await this.userStore.fetchUser(true);
            if (this.userStore.user === null) {
                Message.error(this.$t('settings.twitter.message.account_info_failed'));
                return;
            }

            // ログイン中のユーザーに紐づく Twitter アカウントのうち、一番 updated_at が新しいものを取得
            // ログインすると updated_at が更新されるため、この時点で一番 updated_at が新しいアカウントが今回連携したものだと判断できる
            // ref: https://stackoverflow.com/a/12192544/17124142 (ISO8601 のソートアルゴリズム)
            const current_twitter_account = [...this.userStore.user.twitter_accounts].sort((a, b) => {
                return (a.updated_at < b.updated_at) ? 1 : ((a.updated_at > b.updated_at) ? -1 : 0);
            })[0];

            Message.success(this.$t('settings.twitter.message.twitter_linked', { screen_name: current_twitter_account.screen_name }));

            // フォームをリセットし、非表示にする
            (this.$refs.twitter_form as VForm).reset();
            this.twitter_cookie_auth_dialog = false;
        },

        async logoutTwitterAccount(screen_name: string) {

            // Twitter アカウント連携解除 API にリクエスト
            const result = await Twitter.logoutAccount(screen_name);
            if (result === false) {
                return;
            }

            // アカウント情報を強制的に更新
            await this.userStore.fetchUser(true);

            Message.success(this.$t('settings.twitter.message.twitter_unlinked', { screen_name }));
        },

        async loginBlueskyAccountWithAppPasswordForm() {
            if (this.userStore.is_logged_in === false) {
                Message.warning(this.$t('settings.twitter.message.login_required'));
                await Utils.sleep(0.01);
                this.bluesky_auth_dialog = false;
                return;
            }
            this.bluesky_auth_dialog = true;
            this.bluesky_app_password_showing = false;
        },

        closeBlueskyAuthDialog() {
            // App Password は永続化しない一時入力値なので、キャンセル時点で即座に破棄する
            this.bluesky_app_password = '';
            this.bluesky_app_password_showing = false;
            this.bluesky_auth_dialog = false;
        },

        async loginBlueskyAccountWithAppPassword() {
            if ((await (this.$refs.bluesky_form as VForm).validate()).valid === false) {
                return;
            }
            const normalized_handle = this.normalizeBlueskyHandle(this.bluesky_handle);
            if (normalized_handle === '') {
                Message.warning(this.$t('settings.twitter.message.bluesky_handle_required'));
                return;
            }
            this.bluesky_handle = normalized_handle;
            const bluesky_auth_request: IBlueskyAuthRequest = {
                handle: normalized_handle,
                app_password: this.bluesky_app_password,
            };

            // Bluesky 認証 API にリクエスト
            this.is_bluesky_auth_sending = true;
            const result = await Bluesky.auth(bluesky_auth_request);
            this.is_bluesky_auth_sending = false;
            if (result === false) {
                return;
            }
            const fetched_user = await this.userStore.fetchUser(true);
            if (fetched_user === null) {
                Message.warning(this.$t('settings.twitter.message.bluesky_refetch_failed'));
                return;
            }
            const current_bluesky_account = [...fetched_user.bluesky_accounts].sort((a, b) => {
                return (a.updated_at < b.updated_at) ? 1 : ((a.updated_at > b.updated_at) ? -1 : 0);
            })[0];
            if (current_bluesky_account === undefined) {
                Message.warning(this.$t('settings.twitter.message.bluesky_refetch_failed'));
                return;
            }
            Message.success(this.$t('settings.twitter.message.bluesky_linked', { handle: current_bluesky_account.handle }));
            (this.$refs.bluesky_form as VForm).reset();
            this.bluesky_app_password_showing = false;
            this.bluesky_auth_dialog = false;
        },

        async logoutBlueskyAccount(handle: string) {
            const result = await Bluesky.logoutAccount(handle);
            if (result === false) {
                return;
            }
            await this.userStore.fetchUser(true);
            Message.success(this.$t('settings.twitter.message.bluesky_unlinked', { handle }));
        },

        async createAccountLink() {
            if (this.account_link_twitter_account_id === null || this.account_link_bluesky_account_id === null) {
                Message.warning(this.$t('settings.twitter.message.account_link_select_required'));
                return;
            }
            const account_link = await AccountLinks.create({
                twitter_account_id: this.account_link_twitter_account_id,
                bluesky_account_id: this.account_link_bluesky_account_id,
            });
            if (account_link === null) {
                return;
            }
            await this.userStore.fetchUser(true);
            // 次回ダイアログを開いた時に前回の選択が残らないよう選択状態をクリアする
            this.account_link_twitter_account_id = null;
            this.account_link_bluesky_account_id = null;
            this.account_link_dialog = false;
            Message.success(this.$t('settings.twitter.message.account_linked'));
        },

        async deleteAccountLink(link_id: number) {
            const result = await AccountLinks.delete(link_id);
            if (result === false) {
                return;
            }
            await this.userStore.fetchUser(true);
            Message.success(this.$t('settings.twitter.message.account_unlinked'));
        },
    }
});

</script>
<style lang="scss" scoped>

.settings__content {
    opacity: 1;
    transition: opacity 0.4s;

    &--loading {
        opacity: 0;
    }
}

.linked-account-icon {
    position: relative;
    flex-shrink: 0;
    margin-right: 16px;
    @include smartphone-vertical {
        margin-right: 10px;
    }

    .twitter-account__icon {
        margin-right: 0;
    }

    &__badge {
        position: absolute;
        top: -6px;
        right: -6px;
        width: 32px;
        height: 32px;
        border: 2px solid rgb(var(--v-theme-background-lighten-2));
        border-radius: 50%;
        object-fit: cover;
    }
}

.twitter-accounts {
    display: flex;
    flex-direction: column;
    padding: 20px 20px;
    border-radius: 15px;
    background: rgb(var(--v-theme-background-lighten-2));
    @include smartphone-horizontal {
        padding: 16px 20px;
        border-radius: 10px;
    }
    @include smartphone-vertical {
        padding: 16px 12px;
        border-radius: 10px;
    }

    &__heading {
        display: flex;
        align-items: center;
        font-size: 18px;
        font-weight: bold;
    }

    &__guide {
        display: flex;
        align-items: center;

        .text-h6 {
            @include tablet-vertical {
                font-size: 19px !important;
            }
            @include smartphone-vertical {
                font-size: 17px !important;
            }
        }

        svg {
            @include smartphone-horizontal-short {
                display: none;
            }
            @include smartphone-vertical {
                display: none;
            }
        }
        svg + div {
            @include smartphone-horizontal-short {
                margin-left: 0px !important;
            }
            @include smartphone-vertical {
                margin-left: 0px !important;
            }
        }
    }

    .twitter-account {
        display: flex;
        align-items: center;
        margin-top: 20px;
        @include smartphone-horizontal {
            margin-top: 16px;
        }

        &__icon-wrapper {
            position: relative;
            flex-shrink: 0;
            margin-right: 16px;
            @include smartphone-vertical {
                margin-right: 10px;
            }
        }

        &__icon {
            display: block;
            width: 70px;
            height: 70px;
            border-radius: 50%;
            object-fit: cover;
            // 読み込まれるまでのアイコンの背景
            background: linear-gradient(150deg, rgb(var(--v-theme-gray)), rgb(var(--v-theme-background-lighten-2)));
            // 低解像度で表示する画像がぼやけないようにする
            // ref: https://sho-log.com/chrome-image-blurred/
            image-rendering: -webkit-optimize-contrast;
            @include smartphone-horizontal {
                width: 52px;
                height: 52px;
            }
            @include smartphone-vertical {
                width: 48px;
                height: 48px;
            }
        }

        &__service-badge {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 0px;
            bottom: 0px;
            width: 24px;
            height: 24px;
            border-radius: 6px;
            color: #fff;
            line-height: 0;

            :deep(svg) {
                width: 13px;
                height: 13px;
            }

            // 視聴パネルのツイートボタンと同じ Twitter ブランドカラー
            &--twitter {
                background: rgb(var(--v-theme-twitter));
            }

            // 視聴パネルのポストボタンと同じ Bluesky ブランドカラー
            &--bluesky {
                background: #0F73FF;
            }

            @include smartphone-horizontal {
                width: 20px;
                height: 20px;
                border-radius: 5px;

                :deep(svg) {
                    width: 11px;
                    height: 11px;
                }
            }

            @include smartphone-vertical {
                width: 18px;
                height: 18px;
                border-radius: 4px;

                :deep(svg) {
                    width: 10px;
                    height: 10px;
                }
            }
        }

        &__info {
            display: flex;
            flex-direction: column;
            flex: 1;
            min-width: 0;
            margin-right: 16px;
            @include smartphone-vertical {
                margin-right: 10px;
            }

            &-name {
                display: flex;
                align-items: center;
                column-gap: 6px;
                min-width: 0;
                max-width: 100%;
                overflow: hidden;
                color: rgb(var(--v-theme-text));

                &-service-icon {
                    display: block;
                    flex-shrink: 0;
                    // Iconify は width/height 未指定時に SVG へ 1em を設定するため、font-size も合わせて指定する
                    width: 16px;
                    height: 16px;
                    font-size: 16px;
                    @include smartphone-horizontal {
                        width: 13px;
                        height: 13px;
                        font-size: 13px;
                    }
                    @include smartphone-vertical {
                        width: 12px;
                        height: 12px;
                        font-size: 12px;
                    }
                }

                &-text {
                    min-width: 0;
                    flex: 1 1 auto;
                    font-size: 20px;
                    font-weight: bold;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;  // はみ出た部分を … で省略
                    @include smartphone-horizontal {
                        font-size: 18px;
                    }
                    @include smartphone-vertical {
                        font-size: 16px;
                    }
                }
            }

            &-screen-name {
                min-width: 0;
                overflow: hidden;
                color: rgb(var(--v-theme-text-darken-1));
                font-size: 16px;
                line-height: 1.4;
                @include smartphone-horizontal {
                    font-size: 14px;
                }
                @include smartphone-vertical {
                    font-size: 13.5px;
                }

                &-handle {
                    display: inline-block;
                    max-width: 100%;
                    vertical-align: middle;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;  // はみ出た部分を … で省略

                    // 単体アカウント行は1行全体を使って ellipsis する
                    &:only-child {
                        display: block;
                    }
                }

                &-link-icon {
                    display: inline-flex;
                    align-items: center;
                    vertical-align: middle;
                    margin: 0 6px;
                }
            }
        }

        &__login {
            margin-top: 20px;
            margin-left: auto;
            margin-right: auto;
            border-radius: 7px;
            font-size: 15px;
            letter-spacing: 0;
            @include tablet-vertical {
                height: 42px !important;
                font-size: 14.5px;
            }
            @include smartphone-horizontal {
                height: 42px !important;
                font-size: 14.5px;
            }
            @include smartphone-vertical {
                height: 42px !important;
                font-size: 14.5px;
            }

            &--bluesky {
                margin-top: 12px;
            }
        }

        &__logout {
            flex-shrink: 0;
            background: rgb(var(--v-theme-gray));
            border-radius: 7px;
            font-size: 15px;
            letter-spacing: 0;
            @include smartphone-horizontal {
                width: 116px !important;
            }
            @include smartphone-vertical {
                width: 100px !important;
                height: 48px !important;
                border-radius: 5px;
                font-size: 14px;
                svg {
                    width: 20px;
                    margin-right: 4px !important;
                }
            }
        }
    }
}

blockquote {
    border-left: 3px solid rgb(var(--v-theme-secondary));
    background-color: rgb(var(--v-theme-background-lighten-1));
    padding: 8px 12px;
    border-radius: 4px;
}

.account-link-select__selection {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;

    span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}

</style>
