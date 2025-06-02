import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {v4 as uuidv4} from 'uuid';
import { format } from "date-fns"
import {FieldErrors, FieldValues} from "react-hook-form";
import {toast} from "@/hooks/use-toast.ts";
import {AxiosError} from "axios";
import {User} from "@/lib/types";

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

export function quickFormatDate(date?: Date | string) {
    if(!date) {
        return date
    }
    return format(date, "LLL dd, y")
}

export function quickFormatDateTime(date?: Date | string) {
    if(!date) {
        return date
    }
    return format(date, "LLL dd, y h:mm a")
}

export function formatCurrency(amount: number, currency: string = 'GHS', locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
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

// you can create all your permission helpers here
// my rule for permissions in the application is, its always true util its changed to false

// method naming convention: verbActionSubject
const checkIfUserCannot = (action: string,  subject: string, user?: User,  verb = "cannot") => {

    if(!user) { return  false; }

    // true until proven false
    let allowed = true;

    // checking if user cannot upPublish property
    const cannotDo = (user.permissions || []).findIndex(
        p => p.verb === verb && p.action == action && p.subject === subject
    )

    if(cannotDo > -1) {
        allowed = false;
    }

    return allowed
}

export const canPublishProperties = (user?: User) => {
    return checkIfUserCannot("publish", "properties", user)
}

export const canUnpublishProperties = (user?: User) => {
    return checkIfUserCannot("unpublish", "properties", user)
}

export const canPublishAds = (user?: User) => {
    return checkIfUserCannot("publish", "advertisements", user)
}

export const canCreateAds = (user?: User) => {
    return checkIfUserCannot("create", "advertisements", user)
}
