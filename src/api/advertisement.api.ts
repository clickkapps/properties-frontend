import apiClient from "./config.api";

export const apiPostNewAdvertisement = async(payload? : {
    subscriptionId: number,
    startDate: string,
    endDate: string,
    contactPhone: string,
    contactEmail: string,
    link: string,
} ) => {
    return await apiClient.post(`/advertisement/new`, payload).then((response) =>  response.data)
}