import {PropertyFormInputs} from "@/lib/types";
import apiClient from "@/api/config.api.ts";
import {appStorage} from "@/lib/storage.ts";

export const apiAddNewProperty = async( payload: PropertyFormInputs ) => {
    const userInfo = appStorage.getUserInfo();
    return await apiClient.post(`/properties?ownerId=${ payload.ownerId || userInfo?.id }`, payload).then((response) =>  response.data)
};

export const apiGetPropertyCategories = async( ) => {
    return await apiClient.get(`/properties/categories`).then((response) =>  response.data.data)
};

