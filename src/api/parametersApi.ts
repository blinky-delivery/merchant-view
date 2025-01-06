import axiosInstance from "./axiosInstance";

export interface City {
    id: number;
    name: string
}

export interface StoreType {
    id: number;
    name: string
}


export const parametersApi = {
    getCities: async (): Promise<City[]> => {
        return axiosInstance.get<City[]>('parameters/cities').then(response => response.data)
    },
    getStoreTypes: async (): Promise<StoreType[]> => {
        return axiosInstance.get<StoreType[]>('parameters/store-types').then(response => response.data)
    }
}