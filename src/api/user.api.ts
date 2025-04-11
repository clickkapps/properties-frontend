import apiClient from "@/api/config.api.ts";

export const apiGetCurrentUserInfo = async() => {
    return apiClient.get("/users/basic-info").then((response) =>  response.data)
};