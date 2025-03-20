import {createSlice} from "@reduxjs/toolkit";

const authState = { authenticated: false };

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        login: () => {
        },
        logout: () => {
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;