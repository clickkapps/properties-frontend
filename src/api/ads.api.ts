import apiClient from "@/api/config.api.ts";

export const apiPostNewAd = async (formData: FormData) => {
    return await apiClient.post(`/ads`, formData).then((response) =>  response.data)
}