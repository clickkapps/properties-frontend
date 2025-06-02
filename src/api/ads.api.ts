import apiClient from "@/api/config.api.ts";

export const apiPostNewAd = async (formData: FormData) => {
    return await apiClient.post(`/advertisements/new`, formData).then((response) =>  response.data)
}

export const apiFetchUserAds = async (userId?: number) => {
    return await apiClient.get(`/advertisements`, {
        params: {
            userId: userId,
        }
    }).then((response) =>  response.data.data)
}

export const apiFetchPublicAds = async () => {
    return await apiClient.get(`/advertisements/public`).then((response) =>  response.data.data)
}

// use to set add to ["approve", "inactive"]
export const apiPublishAdToWebsite = async (adId: number, status: string) => {
    return await apiClient.get(`/advertisements/publish/${adId}`, {
        params: {
            status: status,
        }
    }).then((response) =>  response.data.data)
}