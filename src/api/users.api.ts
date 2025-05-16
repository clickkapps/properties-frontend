import apiClient from "@/api/config.api.ts";
import {UserFormInputs} from "@/lib/types";

export const apiGetUserInfo = async(uid?: number) => {
    return apiClient.get("/users/basic-info", {
        params: {
            uid: uid,
        }
    }).then((response) =>  response.data)
};

export const apiUpdateUserInfo = async(payload: UserFormInputs ) => {
    await apiClient.put("/users/basic-info", payload,{
        params: {
            uid: payload.uid,
        },
    }).then((response) =>  response.data)
    // fetch user info if there's no error
    return apiGetUserInfo(payload.uid)
};

export const apiUpdateUserEntitlement = async( payload: { entitlement?: string, subscriptionId?: number} ) => {
    await apiClient.put("/users/entitlement", payload).then((response) =>  response.data)
    // fetch user info if there's no error
    return apiGetUserInfo()
};

export const apiAutoCreateUser = async( payload: { contactPhone: string, userFirstName: string, userLastName?: string, contactEmail?: string, role?: string } ) => {
    return await apiClient.post("/users/create", payload).then((response) =>  response.data)
};