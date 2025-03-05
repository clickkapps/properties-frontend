import AgentHeader from "@/components/agent-dashboard/AgentHeader.tsx";
import Footer from "@/components/website/Footer.tsx";
import {Outlet} from "react-router";
import {useEffect, useState} from "react";
import AgentSideBar from "@/components/agent-dashboard/AgentSideBar.tsx";


function AgentLayout() {
    // <LayoutDashboard size={20}/>
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
                    <AgentSideBar />
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