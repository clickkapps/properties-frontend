import {createContext} from "react";
import {ConfirmDialogContextType} from "@/lib/types";
import {QueryClient} from "@tanstack/react-query";

export const ConfirmDialogContext = createContext<ConfirmDialogContextType | undefined>(undefined)
