import axiosInstance, { ApiResponse } from "./axiosInstance";

export interface City {
    id: number;
    name: string
}

export interface StoreType {
    id: number;
    name: string
}


export const parametersApi = {
    getCities: async () => {
        return axiosInstance.get<ApiResponse<City[]>>('parameters/cities').then(response => response.data)
    },
    getStoreTypes: async () => {
        return axiosInstance.get<ApiResponse<StoreType[]>>('parameters/store-types').then(response => response.data)
    }
}