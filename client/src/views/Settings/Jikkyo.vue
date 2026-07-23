<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <Icon icon="bi:chat-left-text-fill" width="19px" />
            <span class="ml-3">{{ $t('settings.jikkyo.title') }}</span>
        </h2>
        <div class="settings__content" :class="{'settings__content--loading': is_loading}">
            <div class="niconico-account niconico-account--anonymous" v-if="userStore.user === null || userStore.user.niconico_user_id === null">
                <div class="niconico-account-wrapper">
                    <Icon class="flex-shrink-0" icon="bi:chat-left-text-fill" width="45px" />
                    <div class="niconico-account__info ml-4">
                        <div class="niconico-account__info-name">
                            <span class="niconico-account__info-name-text">{{ $t('settings.jikkyo.account.not_linked_name') }}</span>
                        </div>
                        <span class="niconico-account__info-description">
                            {{ $t('settings.jikkyo.account.not_linked_description') }}
                        </span>
                    </div>
                </div>
                <v-btn class="niconico-account__login ml-auto" color="secondary" width="130" height="56" variant="flat"
                    @click="loginNiconicoAccount()">
                    <Icon icon="fluent:plug-connected-20-filled" class="mr-2" height="26" />{{ $t('settings.jikkyo.account.connect_button') }}
                </v-btn>
            </div>
            <div class="niconico-account" v-if="userStore.user !== null && userStore.user.niconico_user_id !== null">
                <div class="niconico-account-wrapper">
                    <img class="niconico-account__icon" :src="userStore.user_niconico_icon_url ?? ''" @error="setDefaultIcon">
                    <div class="niconico-account__info">
                        <div class="niconico-account__info-name">
                            <span class="niconico-account__info-name-text">{{ $t('settings.jikkyo.account.linked_name', { name: userStore.user.niconico_user_name }) }}</span>
                        </div>
                        <span class="niconico-account__info-description">
                            <span class="mr-2" style="white-space: nowrap;">{{ $t('settings.jikkyo.account.niconico_user_id_label') }}</span>
                            <a class="link mr-2" :href="`https://www.nicovideo.jp/user/${userStore.user.niconico_user_id}`"
                                target="_blank">{{userStore.user.niconico_user_id}}</a>
                            <span class="text-secondary" v-if="userStore.user.niconico_user_premium === true">(Premium)</span>
                        </span>
                    </div>
                </div>
                <v-btn class="niconico-account__login ml-auto" color="secondary" width="130" height="56" variant="flat"
                    @click="logoutNiconicoAccount()">
                    <Icon icon="fluent:plug-disconnected-20-filled" class="mr-2" height="26" />{{ $t('settings.jikkyo.account.disconnect_button') }}
                </v-btn>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="prefer_posting_to_nicolive">{{ $t('settings.jikkyo.prefer_posting_to_nicolive.heading') }}</label>
                <label class="settings__item-label" for="prefer_posting_to_nicolive" v-html="$t('settings.jikkyo.prefer_posting_to_nicolive.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="prefer_posting_to_nicolive" hide-details
                    v-model="settingsStore.settings.prefer_posting_to_nicolive">
                </v-switch>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.jikkyo.comment_mute.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.jikkyo.comment_mute.label')"></div>
                <div class="settings__item-label mt-2" v-html="$t('settings.jikkyo.comment_mute.label_default')"></div>
            </div>
            <v-btn class="settings__save-button mt-4" variant="flat" @click="comment_mute_settings_modal = !comment_mute_settings_modal">
                <Icon icon="heroicons-solid:filter" height="19px" />
                <span class="ml-1">{{ $t('settings.jikkyo.comment_mute.button') }}</span>
            </v-btn>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__quote mt-7" v-html="$t('settings.jikkyo.quote')"></div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" for="show_comment">{{ $t('settings.jikkyo.show_comment.heading') }}</label>
                <label class="settings__item-label" for="show_comment" v-html="$t('settings.jikkyo.show_comment.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="show_comment" hide-details
                    v-model="show_comment">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch settings__item--sync-disabled">
                <label class="settings__item-heading" for="show_comment_unlimited">{{ $t('settings.jikkyo.show_comment_unlimited.heading') }}</label>
                <label class="settings__item-label" for="show_comment_unlimited" v-html="$t('settings.jikkyo.show_comment_unlimited.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="show_comment_unlimited" hide-details
                    v-model="show_comment_unlimited">
                </v-switch>
            </div>
            <div class="settings__item settings__item--sync-disabled">
                <div class="settings__item-heading">{{ $t('settings.jikkyo.comment_opacity.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.jikkyo.comment_opacity.label')"></div>
                <v-slider class="settings__item-form" color="primary" show-ticks="always" thumb-label hide-details
                    :step="0.05" :min="0" :max="1" v-model="comment_opacity">
                    <template #thumb-label="{ modelValue }">
                        {{ Math.round(modelValue * 100) }}%
                    </template>
                </v-slider>
            </div>
            <v-divider class="mt-6"></v-divider>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.jikkyo.comment_speed_rate.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.jikkyo.comment_speed_rate.label')"></div>
                <v-slider class="settings__item-form" color="primary" show-ticks="always" thumb-label hide-details
                    :step="0.1" :min="0.5" :max="2" v-model="settingsStore.settings.comment_speed_rate">
                </v-slider>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.jikkyo.comment_font_size.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.jikkyo.comment_font_size.label')"></div>
                <v-slider class="settings__item-form" color="primary" show-ticks="always" thumb-label hide-details
                    :step="1" :min="20" :max="60" v-model="settingsStore.settings.comment_font_size">
                </v-slider>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="close_comment_form_after_sending">{{ $t('settings.jikkyo.close_comment_form_after_sending.heading') }}</label>
                <label class="settings__item-label" for="close_comment_form_after_sending" v-html="$t('settings.jikkyo.close_comment_form_after_sending.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="close_comment_form_after_sending" hide-details
                    v-model="settingsStore.settings.close_comment_form_after_sending">
                </v-switch>
            </div>
        </div>
        <CommentMuteSettings :modelValue="comment_mute_settings_modal" @update:modelValue="comment_mute_settings_modal = $event" />
    </SettingsBase>
</template>
<script lang="ts">

import { mapStores } from 'pinia';
import { defineComponent } from 'vue';

import CommentMuteSettings from '@/components/Settings/CommentMuteSettings.vue';
import Message from '@/message';
import Niconico from '@/services/Niconico';
import useSettingsStore from '@/stores/SettingsStore';
import useUserStore from '@/stores/UserStore';
import Utils from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

export default defineComponent({
    name: 'Settings-Jikkyo',
    components: {
        SettingsBase,
        CommentMuteSettings,
    },
    data() {
        return {

            // コメントのミュート設定のモーダルを表示するか
            comment_mute_settings_modal: false,

            // ローディング中かどうか
            is_loading: true,

            // コメントを表示するか (LocalStorage: dplayer-danmaku-show)
            show_comment: true,

            // コメントを無制限に表示するか (LocalStorage: dplayer-danmaku-unlimited)
            show_comment_unlimited: false,

            // コメントの不透明度 (LocalStorage: dplayer-danmaku-opacity)
            comment_opacity: 0.5,
        };
    },
    watch: {
        show_comment(new_value: boolean) {
            // コメント表示設定を LocalStorage に保存する
            localStorage.setItem('dplayer-danmaku-show', new_value ? '1' : '0');
        },
        show_comment_unlimited(new_value: boolean) {
            // コメント無制限表示設定を LocalStorage に保存する
            localStorage.setItem('dplayer-danmaku-unlimited', new_value ? '1' : '0');
        },
        comment_opacity(new_value: number) {
            // コメント不透明度設定を LocalStorage に保存する
            localStorage.setItem('dplayer-danmaku-opacity', new_value.toString());
        },
    },
    computed: {
        ...mapStores(useSettingsStore, useUserStore),
    },
    async created() {

        // LocalStorage からコメント表示設定を読み込む
        const show_comment_raw = localStorage.getItem('dplayer-danmaku-show');
        if (show_comment_raw !== null) {
            this.show_comment = show_comment_raw === '1';
        }

        // LocalStorage からコメント無制限表示設定を読み込む
        const show_comment_unlimited_raw = localStorage.getItem('dplayer-danmaku-unlimited');
        if (show_comment_unlimited_raw !== null) {
            this.show_comment_unlimited = show_comment_unlimited_raw === '1';
        }

        // LocalStorage からコメント透明度設定を読み込む
        const comment_opacity_raw = localStorage.getItem('dplayer-danmaku-opacity');
        if (comment_opacity_raw !== null) {
            this.comment_opacity = parseFloat(comment_opacity_raw);
        }

        // アカウント情報を更新
        await this.userStore.fetchUser();

        // ローディング状態を解除
        this.is_loading = false;

        // もしハッシュ (# から始まるフラグメント) に何か指定されていたら、
        // OAuth 連携のコールバックの結果が入っている可能性が高いので、パースを試みる
        // アカウント情報更新より後にしないと Snackbar がうまく表示されない
        if (location.hash !== '') {
            const params = new URLSearchParams(location.hash.replace('#', ''));
            if (params.get('status') !== null && params.get('detail') !== null) {
                // コールバックの結果を取得できたので、OAuth 連携の結果を画面に通知する
                const authorization_status = parseInt(params.get('status')!);
                const authorization_detail = params.get('detail')!;
                this.onOAuthCallbackReceived(authorization_status, authorization_detail);
                // URL からフラグメントを削除
                // ref: https://stackoverflow.com/a/49373716/17124142
                history.replaceState(null, '', ' ');
            }
        }
    },
    methods: {
        setDefaultIcon(event: Event) {
            (event.target as HTMLImageElement).src = '/assets/images/account-icon-default.png';
        },

        async loginNiconicoAccount() {

            // ログインしていない場合はエラーにする
            if (this.userStore.is_logged_in === false) {
                Message.warning(this.$t('settings.jikkyo.message.login_required'));
                return;
            }

            // ニコニコアカウントと連携するための認証 URL を取得
            const authorization_url = await Niconico.fetchAuthorizationURL();
            if (authorization_url === null) {
                return;
            }

            // モバイルデバイスではポップアップが事実上使えない (特に Safari ではブロックされてしまう) ので、素直にリダイレクトで実装する
            if (Utils.isMobileDevice() === true) {
                location.href = authorization_url;
                return;
            }

            // OAuth 連携のため、認証 URL をポップアップウインドウで開く
            // window.open() の第2引数はユニークなものにしておくと良いらしい
            // ref: https://qiita.com/catatsuy/items/babce8726ea78f5d25b1 (大変参考になりました)
            const popup_window = window.open(authorization_url, 'KonomiTV-OAuthPopup', Utils.getWindowFeatures());
            if (popup_window === null) {
                Message.error(this.$t('settings.jikkyo.message.popup_failed'));
                return;
            }

            // 認証完了 or 失敗後、ポップアップウインドウから送信される文字列を受信
            const onMessage = async (event) => {

                // すでにウインドウが閉じている場合は実行しない
                if (popup_window.closed) return;

                // 受け取ったオブジェクトに KonomiTV-OAuthPopup キーがない or そもそもオブジェクトではない際は実行しない
                // ブラウザの拡張機能から結構余計な message が飛んでくるっぽい…。
                if (Utils.typeof(event.data) !== 'object') return;
                if (('KonomiTV-OAuthPopup' in event.data) === false) return;

                // 認証は完了したので、ポップアップウインドウを閉じ、リスナーを解除する
                if (popup_window) popup_window.close();
                window.removeEventListener('message', onMessage);

                // ステータスコードと詳細メッセージを取得
                const authorization_status = event.data['KonomiTV-OAuthPopup']['status'] as number;
                const authorization_detail = event.data['KonomiTV-OAuthPopup']['detail'] as string;
                this.onOAuthCallbackReceived(authorization_status, authorization_detail);
            };

            // postMessage() を受信するリスナーを登録
            window.addEventListener('message', onMessage);
        },

        async onOAuthCallbackReceived(authorization_status: number, authorization_detail: string) {
            console.log(`NiconicoAuthCallbackAPI: Status: ${authorization_status} / Detail: ${authorization_detail}`);

            // OAuth 連携に失敗した
            if (authorization_status !== 200) {
                if (authorization_detail.startsWith('Authorization was denied (access_denied)')) {
                    Message.error(this.$t('settings.jikkyo.message.auth_cancelled'));
                } else if (authorization_detail.startsWith('Failed to get access token (HTTP Error ')) {
                    const error = authorization_detail.replace('Failed to get access token ', '');
                    Message.error(this.$t('settings.jikkyo.message.token_failed', { error }));
                } else if (authorization_detail.startsWith('Failed to get access token (Connection Timeout)')) {
                    Message.error(this.$t('settings.jikkyo.message.token_failed_timeout'));
                } else if (authorization_detail.startsWith('Failed to get user information (HTTP Error ')) {
                    const error = authorization_detail.replace('Failed to get user information ', '');
                    Message.error(this.$t('settings.jikkyo.message.userinfo_failed', { error }));
                } else if (authorization_detail.startsWith('Failed to get user information (Connection Timeout)')) {
                    Message.error(this.$t('settings.jikkyo.message.userinfo_failed_timeout'));
                } else {
                    Message.error(this.$t('settings.jikkyo.message.link_failed', { detail: authorization_detail }));
                }
                return;
            }

            // アカウント情報を強制的に更新
            await this.userStore.fetchUser(true);

            Message.success(this.$t('settings.jikkyo.message.linked'));
        },

        async logoutNiconicoAccount() {

            // ニコニコアカウント連携解除 API にリクエスト
            const result = await Niconico.logoutAccount();
            if (result === false) {
                return;
            }

            // アカウント情報を強制的に更新
            await this.userStore.fetchUser(true);

            Message.success(this.$t('settings.jikkyo.message.unlinked'));
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

.niconico-account {
    display: flex;
    align-items: center;
    height: 120px;
    padding: 20px;
    border-radius: 15px;
    background: rgb(var(--v-theme-background-lighten-2));
    @include tablet-horizontal {
        align-items: normal;
        flex-direction: column;
        height: auto;
        padding: 16px;
    }
    @include tablet-vertical {
        align-items: normal;
        flex-direction: column;
        height: auto;
        padding: 16px;
        .niconico-account-wrapper {
            .niconico-account__info {
                margin-left: 16px !important;
                margin-right: 0 !important;
                &-name-text {
                    font-size: 18.5px;
                }
                &-description {
                    font-size: 13.5px;
                }
            }
        }
    }
    @include smartphone-horizontal {
        align-items: normal;
        flex-direction: column;
        height: auto;
        padding: 16px;
        border-radius: 10px;
        .niconico-account-wrapper {
            .niconico-account__info {
                margin-right: 0 !important;
            }
        }
    }
    @include smartphone-horizontal-short {
        .niconico-account-wrapper {
            .niconico-account__info {
                margin-left: 16px !important;
                &-name-text {
                    font-size: 18px;
                }
                &-description {
                    font-size: 13px;
                }
            }
        }
    }
    @include smartphone-vertical {
        align-items: normal;
        flex-direction: column;
        height: auto;
        padding: 16px 12px;
        border-radius: 10px;
        .niconico-account-wrapper {
            .niconico-account__info {
                margin-left: 12px !important;
                margin-right: 0px !important;
                &-name-text {
                    font-size: 17px;
                }
                &-description {
                    font-size: 13px;
                }
            }
        }
    }

    &--anonymous {
        @include tablet-vertical {
            .niconico-account__login {
                margin-top: 12px;
            }
        }
        @include smartphone-horizontal {
            .niconico-account__login {
                margin-top: 12px;
            }
        }
        @include smartphone-horizontal-short {
            .niconico-account-wrapper {
                svg {
                    display: none;
                }
                .niconico-account__info {
                    margin-left: 0 !important;
                }
            }
        }
        @include smartphone-vertical {
            padding-top: 20px;
            .niconico-account__login {
                margin-top: 16px;
            }
            .niconico-account-wrapper {
                svg {
                    display: none;
                }
                .niconico-account__info {
                    margin-left: 0 !important;
                    margin-right: 0 !important;
                }
            }
        }
    }

    &-wrapper {
        display: flex;
        align-items: center;
        min-width: 0;
        height: 80px;
        @include smartphone-vertical {
            height: 60px;
        }
    }

    &__icon {
        flex-shrink: 0;
        min-width: 80px;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
        // 読み込まれるまでのアイコンの背景
        background: linear-gradient(150deg, rgb(var(--v-theme-gray)), rgb(var(--v-theme-background-lighten-2)));
        // 低解像度で表示する画像がぼやけないようにする
        // ref: https://sho-log.com/chrome-image-blurred/
        image-rendering: -webkit-optimize-contrast;
        @include smartphone-vertical {
            width: 60px;
            min-width: 60px;
            height: 60px;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        min-width: 0;
        margin-left: 20px;
        margin-right: 16px;

        &-name {
            display: inline-flex;
            align-items: center;
            height: 33px;
            @include smartphone-vertical {
                height: auto;
            }

            &-text {
                display: inline-block;
                font-size: 20px;
                color: rgb(var(--v-theme-text));
                font-weight: bold;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;  // はみ出た部分を … で省略
            }
        }

        &-description {
            display: inline-block;
            margin-top: 4px;
            color: rgb(var(--v-theme-text-darken-1));
            font-size: 14px;
        }
    }

    &__login {
        border-radius: 7px;
        font-size: 16px;
        letter-spacing: 0;
        @include tablet-horizontal {
            height: 50px !important;
            margin-top: 12px;
            margin-right: auto;
        }
        @include tablet-vertical {
            height: 42px !important;
            margin-top: 8px;
            margin-right: auto;
            font-size: 14.5px;
        }
        @include smartphone-horizontal {
            height: 42px !important;
            margin-top: 8px;
            margin-right: auto;
            font-size: 14.5px;
        }
        @include smartphone-vertical {
            height: 42px !important;
            margin-top: 16px;
            margin-right: auto;
            font-size: 14.5px;
        }
    }
}

</style>
