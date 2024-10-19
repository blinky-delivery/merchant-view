import apiClient from "./apiClient"

export type SignupStoreDto = {
    storeName: string
    storePhoneNumber: string
    storeCity: number
    storeTypeId: number
    loginEmail: string
    loginPassword: string
}

export const signupStore = (data: SignupStoreDto) => {
    return apiClient.post("/stores/signup", data)
}