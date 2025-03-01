import AgentHeader from "@/components/agent-dashboard/AgentHeader.tsx";
import Footer from "@/components/website/Footer.tsx";
import {Outlet, useLocation} from "react-router";
import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";
import {LayoutDashboard} from "lucide-react";
import { Logs, Star, Award } from 'lucide-react';
import {useEffect, useState} from "react";


function AgentLayout() {
    // <LayoutDashboard size={20}/>
    const location = useLocation();
    const [headerMargin, setHeaderMargin] = useState(0)

    useEffect(() => {
        const topBarElement = document.getElementById("agent-top-bar");
        setHeaderMargin(topBarElement?.offsetHeight || 0);
    }, []);

    return (
        <>
            {/* Header */}
            <AgentHeader/>

            {/* Content with sidebar*/}
            <div className={`w-full`} style={{height: `${headerMargin}px`}}></div>
            <div className="flex flex-row w-full">

                {/* Sidebar */}
                <div  className="w-[15%] border-r h-screen fixed overflow-y-auto" id="agent-dashboard-sidebar" >
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

                </div>

                {/* Content */}
                <div className="w-[100%] ml-[15%] ">
                    <div className="h-screen p-[20px]">
                        <Outlet/>
                    </div>
                    {/* Footer */}
                    <Footer/>
                </div>

            </div>

        </>
    )
}

export default AgentLayout