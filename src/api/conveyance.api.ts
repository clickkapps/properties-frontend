import { ConveyanceFormInput } from "@/lib/types";
import { apiAutoCreateUser, apiUpdateUserInfo } from "./users.api";
import { apiPostInitiateSubscription } from "./subscription.api";
import apiClient from "./config.api";

export const apiCreateNewConveyance = async( payload: ConveyanceFormInput ) => {

  // we need to create user out of the user details
  const { data: user} = await apiAutoCreateUser({
    userFirstName: payload.clientName,
    userLastName: "",
    contactEmail: "",
    contactPhone: payload.customerContactPhone,
  })

  // we need to create a subscription
    const { data: sub } = await apiPostInitiateSubscription({
        propertyId: payload.propertyId,
        userId: user.id,
        packageSlug: "conveyance_request"
    })

    // create conveyance record based on userId and subId
    return await apiClient.post(`/conveyances`, {
        userId: user.id,
        subscriptionId: sub.subscriptionId,
        clientCurrentLocation: payload.clientCurrentLocation,
        clientNewLocation: payload.clientNewLocation,
        description: payload.description,
        conveyanceDate: payload.conveyanceDate,
    }).then((response) =>  response.data)
}

export const apiUpdateConveyance = async( payload: ConveyanceFormInput ) => {

    console.log("apiUpdateConveyance=> ", payload)
    if(!payload.userId) {
        throw new Error("Invalid user")
    }

    // in this scenario we have to update customer details as well
    await apiUpdateUserInfo({
        firstName: payload.clientName,
        lastName: "",
        contactEmail: "",
        contactPhone: payload.customerContactPhone,
        uid: payload.userId
    })

    return await apiClient.put(`/conveyances/${payload.id}`, {
        propertyId: payload.propertyId,
        clientCurrentLocation: payload.clientCurrentLocation,
        clientNewLocation: payload.clientNewLocation,
        conveyanceDate: payload.conveyanceDate,
        description: payload.description,
    }).then((response) =>  response.data)

}

export const apiDeleteConveyance = async( id: number|undefined ) => {
    return await apiClient.delete(`/conveyances/${id}`).then((response) =>  response.data)
}

export const apiGetConveyances = async( payload: {  status: string, period?: { fromDate?: string, toDate?: string }, limit?: number, offset?: number} ) => {
    return await apiClient.get(`/conveyances`, {
        params: {
            status: payload.status,
            period: payload.period,
            // limit and offset for pagination
            limit: payload.limit,
            offset: payload.offset,
        },
    }).then((response) =>  response.data.data)
}


export const apiCountGetConveyances = async( payload: {  status: string, period?: { fromDate?: string, toDate?: string } } ) => {
    return await apiClient.get(`/conveyances/count`, {
        params: {
            status: payload.status,
            period: payload.period,
        },
    }).then((response) =>  response.data.data)
}


export const apiUpdateCOnveyanceStatus = async( payload: { id?: number, status: "pending" | "completed" | "cancelled"} ) => {
    return await apiClient.put(`/conveyances/status/${payload.id}`, {
        status: payload.status,
    }).then((response) =>  response.data)
}