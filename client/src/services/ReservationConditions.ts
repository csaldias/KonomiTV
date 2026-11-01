
import i18n from '@/plugins/i18n';
import APIClient from '@/services/APIClient';
import { IProgramSearchCondition } from '@/services/Programs';
import { IRecordSettings } from '@/services/Reservations';


/**
 * キーワード自動予約条件
 */
export interface IReservationCondition {
    id: number;
    reservation_count: number;
    program_search_condition: IProgramSearchCondition;
    record_settings: IRecordSettings;
}

/**
 * キーワード自動予約条件リスト API のレスポンス
 */
export interface IReservationConditions {
    total: number;
    reservation_conditions: IReservationCondition[];
}

/**
 * キーワード自動予約条件追加リクエスト
 */
export interface IReservationConditionAddRequest {
    program_search_condition: IProgramSearchCondition;
    record_settings: IRecordSettings;
}

/**
 * キーワード自動予約条件更新リクエスト
 */
export interface IReservationConditionUpdateRequest {
    program_search_condition: IProgramSearchCondition;
    record_settings: IRecordSettings;
}


/**
 * キーワード自動予約条件に関する API 操作を提供するクラス
 */
class ReservationConditions {
    /**
     * すべてのキーワード自動予約条件の情報を取得する
     * @returns キーワード自動予約条件情報のリスト、取得失敗時は null
     */
    static async fetchReservationConditions(): Promise<IReservationConditions | null> {
        const response = await APIClient.get<IReservationConditions>('/recording/conditions');

        if (response.type === 'error') {
            switch (response.data.detail) {
                case 'This API is only available when the backend is EDCB':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.edcb_only'));
                    break;
                case 'Failed to get the list of reserve conditions':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.list_failed'));
                    break;
                default:
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.list_get_failed'));
                    break;
            }
            return null;
        }

        return response.data;
    }

    /**
     * 指定されたキーワード自動予約条件の情報を取得する
     * @param condition_id キーワード自動予約条件 ID
     * @returns キーワード自動予約条件情報、取得失敗時は null
     */
    static async fetchReservationCondition(condition_id: number): Promise<IReservationCondition | null> {
        const response = await APIClient.get<IReservationCondition>(`/recording/conditions/${condition_id}`);

        if (response.type === 'error') {
            switch (response.data.detail) {
                case 'This API is only available when the backend is EDCB':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.edcb_only'));
                    break;
                case 'Specified reservation_condition_id was not found':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.not_found'));
                    break;
                default:
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.info_failed'));
                    break;
            }
            return null;
        }

        return response.data;
    }

    /**
     * キーワード自動予約条件を追加する
     * @param program_search_condition 番組検索条件
     * @param record_settings 録画設定
     * @returns 成功した場合は true、失敗した場合は false
     */
    static async addReservationCondition(program_search_condition: IProgramSearchCondition, record_settings: IRecordSettings): Promise<boolean> {
        const request_data: IReservationConditionAddRequest = {
            program_search_condition,
            record_settings,
        };

        const response = await APIClient.post('/recording/conditions', request_data);

        if (response.type === 'error') {
            switch (response.data.detail) {
                case 'This API is only available when the backend is EDCB':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.edcb_only'));
                    break;
                case 'Failed to register the reserve condition':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.register_failed'));
                    break;
                default:
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.add_failed'));
                    break;
            }
            return false;
        }

        return true;
    }

    /**
     * キーワード自動予約条件を更新する
     * @param condition_id 更新するキーワード自動予約条件の ID
     * @param program_search_condition 番組検索条件
     * @param record_settings 録画設定
     * @returns 成功した場合は更新されたキーワード自動予約条件情報、失敗した場合は null
     */
    static async updateReservationCondition(
        condition_id: number,
        program_search_condition: IProgramSearchCondition,
        record_settings: IRecordSettings
    ): Promise<IReservationCondition | null> {
        const request_data: IReservationConditionUpdateRequest = {
            program_search_condition,
            record_settings,
        };

        const response = await APIClient.put<IReservationCondition>(`/recording/conditions/${condition_id}`, request_data);

        if (response.type === 'error') {
            switch (response.data.detail) {
                case 'This API is only available when the backend is EDCB':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.edcb_only'));
                    break;
                case 'Specified reservation_condition_id was not found':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.not_found'));
                    break;
                case 'Failed to update the specified reserve condition':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.update_failed'));
                    break;
                default:
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.update_failed'));
                    break;
            }
            return null;
        }

        return response.data;
    }

    /**
     * キーワード自動予約条件を削除する
     * @param condition_id 削除するキーワード自動予約条件の ID
     * @returns 成功した場合は true、失敗した場合は false
     */
    static async deleteReservationCondition(condition_id: number): Promise<boolean> {
        const response = await APIClient.delete<void>(`/recording/conditions/${condition_id}`);

        if (response.type === 'error') {
            switch (response.data.detail) {
                case 'This API is only available when the backend is EDCB':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.edcb_only'));
                    break;
                case 'Specified reservation_condition_id was not found':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.not_found'));
                    break;
                case 'Failed to delete the specified reserve condition':
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.delete_failed'));
                    break;
                default:
                    APIClient.showGenericError(response, i18n.global.t('messages.reservation_conditions.delete_failed_id', [condition_id]));
                    break;
            }
            return false;
        }

        return true;
    }
}

export default ReservationConditions;
