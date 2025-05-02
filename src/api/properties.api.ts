import apiClient from "@/api/config.api.ts";
import {PropertyFilters} from "@/lib/types";

export const apiAddNewProperty = async( formData: FormData, authenticatedUserId: number|undefined  ) => {
    let ownerId: string | number | undefined = formData.get("ownerId")?.toString();
    if (!ownerId) {
        ownerId = authenticatedUserId;
    }
    return await apiClient.post(`/properties?ownerId=${ownerId}`, formData).then((response) =>  response.data)
};

export const apiEditProperty = async( formData: FormData, propertyId?: number ) => {
    return await apiClient.put(`/properties/${propertyId}`, formData).then((response) =>  response.data)
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

export const apiGetPropertyDetail = async( id? : number ) => {
    return await apiClient.get(`/properties/${id}`).then((response) =>  response.data)
}

export const apiDeleteProperty = async( propertyId?: number  ) => {
    return await apiClient.delete(`/properties/${propertyId}`).then((response) =>  response.data)
}

export const apiDeleteSpecification = async( specificationId?: number  ) => {
    return await apiClient.delete(`/properties/specification/${specificationId}`).then((response) =>  response.data)
}

export const apiDeleteOtherImage = async( imageId?: number  ) => {
    return await apiClient.delete(`/properties/other-image/${imageId}`).then((response) =>  response.data)
}

export const apiPublishProperty = async( id?: number  ) => {
    return await apiClient.put(`/properties/publish/${id}`).then((response) =>  response.data)
}

export const apiUnPublishProperty = async( id?: number  ) => {
    return await apiClient.put(`/properties/unpublish/${id}`).then((response) =>  response.data)
}

export const apiPromoteProperty = async( payload: { propertyId: number, subscriptionId: number} ) => {
    return await apiClient.post(`/properties/promote`, payload).then((response) =>  response.data)
}