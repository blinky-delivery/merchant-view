import axiosInstance, { ApiResponse } from './axiosInstance';

interface User {
    id: number;
    name: string;
    email: string;
}

// Fetch Users
export const getUsers = async (): Promise<ApiResponse<User[]>> => {
    const response = await axiosInstance.get<ApiResponse<User[]>>('/users');
    return response.data;
};

// Create User
interface CreateUserPayload {
    name: string;
    email: string;
}

export const createUser = async (
    userData: CreateUserPayload
): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.post<ApiResponse<User>>('/users', userData);
    return response.data;
};
