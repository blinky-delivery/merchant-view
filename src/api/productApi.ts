import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";

export interface Product {
    id: string;
    name: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    description: string | null;
    menuCategoryId: string;
    price: number;
    imageId: string | null;
}

interface CreateProductPayload {
    menuCategoryId: string
    name: string
    description: string | null
    price: number
    taxRate: number | null
}

export const productApi = {
    getProductsByMenuCategory: async (menuCategoryId: string) => {
        return axiosInstance.get<ApiResponse<Product[]>>('/product/menu_category', {
            params: {
                menu_category_id: menuCategoryId
            }
        }).then((resp) => resp.data)
    },
    createProduct: async (payload: CreateProductPayload) => {
        return axiosInstance.post<ApiResponse<Product>>('/product', payload).then((resp) => resp.data)
    }
}

export const useProductsByCategory = (menuCategoryId: string) => {
    return useQuery<Product[]>({
        queryKey: ['products', menuCategoryId],
        queryFn: async () => {
            const resp = await productApi.getProductsByMenuCategory(menuCategoryId)
            return resp.data
        }
    })
}