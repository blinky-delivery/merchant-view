import axiosInstance, { ApiResponse } from './axiosInstance'
import { useQuery } from '@tanstack/react-query'


export enum UserRole {
    OWNER = 'OWNER',
    MANAGER = 'MANAGER',
    DELIVERY = 'DELIVERY',
}
export interface User {
    id: number
    extAuthId: string
    storeId: string | null
    email: string
    role: UserRole
    fullName: string;
    phoneNumber: string;
    createdAt: Date
    updatedAt: Date
}

export interface SignupPayload {
    email: string
    password: string
    fullName: string
    phoneNumber: string
}
export const userApi = {
    signup: async (
        userData: SignupPayload
    ): Promise<ApiResponse<User>> => {
        return axiosInstance.post<ApiResponse<User>>('/users/signup', userData).then(response => response.data)
    },
    getUser: async (): Promise<ApiResponse<User>> => {
        return axiosInstance.get<ApiResponse<User>>('/users').then(response => response.data)
    }
}

export const useStoreUser = () => {
    return useQuery<User>({
        queryKey: ['user'], queryFn: async () => {
            const response = await userApi.getUser()
            return response.data
        }
    })
}