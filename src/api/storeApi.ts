import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";

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

export const storeApi = {
    getUserStore: async (storeId: string) => {
        return axiosInstance.get<ApiResponse<Store>>(`/stores/user-store/${storeId}`).then(response => response.data)
    },
    getStoreSites: async (storeId: string) => {
        return axiosInstance.get<ApiResponse<StoreSite[]>>(`/stores/user-store/sites/${storeId}`).then(response => response.data)
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