// import Footer from "@/components/website/Footer.tsx";
import OfficeHeader from "@/components/office-dashboard/OfficeHeader.tsx";
import {Outlet} from "react-router";
import {useEffect, useState} from "react";
import OfficeSideBar from "@/components/office-dashboard/OfficeSideBar.tsx";
import OfficeMobileSideDrawer from "@/components/office-dashboard/OfficeMobileSideDrawer.tsx";

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
                <div className="w-[15%] border-r fixed">
                    <div className="hidden md:block ">
                        <OfficeSideBar/>
                    </div>
                    <div className="block md:hidden">
                        <OfficeMobileSideDrawer/>
                    </div>
                </div>


                {/* Content */}
                <div className="w-[100%] md:ml-[15%] ">
                    <div className="px-5 py-4 md:px-14 md:py-10">
                        <Outlet/>
                    </div>
                    {/* Footer */}
                    {/* bg-[#020050] */}
                    {/*<Footer collapse={true} bgColor='bg-[#020050]'/>*/}
                </div>

            </div>

        </>
    )
}

export default OfficeLayout