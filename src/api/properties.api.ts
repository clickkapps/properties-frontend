import apiClient from "@/api/config.api.ts";
import {PropertyFilters, PropertyModel} from "@/lib/types";

export const apiAddNewProperty = async( formData: FormData, authenticatedUserId: number|undefined  ) => {
    let ownerId: string | number | undefined = formData.get("ownerId")?.toString();
    if (!ownerId) {
        ownerId = authenticatedUserId;
    }
    return await apiClient.post(`/properties?ownerId=${ownerId}`, formData).then((response) =>  response.data)
};

export const apiEditProperty = async( formData: FormData, userId?: number  ) => {
    return await apiClient.put(`/properties/${userId}`, formData).then((response) =>  response.data)
};

export const apiGetPropertyCategories = async( ) => {
    return await apiClient.get(`/properties/categories`).then((response) =>  response.data.data)
};

export const apiGetProperties = async({ userId, filters }: { userId?: number, filters?: PropertyFilters} ) => {
    return await apiClient.get(`/properties`, {
        params: {
            userId,
            ...filters
        }
    }).then((response) =>  response.data.data)
}

export const apiGetPropertyDetail = async( payload : PropertyModel ) => {
    return await apiClient.get(`/properties/${payload.id}`).then((response) =>  response.data)
}