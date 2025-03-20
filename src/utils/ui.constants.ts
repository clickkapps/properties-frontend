import {MenuLink} from "@/types/website.types";
import {Award, LayoutDashboard, Star} from "lucide-react";

export const WebsiteMenuLinks: MenuLink[] = [
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

export const AgentMenuLinks: MenuLink[] = [
    {
        title: "Dashboard",
        url: "/agent",
        external: false,
        icon: LayoutDashboard
    },
    // {
    //     title: "My Listings",
    //     url: "/agent/listings",
    //     external: false,
    //     icon: House
    // },
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