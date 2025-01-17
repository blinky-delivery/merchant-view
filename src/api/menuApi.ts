import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export enum Menutatus {
    DRAFT = 'DRAFT',
    REVIEW = 'REVIEW',
    APPROVED = 'APPROVED',
    ARCHIVED = 'ARCHIVED',
    PUBLISHED = 'PUBLISHED'
}

export interface Menu {
    id: string;
    name: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    description: string;
    status: string;
    publishedAt: Date | null;
}

export interface CreateMenuPayload {
    name: string
    description: string
    storeId: string
}

export const menuApi = {
    getMenu: async (menuId: string) => {
        return axiosInstance.get<ApiResponse<Menu>>(`/menu/${menuId}`).then((response) => response.data)
    },
    getStoreMenus: async (storeId: string) => {
        return axiosInstance.get<ApiResponse<Menu[]>>(`/menu/store_menus/${storeId}`).then((response) => response.data)
    },
    createMenu: async (payload: CreateMenuPayload) => {
        return axiosInstance.post<ApiResponse<Menu>>(`/menu/`, payload).then((response) => response.data)
    },

}

export const useMenus = (storeId: string) => {
    return useQuery<Menu[]>({
        queryKey: ['menus', storeId],
        queryFn: async () => {
            const resp = await menuApi.getStoreMenus(storeId)
            return resp.data
        }
    })
}


export const useMenu = (menuId: string) => {
    return useQuery<Menu>({
        queryKey: ['menu', menuId],
        queryFn: async () => {
            const resp = await menuApi.getMenu(menuId)
            return resp.data
        }
    })
}
