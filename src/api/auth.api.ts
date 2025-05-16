import apiClient from "@/api/config.api.ts";


export const apiLoginWithPhone = async(payload: { phone: string }) => {
    console.log("payload", payload)
    return apiClient.post("/auth/phone", payload).then((response) =>  response.data)
};

export const apiVerifyPhoneOTP = async(payload: { code: string, serverId: string, phone:string }) => {
    console.log("payload", payload)
    return apiClient.post("/auth/phone/verify", payload).then((response) =>  response.data)
};

export const apiLoginWithPassword = async(payload: { loginId: string, password: string }) => {
    return apiClient.post("/auth/password", payload).then((response) =>  response.data)
};