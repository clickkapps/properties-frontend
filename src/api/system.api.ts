import apiClient from "@/api/config.api.ts";

export const apiGetIndexInfo = async() => {
    return apiClient.get("/system/index").then((response) =>  response.data)
};