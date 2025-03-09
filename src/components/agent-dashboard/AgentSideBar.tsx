import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";
import {Award, LayoutDashboard, Logs, Star} from "lucide-react";
import {useLocation} from "react-router";

function AgentSideBar() {
    const location = useLocation();

    return (
        <>
            <DashboardMenuItem
                icon={<LayoutDashboard size={20}/>}
                title="Dashboard"
                to={"/agent"}
                active={location.pathname === "/agent"}
            />
            <DashboardMenuItem
                icon={<Logs size={20}/>}
                title="My Listings"
                to="/agent/listings"
                active={location.pathname === "/agent/listings"}
            />
            <DashboardMenuItem
                icon={<Star size={20}/>}
                title="Reviews"
                to={"/agent/reviews"}
                active={location.pathname === "/agent/reviews"}
            />
            <DashboardMenuItem
                icon={<Award size={20}/>}
                title="Membership"
                to={"/agent/membership"}
                active={location.pathname === "/agent/membership"}
            />
        </>
    )
}

export default AgentSideBar;