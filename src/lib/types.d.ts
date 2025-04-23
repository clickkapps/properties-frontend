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

export interface PropertyFormInputs {
    propertyCategoryId: number
    offerType: string;
    title: string;
    description?: string;
    ownerId?: number,
    currency: string;
    price: number,
    rooms: number,
    bathrooms: number,
    mainImage: File
    otherImages: File[],
    country: string
    region: string
    address: string;
    specifications: { title: string; value: string; }[]
}

export type KeyValue = {
    id?: string,
    key: string
    value: unknown
}

export type User = {
    id: string,
    loginId: string,
    firstName?: string,
    lastName?: string,
    photo?: string,
    publicKey?: string,
    contactEmail?: string,
    contactPhone?: string,
    lastLoginAt?: string,
    currentLoginAt?: string,
    basicInfoUpdatedAt?: string,
    createdAt?: Date,
    updatedAt?: Date
    isAdmin?: boolean
}