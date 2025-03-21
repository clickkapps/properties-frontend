import {ListingType, MenuLink} from "@/types/ui.types";
import {
    Award,
    BriefcaseConveyorBeltIcon, Camera, EyeIcon,
    House,
    LayoutDashboard,
    ScrollText, SquareCheckBigIcon,
    Star,
    UserCog,
    UsersRound, VideoIcon,
    WalletCards
} from "lucide-react";

export const websiteMenuLinks: MenuLink[] = [
    {
        title: "For Sale",
        url: "/properties/sale",
        external: false
    },
    {
        title: "For Rent",
        url: "/properties/rent",
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
]

export const agentMenuLinks: MenuLink[] = [
    {
        title: "Dashboard",
        url: "/agent",
        external: false,
        icon: LayoutDashboard
    },
    {
        title: "My Listings",
        url: "/agent/listings",
        external: false,
        icon: House
    },
    {
        title: "Reviews",
        url: "/agent/reviews",
        external: false,
        icon: Star
    },
    {
        title: "Membership",
        url: "/agent/membership",
        external: false,
        icon: Award
    },
]

export const officeMenuLinks: MenuLink[] = [
    {
        title: "Dashboard",
        url: "/office",
        external: false,
        icon: LayoutDashboard
    },
    {
        title: "Properties",
        url: "/office/properties",
        external: false,
        icon: House
    },
    {
        title: "Officers",
        url: "/office/admins",
        external: false,
        icon: UserCog
    },
    {
        title: "Agents",
        url: "/office/agents",
        external: false,
        icon: UsersRound
    },
    {
        title: "Approvals",
        url: "/office/approvals",
        external: false,
        icon: SquareCheckBigIcon
    },
    {
        title: "Viewings",
        url: "/office/viewings",
        external: false,
        icon: EyeIcon
    },
    {
        title: "Photography",
        url: "/office/photography",
        external: false,
        icon: Camera
    },
    {
        title: "Legal",
        url: "/office/legal",
        external: false,
        icon: ScrollText
    },
    {
        title: "Conveyance",
        url: "/office/conveyance",
        external: false,
        icon: BriefcaseConveyorBeltIcon
    },
    {
        title: "Virtual Tour",
        url: "/office/virtual-tour",
        external: false,
        icon: VideoIcon
    },
    {
        title: "Financials",
        url: "/office/financials",
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