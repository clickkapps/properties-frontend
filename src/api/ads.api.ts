import apiClient from "@/api/config.api.ts";

export const apiPostNewAd = async (formData: FormData) => {
    return await apiClient.post(`/advertisements/new`, formData).then((response) =>  response.data)
}

export const apiFetchUserAds = async () => {
    return await apiClient.get(`/advertisements`).then((response) =>  response.data.data)
}

export const apiFetchPublicAds = async () => {
    return await apiClient.get(`/advertisements/public`).then((response) =>  response.data.data)
}