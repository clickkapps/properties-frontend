import apiClient from "@/api/config.api.ts";
import {apiAutoCreateUser, apiUpdateUserInfo} from "@/api/users.api.ts";
import {apiPostInitiateSubscription} from "@/api/subscription.api.ts";
import {ShowingFormInput} from "@/lib/types";

export const apiCreateNewShowing = async( payload: ShowingFormInput ) => {

    // we need to create user out of the user details
    const { data: user } = await apiAutoCreateUser({
        userFirstName: payload.customerFirstName,
        userLastName: payload.customerLastName,
        contactEmail: payload.customerContactEmail,
        contactPhone: payload.customerContactPhone
    })

    // we need to create a subscription
    const { data: sub } = await apiPostInitiateSubscription({
        propertyId: payload.propertyId,
        userId: user.id,
        packageSlug: "property_showing"
    })

    // create showing record based on userId and subId
    return await apiClient.post(`/showings`, {
        userId: user.id,
        subscriptionId: sub.subscriptionId,
        propertyId: payload.propertyId,
        appointmentDate: payload.appointmentDate,
    }).then((response) =>  response.data)
}

export const apiUpdateShowing = async( payload: ShowingFormInput ) => {

    console.log("apiUpdateShowing => ", payload)
    if(!payload.userId) {
        throw new Error("Invalid user")
    }

    // in this scenario we have to update customer details as well
    await apiUpdateUserInfo({
        firstName: payload.customerFirstName,
        lastName: payload.customerLastName,
        contactEmail: payload.customerContactEmail,
        contactPhone: payload.customerContactPhone,
        uid: payload.userId
    })

    return await apiClient.put(`/showings/${payload.id}`, {
        propertyId: payload.propertyId,
        appointmentDate: payload.appointmentDate,
    }).then((response) =>  response.data)

}

export const apiDeleteShowing = async( id: number|undefined ) => {
    return await apiClient.delete(`/showings/${id}`).then((response) =>  response.data)
}

export const apiGetShowings = async( payload: {  status: string, period?: { fromDate?: string, toDate?: string }, limit?: number, offset?: number} ) => {
    return await apiClient.get(`/showings`, {
        params: {
            status: payload.status,
            period: payload.period,
            // limit and offset for pagination
            limit: payload.limit,
            offset: payload.offset,
        },
    }).then((response) =>  response.data.data)
}


export const apiCountGetShowings = async( payload: {  status: string, period?: { fromDate?: string, toDate?: string } } ) => {
    return await apiClient.get(`/showings/count`, {
        params: {
            status: payload.status,
            period: payload.period,
        },
    }).then((response) =>  response.data.data)
}


export const apiUpdateShowingStatus = async( payload: { id?: number, status: "pending" | "completed" | "cancelled"} ) => {
    return await apiClient.put(`/showings/status/${payload.id}`, {
        status: payload.status,
    }).then((response) =>  response.data)
}
