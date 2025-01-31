import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";
import { TImage } from "./imageApi";

export interface Product {
    id: string;
    name: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    enabled: boolean;
    description: string | null;
    primaryImage: TImage | null;
    menuCategoryId: string;
    price: number;
    sort: number
    taxRate: number | null
    imageId: string | null;
}

interface CreateProductPayload {
    menuCategoryId: string
    name: string
    description: string | null
    price: number
    taxRate: number | null
}

interface UpdateProductPayload {
    productId: string
    menuCategoryId: string
    name: string
    description: string | null,
    price: number
    taxRate: number | null
    primaryImageId: string | null
}

export interface ResortProductsPayload {
    menuCategoryId: string
    newOrder: string[]
}

export const productApi = {
    getProductsByMenuCategory: async (menuCategoryId: string) => {
        return axiosInstance.get<ApiResponse<Product[]>>('/product/menu_category', {
            params: {
                menu_category_id: menuCategoryId
            }
        }).then((resp) => resp.data)
    },
    getProductsByMenu: async (menuId: string) => {
        return axiosInstance.get<ApiResponse<Product[]>>('/product/menu', {
            params: {
                menu_id: menuId
            }
        }).then((resp) => resp.data)
    },
    createProduct: async (payload: CreateProductPayload) => {
        return axiosInstance.post<ApiResponse<Product>>('/product', payload).then((resp) => resp.data)
    },
    resrtProducts: async (payload: ResortProductsPayload) => {
        return axiosInstance.put<ApiResponse<string[]>>('product/sort', payload).then((resp) => resp.data)
    },
    updateProduct: async (payload: UpdateProductPayload) => {
        return axiosInstance.put<ApiResponse<Product>>('product/update', payload).then((resp) => resp.data)
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

export const useProductsByMenu = (menuId: string) => {
    return useQuery<Product[]>({
        queryKey: ['products', menuId],
        queryFn: async () => {
            const resp = await productApi.getProductsByMenu(menuId)
            return resp.data
        }
    })
}