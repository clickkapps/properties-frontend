import {useContext} from "react";
import {ConfirmDialogContext} from "@/contexts/AppContexts.ts";

export const useConfirmDialog = () => {
    const context = useContext(ConfirmDialogContext);
    if (!context) {
        throw new Error("useConfirmDialog must be used within a ConfirmDialogProvider");
    }
    return context;
};