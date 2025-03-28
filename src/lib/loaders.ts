import { LoaderFunctionArgs } from "react-router";


export const accountLoader = ({ request } : LoaderFunctionArgs ) => {
    console.log("request", request);
    // const token =
    // check if this user has a stored token, direct to login page if not

    // check if this user has a stored basic info. direct to register if not

    // check if the basic_info_last_updated at is set. if not direct user to the register page

    // you can make the user data available to the page if everything passes

    return { }
}