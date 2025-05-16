import apiClient from "@/api/config.api.ts";
import {PurchasePackageParams} from "@/lib/types";

export const apiGetPackageBill = async(payload: PurchasePackageParams ) => {
    return await apiClient.post(`/subscription/bill`, payload).then((response) =>  response.data)
}

export const apiPostInitiateSubscription = async( payload: PurchasePackageParams ) => {
    return await apiClient.post(`/subscription/process`, payload).then((response) =>  response.data)
}

export const apiVerifySubscriptionStatus = async( reference: string ) => {
    return await apiClient.get(`/subscription/status/${reference}`).then((response) =>  response.data)
}

export const apiResendPaymentReminder = async( payload: { userId?: number, subscriptionId?: number } ) => {
    return await apiClient.post(`/subscription/reminder`, payload).then((response) =>  response.data)
}