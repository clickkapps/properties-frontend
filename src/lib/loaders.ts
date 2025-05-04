import {redirect} from "react-router";
import store from "@/store";
import {updateAuthUser, logout} from "@/store/auth-slice.ts";
import {appStorage} from "@/lib/storage.ts";
import {apiGetCurrentUserInfo} from "@/api/users.api.ts";
import {User} from "@/lib/types";


const initialiseUserInfo = async () => {

    const token = appStorage.getAccessToken();
    // check if this user has a stored token, direct to updateAuthUser page if not
    if (!token) {
        throw new Error("Unauthorized");
    }

    // you can make the user data available to the page if everything passes
    const authState = store.getState().auth

    let userInfo = authState.userInfo

    if(!userInfo) {
        // if there is no userInfo in the state, get it from the server
        const data = await apiGetCurrentUserInfo()
        userInfo = data.data as User
        store.dispatch(updateAuthUser({ userInfo  })); // set userInfo in state
    }

    return userInfo;

}

const revokeAccessToken = () => {
    appStorage.removeAccessToken()
    store.dispatch(logout())
    return redirect('/login');
}

// args: { request, params } : LoaderFunctionArgs
export const accountLoader = async ( ) => {

    try {

        const userInfo = await initialiseUserInfo();

        // check if the basic_info_last_updated at is set. if not direct user to the register page
        if(userInfo.basicInfoUpdatedAt == null || userInfo.role === undefined) {
            return redirect('/register');
        }

        return userInfo

    } catch(error) {
        console.error(error);
        return revokeAccessToken();
    }
}

export const registrationLoader = async () => {

    try {

        return  await initialiseUserInfo();

    }catch(err) {
        console.log("error logging in", err);
        return revokeAccessToken();
    }

}

export const loginLoader = async () => {
    try {
        const userInfo = await initialiseUserInfo();
        if(userInfo) {
            if(userInfo.role === "admin") {
                return redirect('/account/office');
            }
            return redirect('/account/agent');
        }

        return true

    }catch(err) {
        console.log("error logging in", err);
        return true
    }
}