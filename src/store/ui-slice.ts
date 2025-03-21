import {createSlice} from "@reduxjs/toolkit";

const uiState = { openAgentMobileSideDrawer: false, openOfficeMobileSideDrawer: false };

const uiSlice = createSlice({
    name: "ui",
    initialState: uiState,
    reducers: {
        toggleAgentSidebarDrawer: (state) => {
            state.openAgentMobileSideDrawer = !state.openAgentMobileSideDrawer;
        },
        closeAgentMobileDrawer: (state) => {
            state.openAgentMobileSideDrawer = false;
        },
        toggleOfficeSidebarDrawer: (state) => {
            state.openOfficeMobileSideDrawer = !state.openOfficeMobileSideDrawer;
        },
        closeOfficeMobileDrawer: (state) => {
            state.openOfficeMobileSideDrawer = false;
        }
    }
})

export const {
    toggleAgentSidebarDrawer,
    closeAgentMobileDrawer,
    toggleOfficeSidebarDrawer,
    closeOfficeMobileDrawer
} = uiSlice.actions;
export default uiSlice.reducer;