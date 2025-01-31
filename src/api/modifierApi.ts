import axiosInstance, { ApiResponse } from "./axiosInstance"

export interface Modifer {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    storeSiteId: string;
    menuId: string | null;
    required: boolean;
    multipleAllowed: boolean;
    minQuantity: number;
    maxQuantity: number;
    maxFreeQuantity: number | null;
    options: ModifierOption[]
}

export interface ModifierOption {
    id: string;
    name: string;
    createdAt: Date;
    sort: number;
    price: number;
    modiferId: string;
}

export interface CreateModifierPayload {
    menuId: string
    storeSiteId: string
    name: string
    productsIds: string[]
    required: boolean
    multipleAllowed: boolean
    minQuantity: number
    maxQuantity: number
    maxFreeQuantity: number
    options: {
        name: string
        price: number
    }[],
}

export const modifierApi = {
    createModifier: async (payload: CreateModifierPayload) => {
        return axiosInstance.post<ApiResponse<Modifer>>('modifiers', payload).then((resp) => resp.data)
    }
}