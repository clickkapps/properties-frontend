import Footer from "@/components/website/Footer.tsx";
import OfficeHeader from "@/components/office-dashboard/OfficeHeader.tsx";
import {Outlet} from "react-router";
import {useEffect, useState} from "react";
import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";
import {
    BriefcaseConveyorBeltIcon,
    Camera,
    Eye,
    House,
    LayoutDashboard,
    ScrollText,
    SquareCheckBig,
    UserCog,
    UsersRound, Video, WalletCards
} from "lucide-react";

function OfficeLayout() {


    const [headerMargin, setHeaderMargin] = useState(0)

    useEffect(() => {
        const topBarElement = document.getElementById("office-top-bar");
        setHeaderMargin(topBarElement?.offsetHeight || 0);
    }, []);

    return (
        <>
            {/* Header */}
            <OfficeHeader />

            {/* Content with sidebar*/}
            <div className={`w-full`} style={{height: `${headerMargin}px`}}></div>
            <div className="flex flex-row w-full">

                {/* Sidebar */}
                <div  className="w-[15%] border-r h-screen fixed overflow-y-auto" id="agent-dashboard-sidebar" >
                    <DashboardMenuItem
                        icon={<LayoutDashboard size={20}/>}
                        title="Dashboard"
                        to={"/office"}
                        active={location.pathname === "/office"}
                    />
                    <DashboardMenuItem
                        icon={<House size={20}/>}
                        title="Properties"
                        to="/office/properties"
                        active={location.pathname === "/office/properties"}
                    />
                    <DashboardMenuItem
                        icon={<UserCog size={20}/>}
                        title="Officers"
                        to={"/office/admins"}
                        active={location.pathname === "/office/admins"}
                    />
                    <DashboardMenuItem
                        icon={<UsersRound size={20}/>}
                        title="Agents"
                        to={"/office/agents"}
                        active={location.pathname === "/office/agents"}
                    />
                    <DashboardMenuItem
                        icon={<SquareCheckBig size={20}/>}
                        title="Approvals"
                        to={"/office/approvals"}
                        active={location.pathname === "/office/approvals"}
                    />
                    <DashboardMenuItem
                        icon={<Eye size={20}/>}
                        title="Viewings"
                        to={"/office/viewings"}
                        active={location.pathname === "/office/viewings"}
                    />
                    <DashboardMenuItem
                        icon={<Camera size={20}/>}
                        title="Photography"
                        to={"/office/photography"}
                        active={location.pathname === "/office/photography"}
                    />
                    <DashboardMenuItem
                        icon={<ScrollText size={20}/>}
                        title="Legal"
                        to={"/office/legal"}
                        active={location.pathname === "/office/legal"}
                    />
                    <DashboardMenuItem
                        icon={<BriefcaseConveyorBeltIcon size={20}/>}
                        title="Conveyance"
                        to={"/office/conveyance"}
                        active={location.pathname === "/office/conveyance"}
                    />
                    <DashboardMenuItem
                        icon={<Video size={20}/>}
                        title="Virtual Tour"
                        to={"/office/virtual-tour"}
                        active={location.pathname === "/office/virtual-tour"}
                    />
                    <DashboardMenuItem
                        icon={<WalletCards size={20}/>}
                        title="Financials"
                        to={"/office/financials"}
                        active={location.pathname === "/office/financials"}
                    />
                    <div className="h-20"></div>
                </div>

                {/* Content */}
                <div className="w-[100%] ml-[15%] ">
                    <div className="h-screen p-[20px]">
                        <Outlet/>
                    </div>
                    {/* Footer */}
                    {/* bg-[#020050] */}
                    <Footer collapse={true} bgColor='bg-[#020050]'/>
                </div>

            </div>

        </>
    )
}

export default OfficeLayout