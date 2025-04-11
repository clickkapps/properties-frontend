import {createSlice} from "@reduxjs/toolkit";

const authState: { authenticated: boolean, userInfo: unknown|undefined} = {
    authenticated: false,
    userInfo: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        login: (state, action) => {
            state.authenticated = action.payload.authenticated || state.authenticated;
            state.userInfo = action.payload.userInfo || state.userInfo;
        },
        logout: (state) => {
            state.authenticated = false
            state.userInfo = undefined
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;