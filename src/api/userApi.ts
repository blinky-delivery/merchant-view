import axiosInstance, { ApiResponse } from './axiosInstance';


export enum UserRole {
    OWNER = 'OWNER',
    MANAGER = 'MANAGER',
    DELIVERY = 'DELIVERY',
}
export interface User {
    id: number;
    extAuthId: string;
    storeId: string | null;
    email: string;
    role: UserRole;
    createdAt: Date
    updatedAt: Date
}

// Signup User
export interface SignupPayload {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
}
export const userApi = {
    signup: async (
        userData: SignupPayload
    ): Promise<ApiResponse<User>> => {
        const response = await axiosInstance.post<ApiResponse<User>>('/users/signup', userData);
        return response.data;
    }
}
