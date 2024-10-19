import apiClient from "./apiClient"

export const signupStore = async (data: any) => {
    const resp = await apiClient.post("/stores/signup", data)
    return resp.data
}