import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";

export interface Store {
    id: number;
    name: string;
    city: string;
    store_type: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export const storeApi = {
    getUserStore: async (storeId: string) => {
        return axiosInstance.get<ApiResponse<Store>>(`/stores/user-store/${storeId}`).then(response => response.data)
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