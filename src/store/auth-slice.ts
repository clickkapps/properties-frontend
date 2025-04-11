import {createSlice} from "@reduxjs/toolkit";

const authState: { authToken: string|undefined, userInfo: unknown|undefined} = {
    authToken: undefined,
    userInfo: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        login: (state, action) => {
            state.authToken = action.payload.token || state.authToken;
            state.userInfo = action.payload.userInfo || state.userInfo;
        },
        logout: (state) => {
            state.authToken = undefined
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;