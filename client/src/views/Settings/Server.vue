<template>
    <!-- ベース画面の中にそれぞれの設定画面で異なる部分を記述する -->
    <SettingsBase>
        <h2 class="settings__heading">
            <a v-ripple class="settings__back-button" @click="$router.back()">
                <Icon icon="fluent:chevron-left-12-filled" width="27px" />
            </a>
            <Icon icon="fluent:server-surface-16-filled" width="22px" />
            <span class="ml-2">{{ $t('settings.server.title') }}</span>
        </h2>
        <div class="settings__description" v-html="$t('settings.server.description_1')"></div>
        <div class="settings__description mt-1" v-html="$t('settings.server.description_2')"></div>
        <div class="settings__content" :class="{'settings__content--disabled': is_disabled}">
            <div class="settings__content-heading">
                <Icon icon="fa-solid:sliders-h" width="22px" style="padding: 0 3px;" />
                <span class="ml-2">{{ $t('settings.server.section.general') }}</span>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.backend.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.backend.label')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="['EDCB', 'Mirakurun']" v-model="server_settings.general.backend">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.edcb_url.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.edcb_url.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.edcb_url.label_2')"></div>
                <v-text-field class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model="server_settings.general.edcb_url">
                </v-text-field>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.mirakurun_url.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.mirakurun_url.label')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.mirakurun_url.label_2')"></div>
                <v-text-field class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model="server_settings.general.mirakurun_url">
                </v-text-field>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.encoder.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.encoder.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.encoder.label_2')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="encoder_options"
                    v-model="server_settings.general.encoder">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.program_update_interval.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.program_update_interval.label')"></div>
                <v-slider class="settings__item-form" color="primary" show-ticks="always" thumb-label hide-details
                    :min="0.5" :max="60" :step="0.5"
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model="server_settings.general.program_update_interval">
                </v-slider>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="debug">{{ $t('settings.server.debug.heading') }}</label>
                <label class="settings__item-label" for="debug" v-html="$t('settings.server.debug.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="debug" hide-details
                    v-model="server_settings.general.debug">
                </v-switch>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="debug_encoder">{{ $t('settings.server.debug_encoder.heading') }}</label>
                <label class="settings__item-label" for="debug_encoder" v-html="$t('settings.server.debug_encoder.label')"></label>
                <v-switch class="settings__item-switch" color="primary" id="debug_encoder" hide-details
                    v-model="server_settings.general.debug_encoder">
                </v-switch>
            </div>
            <div class="settings__content-heading mt-6">
                <Icon icon="fluent:server-surface-16-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.server.section.server') }}</span>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.port.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.port.label')"></div>
                <v-text-field class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model="server_settings.server.port">
                </v-text-field>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.custom_https.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.custom_https.label')"></div>
                <v-text-field class="settings__item-form" color="primary" variant="outlined" hide-details
                    :label="$t('settings.server.custom_https.cert_placeholder')"
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model="server_settings.server.custom_https_certificate">
                </v-text-field>
                <v-text-field class="settings__item-form" color="primary" variant="outlined" hide-details
                    :label="$t('settings.server.custom_https.key_placeholder')"
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model="server_settings.server.custom_https_private_key">
                </v-text-field>
            </div>
            <div class="settings__content-heading mt-6">
                <Icon icon="fluent:tv-20-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.server.section.tv') }}</span>
            </div>
            <div class="settings__item settings__item--switch">
                <label class="settings__item-heading" for="always_receive_tv_from_mirakurun">{{ $t('settings.server.always_receive_tv_from_mirakurun.heading') }}</label>
                <label class="settings__item-label" for="always_receive_tv_from_mirakurun" v-html="$t('settings.server.always_receive_tv_from_mirakurun.label_1')"></label>
                <label class="settings__item-label mt-1" for="always_receive_tv_from_mirakurun" v-html="$t('settings.server.always_receive_tv_from_mirakurun.label_2')"></label>
                <v-switch class="settings__item-switch" color="primary" id="always_receive_tv_from_mirakurun" hide-details
                    v-model="server_settings.general.always_receive_tv_from_mirakurun">
                </v-switch>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.preferred_terrestrial_region.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.preferred_terrestrial_region.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.preferred_terrestrial_region.label_2')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.preferred_terrestrial_region.label_3')"></div>
                <v-select class="settings__item-form" color="primary" variant="outlined" hide-details
                    :density="is_form_dense ? 'compact' : 'default'"
                    :items="preferred_terrestrial_region_options"
                    v-model="server_settings.tv.preferred_terrestrial_region">
                </v-select>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.max_alive_time.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.max_alive_time.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.max_alive_time.label_2')"></div>
                <v-slider class="settings__item-form" color="primary" show-ticks="always" thumb-label hide-details
                    :min="0" :max="60" :step="1"
                    :density="is_form_dense ? 'compact' : 'default'"
                    v-model="server_settings.tv.max_alive_time">
                </v-slider>
            </div>
            <div class="settings__content-heading mt-6">
                <Icon icon="fluent:movies-and-tv-20-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.server.section.video') }}</span>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.recorded_folders.heading') }}</div>
                <div class="settings__item-label" style="padding-bottom: 2px;" v-html="$t('settings.server.recorded_folders.label_1')"></div>
                <div class="settings__item-label mt-1" style="padding-bottom: 2px;" v-html="$t('settings.server.recorded_folders.label_2')"></div>
                <div v-for="(folder, index) in server_settings.video.recorded_folders" :key="'recorded-folder-' + index">
                    <div class="d-flex align-center mt-3">
                        <v-text-field class="settings__item-form mt-0" color="primary" variant="outlined" hide-details
                            :placeholder="$t('settings.server.recorded_folders.placeholder')"
                            :density="is_form_dense ? 'compact' : 'default'"
                            v-model="server_settings.video.recorded_folders[index]">
                        </v-text-field>
                        <button v-ripple class="settings__item-delete-button"
                            @click="server_settings.video.recorded_folders.splice(index, 1)">
                            <svg class="iconify iconify--fluent" width="20px" height="20px" viewBox="0 0 16 16">
                                <path fill="currentColor" d="M7 3h2a1 1 0 0 0-2 0ZM6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1h4Zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0v-5ZM9.5 6a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <v-btn class="mt-3" color="background-lighten-2" variant="flat" height="40px"
                    @click="server_settings.video.recorded_folders.push('')">
                    <Icon icon="fluent:add-12-filled" height="17px" />
                    <span class="ml-1">{{ $t('settings.server.recorded_folders.add_button') }}</span>
                </v-btn>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.exclude_scan_paths.heading') }}</div>
                <div class="settings__item-label" style="padding-bottom: 2px;" v-html="$t('settings.server.exclude_scan_paths.label_1')"></div>
                <div class="settings__item-label mt-1" style="padding-bottom: 2px;" v-html="$t('settings.server.exclude_scan_paths.label_2')"></div>
                <div v-for="(pattern, index) in server_settings.video.exclude_scan_paths" :key="'exclude-pattern-' + index">
                    <div class="d-flex align-center mt-3">
                        <v-text-field class="settings__item-form mt-0" color="primary" variant="outlined" hide-details
                            :placeholder="$t('settings.server.exclude_scan_paths.placeholder')"
                            :density="is_form_dense ? 'compact' : 'default'"
                            v-model="server_settings.video.exclude_scan_paths[index]">
                        </v-text-field>
                        <button v-ripple class="settings__item-delete-button"
                            @click="server_settings.video.exclude_scan_paths.splice(index, 1)">
                            <svg class="iconify iconify--fluent" width="20px" height="20px" viewBox="0 0 16 16">
                                <path fill="currentColor" d="M7 3h2a1 1 0 0 0-2 0ZM6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1h4Zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0v-5ZM9.5 6a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <v-btn class="mt-3" color="background-lighten-2" variant="flat" height="40px"
                    @click="server_settings.video.exclude_scan_paths.push('')">
                    <Icon icon="fluent:add-12-filled" height="17px" />
                    <span class="ml-1">{{ $t('settings.server.exclude_scan_paths.add_button') }}</span>
                </v-btn>
            </div>
            <div class="settings__content-heading mt-6">
                <Icon icon="fluent:image-multiple-16-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.server.section.capture') }}</span>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.upload_folders.heading') }}</div>
                <div class="settings__item-label">
                    <i18n-t keypath="settings.server.upload_folders.label" tag="span" scope="global">
                        <template #capture_link>
                            <router-link class="link" to="/settings/capture">{{ $t('settings.server.upload_folders.capture_link_text') }}</router-link>
                        </template>
                    </i18n-t>
                </div>
                <div class="settings__item-label mt-1" style="padding-bottom: 2px;" v-html="$t('settings.server.upload_folders.label_2')"></div>
                <div v-for="(folder, index) in server_settings.capture.upload_folders" :key="'upload-folder-' + index">
                    <div class="d-flex align-center mt-3">
                        <v-text-field class="settings__item-form mt-0" color="primary" variant="outlined" hide-details
                            :placeholder="$t('settings.server.upload_folders.placeholder')"
                            :density="is_form_dense ? 'compact' : 'default'"
                            v-model="server_settings.capture.upload_folders[index]">
                        </v-text-field>
                        <button v-ripple class="settings__item-delete-button"
                            @click="server_settings.capture.upload_folders.splice(index, 1)">
                            <svg class="iconify iconify--fluent" width="20px" height="20px" viewBox="0 0 16 16">
                                <path fill="currentColor" d="M7 3h2a1 1 0 0 0-2 0ZM6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 9.754 15H6.246a2.5 2.5 0 0 1-2.477-2.162L2.564 4H2a.5.5 0 0 1 0-1h4Zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0v-5ZM9.5 6a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 1 0v-5a.5.5 0 0 0-.5-.5Z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <v-btn class="mt-3" color="background-lighten-2" variant="flat" height="40px"
                    @click="server_settings.capture.upload_folders.push('')">
                    <Icon icon="fluent:add-12-filled" height="17px" />
                    <span class="ml-1">{{ $t('settings.server.upload_folders.add_button') }}</span>
                </v-btn>
            </div>
            <v-btn class="settings__save-button bg-secondary mt-6" variant="flat" @click="updateServerSettings()">
                <Icon icon="fluent:save-16-filled" class="mr-2" height="23px" />{{ $t('settings.server.save_button') }}
            </v-btn>
            <div class="settings__content-heading mt-8">
                <Icon icon="fluent:person-board-20-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.server.section.account') }}</span>
            </div>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.account_manage.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.account_manage.label_1')"></div>
                <div class="settings__item-label mt-1">
                    <i18n-t keypath="settings.server.account_manage.label_2" tag="span" scope="global">
                        <template #account_link>
                            <router-link class="link" to="/settings/account">{{ $t('settings.server.account_manage.account_link_text') }}</router-link>
                        </template>
                    </i18n-t>
                </div>
            </div>
            <v-btn class="settings__save-button mt-4" variant="flat" @click="account_manage_settings_modal = !account_manage_settings_modal">
                <Icon icon="fluent:person-board-20-filled" height="20px" />
                <span class="ml-1">{{ $t('settings.server.account_manage.button') }}</span>
            </v-btn>
        </div>
        <div class="settings__content">
            <div class="settings__content-heading mt-8">
                <Icon icon="fluent:wrench-settings-20-filled" width="22px" />
                <span class="ml-2">{{ $t('settings.server.section.maintenance') }}</span>
            </div>
        </div>
        <div class="settings__content" :class="{'settings__content--disabled': is_disabled}">
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.server_log.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.server_log.label')"></div>
            </div>
            <v-btn class="settings__save-button mt-5" color="background-lighten-2" variant="flat"
                @click="server_log_dialog = !server_log_dialog">
                <Icon icon="fluent:document-text-16-regular" height="20px" />
                <span class="ml-2">{{ $t('settings.server.server_log.button') }}</span>
            </v-btn>
        </div>
        <div class="settings__content">
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.update_database.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.update_database.label')"></div>
            </div>
            <v-btn class="settings__save-button mt-5" color="background-lighten-2" variant="flat"
                @click="updateDatabase()">
                <Icon icon="iconoir:database-backup" height="20px" />
                <span class="ml-2">{{ $t('settings.server.update_database.button') }}</span>
            </v-btn>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.batch_scan.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.batch_scan.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.batch_scan.label_2')"></div>
            </div>
            <v-btn class="settings__save-button mt-5" color="background-lighten-2" variant="flat"
                @click="runBatchScan()">
                <Icon icon="fluent:folder-sync-20-regular" height="20px" />
                <span class="ml-2">{{ $t('settings.server.batch_scan.button') }}</span>
            </v-btn>
            <div class="settings__item">
                <div class="settings__item-heading">{{ $t('settings.server.background_analysis.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.background_analysis.label_1')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.background_analysis.label_2')"></div>
            </div>
            <v-btn class="settings__save-button mt-5" color="background-lighten-2" variant="flat"
                @click="startBackgroundAnalysis()">
                <Icon icon="fluent:book-arrow-clockwise-20-regular" height="20px" />
                <span class="ml-2">{{ $t('settings.server.background_analysis.button') }}</span>
            </v-btn>
        </div>
        <div class="settings__content" :class="{'settings__content--disabled': is_disabled}">
            <div class="settings__item">
                <div class="settings__item-heading text-error-lighten-1">{{ $t('settings.server.restart.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.restart.label')"></div>
            </div>
            <v-btn class="settings__save-button bg-error mt-5" variant="flat"
                @click="restartServer()">
                <Icon icon="fluent:arrow-counterclockwise-20-filled" height="20px" />
                <span class="ml-2">{{ $t('settings.server.restart.button') }}</span>
            </v-btn>
            <div class="settings__item">
                <div class="settings__item-heading text-error-lighten-1">{{ $t('settings.server.shutdown.heading') }}</div>
                <div class="settings__item-label" v-html="$t('settings.server.shutdown.label')"></div>
                <div class="settings__item-label mt-1" v-html="$t('settings.server.shutdown.label_2')"></div>
            </div>
            <v-btn class="settings__save-button bg-error mt-5" variant="flat"
                @click="shutdownServer()">
                <Icon icon="fluent:power-20-filled" height="20px" />
                <span class="ml-2">{{ $t('settings.server.shutdown.button') }}</span>
            </v-btn>
        </div>
        <AccountManageSettings :modelValue="account_manage_settings_modal" @update:modelValue="account_manage_settings_modal = $event" />
        <ServerLogDialog :modelValue="server_log_dialog" @update:modelValue="server_log_dialog = $event" />
    </SettingsBase>
</template>
<script lang="ts" setup>

import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AccountManageSettings from '@/components/Settings/AccountManageSettings.vue';
import ServerLogDialog from '@/components/Settings/ServerLogDialog.vue';
import Message from '@/message';
import Maintenance from '@/services/Maintenance';
import Settings, { IServerSettings, IServerSettingsDefault } from '@/services/Settings';
import Version from '@/services/Version';
import useUserStore from '@/stores/UserStore';
import Utils from '@/utils';
import SettingsBase from '@/views/Settings/Base.vue';

const { t } = useI18n();

// フォームを小さくするかどうか
const is_form_dense = Utils.isSmartphoneHorizontal();

// 利用するエンコーダーの選択肢 (表示ラベルを表示言語に追従させる)
const encoder_options = computed(() => [
    { title: t('settings.server.encoder.option_ffmpeg'), value: 'FFmpeg' },
    { title: t('settings.server.encoder.option_qsvenc'), value: 'QSVEncC' },
    { title: t('settings.server.encoder.option_nvenc'), value: 'NVEncC' },
    { title: t('settings.server.encoder.option_vceenc'), value: 'VCEEncC' },
    { title: t('settings.server.encoder.option_rkmppenc'), value: 'rkmppenc' },
]);

// 優先する地デジのエリアの選択肢テーブル (値はサーバー設定にそのまま保存されるため、表示名のみを翻訳する)
const REGION_TABLE: { value: string | null; key: string }[] = [
    { value: null, key: 'not_set' },
    { value: '北海道（札幌）', key: 'hokkaido_sapporo' },
    { value: '北海道（函館）', key: 'hokkaido_hakodate' },
    { value: '北海道（旭川）', key: 'hokkaido_asahikawa' },
    { value: '北海道（帯広）', key: 'hokkaido_obihiro' },
    { value: '北海道（釧路）', key: 'hokkaido_kushiro' },
    { value: '北海道（北見）', key: 'hokkaido_kitami' },
    { value: '北海道（室蘭）', key: 'hokkaido_muroran' },
    { value: '青森県', key: 'aomori' },
    { value: '岩手県', key: 'iwate' },
    { value: '宮城県', key: 'miyagi' },
    { value: '秋田県', key: 'akita' },
    { value: '山形県', key: 'yamagata' },
    { value: '福島県', key: 'fukushima' },
    { value: '茨城県', key: 'ibaraki' },
    { value: '栃木県', key: 'tochigi' },
    { value: '群馬県', key: 'gunma' },
    { value: '埼玉県', key: 'saitama' },
    { value: '千葉県', key: 'chiba' },
    { value: '東京都', key: 'tokyo' },
    { value: '神奈川県', key: 'kanagawa' },
    { value: '新潟県', key: 'niigata' },
    { value: '富山県', key: 'toyama' },
    { value: '石川県', key: 'ishikawa' },
    { value: '福井県', key: 'fukui' },
    { value: '山梨県', key: 'yamanashi' },
    { value: '長野県', key: 'nagano' },
    { value: '岐阜県', key: 'gifu' },
    { value: '静岡県', key: 'shizuoka' },
    { value: '愛知県', key: 'aichi' },
    { value: '三重県', key: 'mie' },
    { value: '滋賀県', key: 'shiga' },
    { value: '京都府', key: 'kyoto' },
    { value: '大阪府', key: 'osaka' },
    { value: '兵庫県', key: 'hyogo' },
    { value: '奈良県', key: 'nara' },
    { value: '和歌山県', key: 'wakayama' },
    { value: '鳥取県', key: 'tottori' },
    { value: '島根県', key: 'shimane' },
    { value: '岡山県', key: 'okayama' },
    { value: '広島県', key: 'hiroshima' },
    { value: '山口県', key: 'yamaguchi' },
    { value: '徳島県', key: 'tokushima' },
    { value: '香川県', key: 'kagawa' },
    { value: '愛媛県', key: 'ehime' },
    { value: '高知県', key: 'kochi' },
    { value: '福岡県', key: 'fukuoka' },
    { value: '佐賀県', key: 'saga' },
    { value: '長崎県', key: 'nagasaki' },
    { value: '熊本県', key: 'kumamoto' },
    { value: '大分県', key: 'oita' },
    { value: '宮崎県', key: 'miyazaki' },
    { value: '鹿児島県', key: 'kagoshima' },
    { value: '沖縄県', key: 'okinawa' },
];
const preferred_terrestrial_region_options = computed(() => REGION_TABLE.map((region) => ({
    title: t(`settings.server.region_option.${region.key}`),
    value: region.value,
})));

// ユーザー情報を取得し、もし管理者権限であれば無効化を解除
const is_disabled = ref(true);
const user_store = useUserStore();
user_store.fetchUser().then((user) => {
    if (user && user.is_admin) {
        is_disabled.value = false;
    }
});

// サーバー設定を取得
const server_settings = ref<IServerSettings>(structuredClone(IServerSettingsDefault));
Settings.fetchServerSettings().then((settings) => {
    if (settings) {
        server_settings.value = settings;
    }
});

// サーバー設定を更新する関数
async function updateServerSettings() {

    // custom_https_certificate と custom_https_private_key が空文字列の場合は null に変換
    if (server_settings.value.server.custom_https_certificate === '') {
        server_settings.value.server.custom_https_certificate = null;
    }
    if (server_settings.value.server.custom_https_private_key === '') {
        server_settings.value.server.custom_https_private_key = null;
    }

    // サーバー設定を更新
    const result = await Settings.updateServerSettings(server_settings.value);

    // 成功した場合のみメッセージを表示
    // エラー処理は Services 層で行われるため、ここではエラー処理は不要
    // 再起動するまでは設定データは反映されないため、再起動せずにページをリロードすると反映されてないように見える点に注意
    if (result === true) {
        Message.success(t('settings.server.message.settings_updated'));
    }
}

// ユーザー管理モーダルの表示状態
const account_manage_settings_modal = ref(false);
// サーバーログダイアログの表示状態
const server_log_dialog = ref(false);

// データベースを更新する関数
async function updateDatabase() {
    Message.show(t('settings.server.message.database_updating'));
    await Maintenance.updateDatabase();
    Message.success(t('settings.server.message.database_updated'));
}

// 録画フォルダの一括スキャンを実行する関数
async function runBatchScan() {
    Message.info(t('settings.server.message.batch_scan_starting'));
    const result = await Maintenance.runBatchScan();
    if (result === true) {
        Message.success(t('settings.server.message.batch_scan_done'));
    }
}

// バックグラウンド解析タスクを開始する関数
async function startBackgroundAnalysis() {
    Message.info(t('settings.server.message.analysis_starting'));
    const result = await Maintenance.startBackgroundAnalysis();
    if (result === true) {
        Message.success(t('settings.server.message.analysis_done'));
    }
}

// KonomiTV サーバーの再起動を行う関数
async function restartServer() {
    const result = await Maintenance.restartServer();
    if (result === true) {
        Message.show(t('settings.server.message.server_restarting'));
        // バージョン情報が取得できるようになるまで待つ
        await Utils.sleep(1.0);
        while (await Version.fetchServerVersion(true) === null) {
            await Utils.sleep(1.0);
        }
        Message.success(t('settings.server.message.server_restarted'));
    }
}

// KonomiTV サーバーのシャットダウンを行う関数
async function shutdownServer() {
    const result = await Maintenance.shutdownServer();
    if (result === true) {
        Message.success(t('settings.server.message.server_shutdown'));
    }
}

</script>
