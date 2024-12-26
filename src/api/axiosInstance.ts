import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Define a generic API response type
interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

// Create Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 5000,
});

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        console.error('Axios Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
export type { ApiResponse };
