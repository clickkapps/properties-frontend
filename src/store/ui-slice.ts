import {createSlice} from "@reduxjs/toolkit";

const uiState = {
    openAgentMobileSideDrawer: false,
    openOfficeMobileSideDrawer: false,
    openSubscriptionDialog: false,
};

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
        },
        toggleSubscriptionDialog: (state) => {
            state.openSubscriptionDialog = !state.openSubscriptionDialog;
        },
        closeSubscriptionDialog: (state) => {
            state.openSubscriptionDialog = false;
        },
    }
})

export const {
    toggleAgentSidebarDrawer,
    closeAgentMobileDrawer,
    toggleOfficeSidebarDrawer,
    closeOfficeMobileDrawer,
    toggleSubscriptionDialog,
    closeSubscriptionDialog
} = uiSlice.actions;
export default uiSlice.reducer;