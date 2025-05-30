import {
    Award,
    BriefcaseConveyorBeltIcon, Camera, EyeIcon,
    House,
    LayoutDashboard,
    ScrollText,
    Star,
    UserCog,
    UsersRound, VideoIcon,
    WalletCards
} from "lucide-react";
import {ListingType, MenuLink} from "@/lib/types";

export const websiteMenuLinks: MenuLink[] = [
    {
        title: "For Sale",
        url: "/properties?offerType=sale",
        external: false
    },
    {
        title: "For Rent",
        url: "/properties?offerType=rent",
        external: false
    },
    {
        title: "Agents",
        url: "/agents",
        external: false
    },
    {
        title: "Blog",
        url: "http://18.119.142.189",
        external: true
    },
    // {
    //     title: "Back Office (Temporal)",
    //     url: "/account/office",
    //     external: false
    // },
]

export const agentMenuLinks: MenuLink[] = [
    {
        title: "Dashboard",
        url: "/account/agent",
        external: false,
        icon: LayoutDashboard
    },
    {
        title: "My Listings",
        url: "/account/agent/listings",
        external: false,
        icon: House
    },
    {
        title: "Advertisements",
        url: "/account/agent/adverts",
        external: false,
        icon: Star
    },
    {
        title: "Membership",
        url: "/account/agent/membership",
        external: false,
        icon: Award
    },
]

export const officeMenuLinks: MenuLink[] = [
    {
        title: "Dashboard",
        url: "/account/office",
        external: false,
        icon: LayoutDashboard
    },
    // {
    //     title: "Properties",
    //     url: "/account/office/properties",
    //     external: false,
    //     icon: House
    // },
    {
        title: "Properties",
        url: "/account/office/approvals",
        external: false,
        icon: House
    },
    {
        title: "Scheduled Viewings",
        url: "/account/office/viewings",
        external: false,
        icon: EyeIcon
    },
    {
        title: "Officers",
        url: "/account/office/admins",
        external: false,
        icon: UserCog
    },
    {
        title: "Agents",
        url: "/account/office/agents",
        external: false,
        icon: UsersRound
    },
    {
        title: "Photography",
        url: "/account/office/photography",
        external: false,
        icon: Camera
    },
    {
        title: "Legal",
        url: "/account/office/legal",
        external: false,
        icon: ScrollText
    },
    {
        title: "Conveyance",
        url: "/account/office/conveyance",
        external: false,
        icon: BriefcaseConveyorBeltIcon
    },
    {
        title: "Virtual Tour",
        url: "/account/office/virtual-tour",
        external: false,
        icon: VideoIcon
    },
    {
        title: "Financials",
        url: "/account/office/financials",
        external: false,
        icon: WalletCards
    },
]

export const payments: ListingType[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "5 Bedroom apartment",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "2 Bedroom apartment",
        email: "example@gmail.com",
    },
    // ...
]

export const ghRegions = [
    "Greater Accra",
    "Ashanti",
    "Bono East",
    "Central",
    "Eastern",
    "Northern",
    "Savannah",
    "Oti",
    "Ahafo",
    "Upper East",
    "Upper West",
    "Western",
    "Western North",
    "Volta",
    "North East",
]