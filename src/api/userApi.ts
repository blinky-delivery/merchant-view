import axiosInstance, { ApiResponse } from './axiosInstance';

interface User {
    id: number;
    name: string;
    email: string;
}

// Signup User
interface SignupPayload {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
}

export const signup = async (
    userData: SignupPayload
): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.post<ApiResponse<User>>('/users/signup', userData);
    return response.data;
};
