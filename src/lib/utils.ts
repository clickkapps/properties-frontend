import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {v4 as uuidv4} from 'uuid';
import { format } from "date-fns"
import {FieldErrors, FieldValues} from "react-hook-form";
import {toast} from "@/hooks/use-toast.ts";
import {AxiosError} from "axios";

const cdnFileAsset = import.meta.env.VITE_CDN_BASE_URL
const environment = import.meta.env.VITE_API_ENV

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAllDigits(str: string): boolean {
  return /^\d+$/.test(str);
}

export function getCdnFile(name?: string): string {
    if (!name) {
        return '';
    }
    return `${cdnFileAsset}/${name}`
}

export function customLog(...values: (string|undefined|object)[]) {
    if(environment === 'DEV') {
      console.log(values)
    }
}

export function quickFormatDate(date: Date | string) {
    return format(date, "LLL dd, y")
}

export function quickFormatDateTime(date: Date | string) {
    return format(date, "LLL dd, y h:mm a")
}

export function getUuid(): string {
    return uuidv4()
}

// Handles any form errors
export const formErrorsHandler = <T extends FieldValues>(errors: FieldErrors<T>) => {
    console.log("errors", errors);

    if (Object.keys(errors).length > 0) {
        const firstErrorKey = Object.keys(errors)[0] as keyof T;
        const firstErrorMessage = errors[firstErrorKey]?.message;

        toast({
            title: "Uh oh! Something went wrong",
            description: firstErrorMessage as string,
            variant: "destructive",
        });
    }
}

export const axiosErrorHandler = (error: Error) => {
    const axiosError = error as AxiosError<{ message: string }>;
    toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong",
        description: axiosError.response?.data?.message || "Sorry! connection failed",
    })
}