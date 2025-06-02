import {
    Award,
    BriefcaseConveyorBeltIcon, Camera, EyeIcon,
    House,
    LayoutDashboard, RocketIcon,
    ScrollText,
    UserCog,
    UsersRound, VideoIcon,
    WalletCards
} from "lucide-react";
import {ListingType, MenuLink} from "@/lib/types";

export const websiteMenuLinks: MenuLink[] = [
    {
        title: "For Sale",
        url: "/properties?offerType=sale",
        external: false,
        devPhase: "completed"
    },
    {
        title: "For Rent",
        url: "/properties?offerType=rent",
        external: false,
        devPhase: "completed"
    },
    {
        title: "Agents",
        url: "/agents",
        external: false,
        devPhase: "not_started"
    },
    {
        title: "Blog",
        url: "http://18.119.142.189",
        external: true,
        devPhase: "completed"
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
        icon: LayoutDashboard,
        devPhase: "not_started"
    },
    {
        title: "My Listings",
        url: "/account/agent/listings",
        external: false,
        icon: House,
        devPhase: "completed"
    },
    {
        title: "Advertisements",
        url: "/account/agent/adverts",
        external: false,
        icon: RocketIcon,
        devPhase: "completed"
    },
    {
        title: "Membership",
        url: "/account/agent/membership",
        external: false,
        icon: Award,
        devPhase: "completed"
    },
]

export const officeMenuLinks: MenuLink[] = [
    {
        title: "Dashboard",
        url: "/account/office",
        external: false,
        icon: LayoutDashboard,
        devPhase: "not_started"
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
        icon: House,
        devPhase: "completed"
    },
    {
        title: "Scheduled Viewings",
        url: "/account/office/viewings",
        external: false,
        icon: EyeIcon,
        devPhase: "completed"
    },
    {
        title: "Advertisements",
        url: "/account/office/adverts",
        external: false,
        icon: RocketIcon,
        devPhase: "completed"
    },
    {
        title: "Officers",
        url: "/account/office/admins",
        external: false,
        icon: UserCog,
        devPhase: "not_started"
    },
    {
        title: "Agents",
        url: "/account/office/agents",
        external: false,
        icon: UsersRound,
        devPhase: "not_started"
    },
    {
        title: "Photography",
        url: "/account/office/photography",
        external: false,
        icon: Camera,
        devPhase: "not_started"
    },
    {
        title: "Legal",
        url: "/account/office/legal",
        external: false,
        icon: ScrollText,
        devPhase: "not_started"
    },
    {
        title: "Conveyance",
        url: "/account/office/conveyance",
        external: false,
        icon: BriefcaseConveyorBeltIcon,
        devPhase: "not_started"
    },
    {
        title: "Virtual Tour",
        url: "/account/office/virtual-tour",
        external: false,
        icon: VideoIcon,
        devPhase: "not_started"
    },
    {
        title: "Financials",
        url: "/account/office/financials",
        external: false,
        icon: WalletCards,
        devPhase: "not_started"
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