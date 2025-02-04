import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";

export enum SiteStatus {
    OPEN = "open",
    PAUSED = "paused",
    CLOSED = "closed",
    INACTIVE = "inactive",
}


export interface Store {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    applicationId: string;
    storeTypeId: number;
    ownerId: string;
    description: string;
    contactPhone: string;
    address: string;
    numberOfSites: number;
}

export interface StoreSite {
    id: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    address: string;
    approved: boolean;
    latitude: number;
    longitude: number;
    name: string;
    cityId: number;
    postalCode: string;
    phone: string;
}

export interface StoreAvailability {
    id: string
    storeSiteId: string
    dayOfWeek: number
    timeRangeIndex: number
    openTime: string
    closTime: string
}

export const storeApi = {
    getUserStore: async (storeId: string) => {
        return axiosInstance.get<ApiResponse<Store>>(`/stores/user-store/`, { params: { store_id: storeId } }).then(response => response.data)
    },
    getStoreSites: async (storeId: string) => {
        return axiosInstance.get<ApiResponse<StoreSite[]>>(`/stores/user-store/sites`, { params: { store_id: storeId } }).then(response => response.data)
    },
    getSite: async (siteId: string) => {
        return axiosInstance.get<ApiResponse<StoreSite>>(`/stores/user-store/sites/${siteId}`).then(response => response.data)
    },
    getSiteAvailability: async (siteId: string) => {
        return axiosInstance.get<ApiResponse<StoreAvailability[]>>('availability/site', {
            params: {
                site_id: siteId,
            }
        }).then((resp) => resp.data)
    }


}

export const useMerchantStore = (storeId: string) => {
    return useQuery<Store>({
        queryKey: ['store', storeId],
        queryFn: async () => {
            const response = await storeApi.getUserStore(storeId);
            return response.data;
        }
    })
}

export const useStoreSites = (storeId: string) => {
    return useQuery<StoreSite[]>({
        queryKey: ['sites', storeId],
        queryFn: async () => {
            const response = await storeApi.getStoreSites(storeId)
            return response.data
        }
    })
}


export const useSite = (siteId: string) => {
    return useQuery<StoreSite>({
        queryKey: ['site', siteId],
        queryFn: async () => {
            const response = await storeApi.getSite(siteId)
            return response.data
        }
    })
}