import {createSlice} from "@reduxjs/toolkit";

const uiState = {
    openAgentMobileSideDrawer: false,
    openOfficeMobileSideDrawer: false,
    subscriptionDialogState: {
        option: "all",
        open: false
    },
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
        toggleSubscriptionDialog: (state, { payload }) => {
            state.subscriptionDialogState = {
                open: !state.subscriptionDialogState.open,
                option: payload?.option || state.subscriptionDialogState.option,
            };
        },
        onCloseSubscriptionDialog: (state, { payload }) => {
            state.subscriptionDialogState = {
                open: false,
                option: payload?.option || state.subscriptionDialogState.option,
            };
        },
        onOpenSubscriptionDialog: (state, { payload }) => {
            state.subscriptionDialogState = {
                open: false,
                option: payload?.option || state.subscriptionDialogState.option,
            };
        },
    }
})

export const {
    toggleAgentSidebarDrawer,
    closeAgentMobileDrawer,
    toggleOfficeSidebarDrawer,
    closeOfficeMobileDrawer,
    toggleSubscriptionDialog,
    onCloseSubscriptionDialog,
    onOpenSubscriptionDialog,
} = uiSlice.actions;
export default uiSlice.reducer;