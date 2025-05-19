import {createContext} from "react";
import {ConfirmDialogContextType} from "@/lib/types";

export const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined)
