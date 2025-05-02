import apiClient from "@/api/config.api.ts";

export const apiGetBill = async( payload: { startDate?: string, endDate?: string } ) => {
    return await apiClient.post(`/subscription/bill`, payload).then((response) =>  response.data)
}
here ---------
export const apiPostInitiateSubscription = async( payload: { startDate?: string, endDate?: string, serviceType: string } ) => {
    return await apiClient.post(`/subscription/initiate`, payload).then((response) =>  response.data)
}