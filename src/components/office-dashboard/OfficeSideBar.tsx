import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";
import {officeMenuLinks} from "@/constants/ui.constants.ts";

function OfficeSideBar() {

    return (
        <div className="h-screen overflow-y-auto" id="agent-dashboard-sidebar">

            {
                officeMenuLinks.map((link) => {

                    const Icon = link.icon

                    return (
                        <DashboardMenuItem
                            key={link.url}
                            icon={<Icon size={20}/>}
                            title={ link.title }
                            to={link.url}
                            devPhase={link.devPhase}
                        />
                    )
                })
            }

            <div className="h-48"></div>

        </div>
    )
}

export default OfficeSideBar;