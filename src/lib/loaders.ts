import {redirect} from "react-router";
import store from "@/store";
import {login} from "@/store/auth-slice.ts";
import {appStorage} from "@/lib/storage.ts";


// args: { request, params } : LoaderFunctionArgs
export const accountLoader = ( ) => {

    // try as much as possible not to make api call from here --------------
    // fetch from local storage to make things faster, then find other ways of keeping local storage up to date

    const token = appStorage.getAccessToken();
    const userInfo = appStorage.getUserInfo()
    // check if this user has a stored token, direct to login page if not
    if (!token) {
        return redirect('/login')
    }

    // check if this user has a stored basic info. direct to register if not
    if(!userInfo) {
        return redirect('/login');
    }

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

    const token = appStorage.getAccessToken();
    const userInfo = appStorage.getUserInfo();
    if(!token || !userInfo) {
        return redirect('/login');
    }

    return userInfo;

}

export const loginLoader = () => {

    const token = appStorage.getAccessToken();
    const userInfo = appStorage.getUserInfo();

    if(userInfo) {

        if(token && userInfo) {
            if(userInfo.isAdmin) {
                return redirect('/account/office');
            }
            return redirect('/account/agent');

        }
    }

    return true;

}