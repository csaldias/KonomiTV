
import { defineStore } from 'pinia';
import { reactive } from 'vue';

import Message from '@/message';
import i18n from '@/plugins/i18n';
import Programs, { type IProgramTranslation } from '@/services/Programs';
import useServerSettingsStore from '@/stores/ServerSettingsStore';
import useSettingsStore from '@/stores/SettingsStore';
import { dayjs } from '@/utils';


/**
 * 取得済みの番組情報の英訳
 */
interface ICachedProgramTranslation {
    // 番組情報の英訳 (null はサーバーにその番組が存在せず、英訳を取得できなかったことを示す)
    translation: IProgramTranslation | null;
    // 英訳を取得した時刻 (UNIX ミリ秒)
    fetched_at: number;
}


/**
 * 番組情報の英訳を取得・キャッシュするストア
 * 表示する側が getTranslation() で英訳を参照すると、未取得の番組の英訳を少し待ってからまとめて取得する
 * 英訳が届くとリアクティブに再描画されるため、表示する側は取得のタイミングを意識しなくてよい
 */
const useProgramTranslationsStore = defineStore('programTranslations', () => {

    // サーバーの翻訳処理は 10 分ごとに実行されるため、まだ翻訳が完了していない番組は 5 分経過したら英訳を取得し直す
    const REFETCH_INTERVAL_MS = 5 * 60 * 1000;

    // 取得に失敗した番組は、1 分経過するまで取得し直さない
    const RETRY_INTERVAL_MS = 60 * 1000;

    // 1回の API リクエストで英訳を取得する番組数の上限 (サーバー側の上限は 5000 件)
    const FETCH_CHUNK_SIZE = 1000;

    // 番組 ID をキーとする、取得済みの番組情報の英訳
    // reactive な Map なので、getTranslation() を呼び出した描画処理は、その番組 ID の英訳が届いたときに再描画される
    const translations = reactive(new Map<string, ICachedProgramTranslation>());

    // 次回の取得で英訳を要求する番組 ID
    // 描画中に変更しても再描画を引き起こさないよう、リアクティブにしない
    const pending_program_ids = new Set<string>();

    // 英訳を取得中の番組 ID (同じ番組を重複して要求するのを避ける)
    const fetching_program_ids = new Set<string>();

    // 英訳の取得に失敗した番組 ID と、失敗した時刻 (UNIX ミリ秒)
    const failed_at_by_program_id = new Map<string, number>();

    // 英訳の取得を予約している setTimeout の ID
    let flush_timer_id: ReturnType<typeof setTimeout> | null = null;


    /**
     * 番組情報を英語で表示するかどうかを取得する
     * @returns 英語で表示する設定なら true
     */
    function isEnglishEnabled(): boolean {
        return useSettingsStore().settings.program_info_display_language === 'English';
    }


    /**
     * 番組情報の英訳を取得する
     * まだ英訳を取得していない番組は、後でまとめて取得するよう予約し、英訳が届くまでは null を返す
     * @param program_id 番組 ID
     * @returns 番組情報の英訳 (未取得・取得できなかった場合は null)
     */
    function getTranslation(program_id: string): IProgramTranslation | null {
        const cached = translations.get(program_id);
        const now = dayjs().valueOf();

        // 未取得の番組と、翻訳が完了していないまま一定時間が経過した番組は、英訳を取得し直す
        let should_fetch = false;
        if (cached === undefined) {
            should_fetch = true;
        } else if (cached.translation?.is_complete !== true && now - cached.fetched_at >= REFETCH_INTERVAL_MS) {
            should_fetch = true;
        }

        // 直前に取得に失敗した番組は、一定時間が経過するまで取得し直さない
        const failed_at = failed_at_by_program_id.get(program_id);
        if (failed_at !== undefined && now - failed_at < RETRY_INTERVAL_MS) {
            should_fetch = false;
        }

        if (should_fetch === true && fetching_program_ids.has(program_id) === false) {
            pending_program_ids.add(program_id);
            scheduleFlush();
        }

        return cached?.translation ?? null;
    }


    /**
     * 予約した番組の英訳の取得を、少し待ってから実行する
     * 一覧や番組表の描画中に呼び出される getTranslation() の要求を、1回の取得処理にまとめる
     */
    function scheduleFlush(): void {
        if (flush_timer_id !== null) {
            return;
        }
        flush_timer_id = setTimeout(() => {
            flush_timer_id = null;
            flush();
        }, 50);
    }


    /**
     * 予約した番組の英訳をまとめて取得する
     */
    async function flush(): Promise<void> {
        const program_ids = [...pending_program_ids];
        pending_program_ids.clear();
        for (const program_id of program_ids) {
            fetching_program_ids.add(program_id);
        }

        // サーバー側の上限を超えないよう、一定数ごとに分けて取得する
        for (let index = 0; index < program_ids.length; index += FETCH_CHUNK_SIZE) {
            const chunk = program_ids.slice(index, index + FETCH_CHUNK_SIZE);
            const result = await Programs.fetchProgramTranslations(chunk);
            const now = dayjs().valueOf();

            for (const program_id of chunk) {
                fetching_program_ids.delete(program_id);

                // 取得に失敗した番組は取得済みとして扱わず、一定時間後に取得し直す
                if (result === null) {
                    failed_at_by_program_id.set(program_id, now);
                    continue;
                }
                failed_at_by_program_id.delete(program_id);

                // レスポンスに含まれない番組は、サーバーに存在しない番組として記録する
                const translation = result.translations[program_id] ?? null;
                translations.set(program_id, {translation, fetched_at: now});
            }
        }
    }


    /**
     * 番組情報の表示言語を日本語と英語で切り替える
     * サーバーで翻訳機能が無効なときは英語に切り替えず、有効にする方法を案内する
     */
    async function toggleDisplayLanguage(): Promise<void> {
        const settings_store = useSettingsStore();

        // 英語から日本語への切り替えは、サーバーの状態に関わらず常に行う
        if (isEnglishEnabled() === true) {
            settings_store.settings.program_info_display_language = 'Japanese';
            return;
        }

        // サーバー設定を取得できなかった場合は、エラーが表示されているので何もしない
        const server_settings = await useServerSettingsStore().fetchServerSettingsOnce();
        if (server_settings === null) {
            return;
        }

        // 翻訳機能が無効なサーバーでは英訳が生成されないため、英語に切り替えずに有効にする方法を案内する
        if (server_settings.translation.enabled === false) {
            Message.warning(i18n.global.t('messages.program_translations.disabled'));
            return;
        }
        settings_store.settings.program_info_display_language = 'English';
    }


    return {
        isEnglishEnabled,
        getTranslation,
        toggleDisplayLanguage,
    };
});

export default useProgramTranslationsStore;
