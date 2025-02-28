import AgentNavbar from "@/components/agent-dashboard/AgentNavbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import {Outlet} from "react-router";
import AgentHeader from "@/components/agent-dashboard/AgentHeader.tsx";
import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";

function AgentLayout() {
    return (
        <div>
            <AgentNavbar/>
            <div className="h-16 md:h-16 "></div>
            <AgentHeader/>
            <div className="flex">
                <div id="dashboard-header-title" className="w-[20%] border-r h-screen">
                    <DashboardMenuItem title="Dashboard" selected={true} />
                    <DashboardMenuItem title="My Listings" />
                    <DashboardMenuItem title="Reviews" />
                    <DashboardMenuItem title="Membership" />
                </div>
                <div className="mr-[7.5%] w-full">
                    <Outlet/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AgentLayout