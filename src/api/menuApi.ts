import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";

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
    coverImage: string | null;
    publishedAt: Date | null;
}

export interface CreateMenuPayload {
    name: string
    description: string
    storeId: string
    siteId: string
}

export interface UpdateMenuPayload {
    name: string
    description: string
    enabled: boolean
}

export const menuApi = {
    getMenu: async (menuId: string) => {
        return axiosInstance.get<ApiResponse<Menu>>(`/menu/`, {
            params: {
                menu_id: menuId
            }
        }).then((response) => response.data)
    },
    getStoreMenus: async (storeId: string, siteId?: string) => {
        return axiosInstance.get<ApiResponse<Menu[]>>(`/menu/store_menus/`, {
            params: {
                store_id: storeId,
                site_id: siteId,
            }
        }).then((response) => response.data)
    },
    createMenu: async (payload: CreateMenuPayload) => {
        return axiosInstance.post<ApiResponse<Menu>>(`/menu/`, payload).then((response) => response.data)
    },

    updateMenu: async (params: { id: string, payload: UpdateMenuPayload }) => {
        return axiosInstance.put<ApiResponse<Menu>>(`menu/${params.id}`, params.payload)
    }

}

export const useMenus = (storeId: string, siteId?: string) => {
    return useQuery<Menu[]>({
        queryKey: ['menus', storeId],
        queryFn: async () => {
            const resp = await menuApi.getStoreMenus(storeId, siteId)
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
