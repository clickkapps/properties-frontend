import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {v4 as uuidv4} from 'uuid';

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

export function getUuid(): string {
    return uuidv4()
}
