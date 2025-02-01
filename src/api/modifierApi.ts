import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance"
import { Product } from "./productApi";

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
    modifiersToProducts: {
        product: Product
    }[] | null
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
        return axiosInstance.post<ApiResponse<Modifer>>('modifier', payload).then((resp) => resp.data)
    },
    getModifiersByStoreSite: async (siteId: string) => {
        return axiosInstance.get<ApiResponse<any[]>>('modifier', {
            params: {
                site_id: siteId
            }
        }).then((resp) => resp.data)
    }
}

export const useModifiersBySite = (siteId: string) => {
    return useQuery<any[]>({
        queryKey: ['modifiers', siteId],
        queryFn: async () => {
            const resp = await modifierApi.getModifiersByStoreSite(siteId)
            return resp.data
        }
    })
}