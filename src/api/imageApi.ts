import { useQuery } from "@tanstack/react-query";
import axiosInstance, { ApiResponse } from "./axiosInstance";

export enum ImageType {
    STORE_LOGO = 'STORE_LOGO',
    STORE_HEADER = 'STORE_HEADER',
    ITEM_PHOTO = 'ITEM_PHOTO'
}

export enum ImageStatus {
    REVIEW = 'REVIEW',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    ARCHIVED = 'ARCHIVED',
}

export interface TImage {
    id: string;
    storeId: string;
    createdAt: Date;
    updatedAt: Date;
    storeSiteId: string | null;
    status: ImageStatus;
    publishedAt: Date | null;
    fileId: string;
    productId: string | null;
    type: ImageType;
}


export interface GetImagesParams {
    storeId: string
    type: ImageType
    status: ImageStatus
}

export interface UploadImageFormData {
    storeId: string
    type: ImageType
    file: File
    storeSiteId: string | null
    productId: string | null

}

export const imageApi = {
    getStoreImages: async ({ storeId, type, status }: GetImagesParams) => {
        return axiosInstance.get<ApiResponse<TImage[]>>('/image', {
            params: {
                store_id: storeId,
                type: type,
                status: status
            }
        }).then((resp) => resp.data)
    },
    uploadImage: async ({ storeId, storeSiteId, type, file, productId }: UploadImageFormData) => {
        const formData = new FormData();
        formData.append('storeId', storeId)
        formData.append('type', type)
        formData.append('file', file, file.name)
        if (storeSiteId)
            formData.append('storeSiteId', storeSiteId)
        if (productId)
            formData.append('productId', productId)

        return axiosInstance.post<ApiResponse<TImage>>('/image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((resp) => resp.data)
    }
}

export const useStoreImages = (
    storeId: string,
    type: ImageType,
    status: ImageStatus,
) => {
    return useQuery<TImage[]>({
        queryKey: ['images', storeId, type, status],
        queryFn: async () => {
            const resp = await imageApi.getStoreImages({ storeId, status, type })
            return resp.data
        }
    })
}
