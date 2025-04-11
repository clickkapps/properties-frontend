import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
const cdnFileAsset = import.meta.env.VITE_CDN_BASE_URL
const environment = import.meta.env.VITE_API_ENV

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isAllDigits(str: string): boolean {
  return /^\d+$/.test(str);
}

export function getCdnFile(name: string): string {
  const path = `${cdnFileAsset}/${name}`
  customLog("getCdnFile", path)
  return path
}

export function customLog(...values: (string|undefined|object)[]) {
    if(environment === 'DEV') {
      console.log(values)
    }
}