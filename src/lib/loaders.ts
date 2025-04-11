import {redirect} from "react-router";
import store from "@/store";
import {login} from "@/store/auth-slice.ts";


// args: { request, params } : LoaderFunctionArgs
export const accountLoader = ( ) => {

    // try as much as possible not to make api call from here --------------
    // fetch from local storage to make things faster, then find other ways of keeping local storage up to date

    const token = localStorage.getItem("accessToken");
    const userInfoString = localStorage.getItem("userInfo");
    // check if this user has a stored token, direct to login page if not
    if (!token) {
        return redirect('/login')
    }

    // check if this user has a stored basic info. direct to register if not
    if(!userInfoString) {
        return redirect('/login');
    }
    const userInfo = JSON.parse(userInfoString);

    // you can make the user data available to the page if everything passes
    const authState = store.getState().auth
    if(!authState.authenticated || !authState.userInfo) {
        store.dispatch(login({ authenticated: true, userInfo  }));
    }

    // check if the basic_info_last_updated at is set. if not direct user to the register page
    if(userInfo.basicInfoUpdatedAt == null) {
        return redirect('/register');
    }

    return userInfo
}

export const registrationLoader = () => {

    const token = localStorage.getItem("accessToken");
    const userInfoString = localStorage.getItem("userInfo");
    if(!token || !userInfoString) {
        return redirect('/login');
    }

    return JSON.parse(userInfoString);

}

export const loginLoader = () => {

    const token = localStorage.getItem("accessToken");
    const userInfoString = localStorage.getItem("userInfo");

    if(userInfoString) {

        const userInfo = JSON.parse(userInfoString);
        if(token && userInfo) {
            if(userInfo.isAdmin) {
                return redirect('/account/office');
            }
            return redirect('/account/agent');

        }
    }

    return true;

}