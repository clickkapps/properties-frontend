export type MenuLink = {
    title: string;
    icon?: ElementType;
    url: string;
    external: boolean;
    target?: '_blank' | '_top' | '_self'
}

export type ModalHandle = {
    open: (data?: T) => void;
    close: () => void;
};

export type TableUpdateReq<T> = {
    add: (row: T) => void;
    update: (row: T) => void;
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
    firstName?: string;
    lastName?: string;
    contactEmail?: string;
    contactPhone?: string;
    companyName?: string;
    companyLocation?: string;
    role?: string,
}

export interface UserFormInputs extends RegistrationFormInputs {
    uid?: number
}

export interface PropertyFormInput extends PropertyModel{
    ownerId?: number,
    mainImage?: File
    otherImages?: File[],
}

export interface PropertyModel {

    id?: number
    categoryId: number
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
    promoted?: boolean

}

export interface AdvertisementFormInputs {
    image?: File
    contactPhone?: string
    contactEmail?: string
    link?: string
}

export type KeyValue = {
    id?: number,
    localId?: string,
    title: string
    value: unknown
}

export type User = {
    id: number,
    loginId: string,
    role?: string
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
    activeEntitlement: Entitlement
}

export type Entitlement = {
    entitlement: "basic" | "standard",
    entitlementAmountPaid?: string,
    currency?: string,
    createdAt?: Date,
    updatedAt?: Date,
    status?: string
}

export type PropertyFilters = {
    country?: string,
    published?: boolean,
    categoryId?: number,
    offerType?: string,
    rooms?: number,
    washrooms?: number,
    price?: number,
    sortBy?: string,
    sortOrder?: string,
    search?: string,
}

export type ConfirmDialogOptions = {
    title?: string;
    description?: string;
    onConfirm?: () => void;
    showOnCancel?: boolean;
};

export type ConfirmDialogContextType = {
    showConfirmDialog: (options: ConfirmDialogOptions) => void;
};

export type PackageModel = {
    slug?: string,
    name?: string,
    group?:"entitlements" | "properties_promotion" | "advertisement",
    frequency?: "daily" | "one_time",
    description?: string,
    price?: number,
    currency?: string,
}

export type PackageUIConstants = {
    uiTitle?:string,
    slug?: string,
    uiFeatureList?: string[],
    uiColor?: string
}

export type PurchasePackageParams = {
    userId?: number,
    propertyId?: number,
    startDate?: string,
    endDate?: string,
    packageSlug?: "basic_package" | "standard_package" | "properties_promotion" | "advertisement" | "property_showing"
}

export type AdvertisementModel = {
    id: number,
    status: "pending" | "approved" | "active" | "inactive",
    startFrom: string,
    endAt: string,
    contactPhone: string,
    contactEmail?: string,
    imagePath: string,
    link?: string,
    createdAt?: string,
}

export type SubscriptionModel = {
    id: number,
    status?: "pending" | "success",
    userId: number
    user: User
    amountPayable?: string
    amountPaid?: string
    startDate?: string
    endDate?: string
    serviceType?: string

}

export type ShowingModel = {
    id?: number,
    user?: User
    property?: PropertyModel
    subscription?: SubscriptionModel
    createdAt?: string
    appointmentDate: string
    status?: "pending" | "completed" | "cancelled"
}

export type ShowingFormInput = {
    id?: number,
    customerFirstName: string,
    customerLastName?: string,
    customerContactPhone: string,
    customerContactEmail?: string,
    propertyId?: number,
    appointmentDate: string
    userId?: number,
    subscriptionId?: number,
}