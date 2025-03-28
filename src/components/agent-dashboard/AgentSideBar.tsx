import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";
import {agentMenuLinks} from "@/constants/ui.constants.ts";

function AgentSideBar() {

    return (
        <div className="h-screen overflow-y-auto">

            {
                agentMenuLinks.map((link) => {

                    const Icon = link.icon

                    return (
                        <DashboardMenuItem
                            key={link.url}
                            icon={<Icon size={20}/>}
                            title={ link.title }
                            to={link.url}
                        />
                    )
                })
            }

            <div className="h-48"></div>
        </div>
    )
}

export default AgentSideBar;