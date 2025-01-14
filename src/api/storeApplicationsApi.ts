import axiosInstance, { ApiResponse } from "./axiosInstance"

export interface ApplyForStorePayload {
    name: string
    contactPhone: string
    numberOfSites: number
    storeType: number
    city: number
    address: string
    id_card_front: File
    id_card_back: File
    store_image: File
}

export interface StoreApplication {
    id: string;
    user_id: string;
    store_type_id: number;
    city_id: number;
    name: string;
    contact_phone: string;
    number_of_sites: number;
    address: string;
    id_card_front: string;
    id_card_back: string;
    store_image: string;
    under_review: boolean;
    approved: boolean;
}



export const storeApplicationsApi = {
    applyForStore: async (applicationData: ApplyForStorePayload): Promise<ApiResponse<void>> => {
        console.log(applicationData);
        const formData = new FormData();

        formData.append('name', applicationData.name);
        formData.append('contactPhone', applicationData.contactPhone);
        formData.append('numberOfSites', applicationData.numberOfSites.toString());
        formData.append('storeType', applicationData.storeType.toString());
        formData.append('city', applicationData.city.toString());
        formData.append('address', applicationData.address);

        formData.append('id_card_front', applicationData.id_card_front, applicationData.id_card_front.name);
        formData.append('id_card_back', applicationData.id_card_back, applicationData.id_card_back.name);
        formData.append('store_image', applicationData.store_image, applicationData.store_image.name);

        return axiosInstance.post<ApiResponse<void>>('/store-applications/apply', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(response => response.data);
    },
    getUserApplications: async (): Promise<ApiResponse<StoreApplication[]>> => {
        return axiosInstance.get<ApiResponse<StoreApplication[]>>('/store-applications').then(response => response.data);
    }
}