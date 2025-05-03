import apiClient from "@/api/config.api.ts";

export const apiGetPackages = async ( group: "entitlement" | "properties_promotion" | "advertisement" ) => {
    return await apiClient.get(`/packages`, {
        params: {
            group: group,
        }
    }).then((response) =>  response.data.data)
}