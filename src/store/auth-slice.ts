import {createSlice} from "@reduxjs/toolkit";
import {User} from "@/lib/types";

const authState: { userInfo: User|undefined} = {
    userInfo: undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        login: (state, action) => {
            state.userInfo = action.payload.userInfo || state.userInfo;
        },
        logout: (state) => {
            state.userInfo = undefined
        },
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;