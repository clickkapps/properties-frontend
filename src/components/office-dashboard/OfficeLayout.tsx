import Footer from "@/components/website/Footer.tsx";
import OfficeHeader from "@/components/office-dashboard/OfficeHeader.tsx";
import {Outlet} from "react-router";
import {useEffect, useState} from "react";
import OfficeSideBar from "@/components/office-dashboard/OfficeSideBar.tsx";

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
                    <OfficeSideBar />
                </div>

                {/* Content */}
                <div className="w-[100%] ml-[15%] ">
                    <div className="h-screen p-[20px]">
                        <Outlet/>
                    </div>
                    {/* Footer */}
                    <Footer collapse={true} className="bg-[#020050]"/>
                </div>

            </div>

        </>
    )
}

export default OfficeLayout