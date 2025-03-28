import apiClient from "@/api/config.api.ts";


export const apiLoginWithPhone = async(payload: { phone: string }) => {
    console.log("payload", payload)
    return apiClient.post("/auth/phone", payload).then((response) =>  response.data)
};

export const apiVerifyPhoneOTP = async(payload: { otp: string, serverId: string }) => {
    console.log("payload", payload)
    return apiClient.post("/auth/phone/verify", payload).then((response) =>  response.data)
};