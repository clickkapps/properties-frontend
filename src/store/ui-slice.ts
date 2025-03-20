import {createSlice} from "@reduxjs/toolkit";

const uiState = { openDrawer: false };

const uiSlice = createSlice({
    name: "ui",
    initialState: uiState,
    reducers: {
        toggleAgentSidebarDrawer: (state) => {
            state.openDrawer = !state.openDrawer;
        },
        closeDrawer: (state) => {
            state.openDrawer = false;
        }
    }
})

export const { toggleAgentSidebarDrawer, closeDrawer } = uiSlice.actions;
export default uiSlice.reducer;