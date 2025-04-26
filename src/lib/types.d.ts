export type MenuLink = {
    title: string;
    icon?: ElementType;
    url: string;
    external: boolean;
    target?: '_blank' | '_top' | '_self'
}

export type ModalHandle = {
    open: () => void;
    close: () => void;
};

export type InnerFormComponent = { clear: () => void }

export type ListingType = {
    id: string
    amount: number
    status: string
    email: string
}

type SignInFormValues = {
    phone: string
};

export interface RegistrationFormInputs {
    firstName: string;
    lastName: string;
    contactEmail: string;
    contactPhone: string;
}

export interface PropertyFormInput extends PropertyModel{
    ownerId?: number,
    mainImage?: File
    otherImages?: File[],
}

export interface PropertyModel {

    id?: number
    propertyCategoryId: number
    offerType: string;
    title: string;
    currency: string;
    amount: number,
    country: string
    region: string
    rooms?: number,
    washrooms?: number,
    description?: string;
    address?: string;
    mainImagePath: string
    published?: boolean
    user: User
    gallery: { id?: number, propertyId?: number, path?: string, caption?: string, createdAt?: string, updatedAt?: string }[],
    specifications?: KeyValue[]

}

export interface AdvertisementFormInputs {
    title: string;
    image: File
    startDate?: Date
    endDate?: Date
    contactPhone: string
    contactEmail: string
}

export type KeyValue = {
    id?: string,
    title: string
    value: unknown
}

export type User = {
    id: number,
    loginId: string,
    firstName?: string,
    lastName?: string,
    photo?: string,
    publicKey?: string,
    contactEmail?: string,
    contactPhone?: string,
    lastLoginAt?: Date,
    currentLoginAt?: Date,
    basicInfoUpdatedAt?: Date,
    createdAt?: Date,
    updatedAt?: Date
    isAdmin?: boolean
}

export type PropertyFilters = {
    country?: string
}