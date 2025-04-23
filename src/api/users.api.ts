import apiClient from "@/api/config.api.ts";
import {RegistrationFormInputs} from "@/lib/types";

export const apiGetCurrentUserInfo = async() => {
    return apiClient.get("/users/basic-info").then((response) =>  response.data)
};

export const apiUpdateCurrentUserInfo = async( payload: RegistrationFormInputs ) => {
    await apiClient.put("/users/basic-info", payload).then((response) =>  response.data)
    // fetch user info if there's no error
    return apiGetCurrentUserInfo()
};