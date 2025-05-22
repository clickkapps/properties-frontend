import {
    Drawer,
    DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
} from "@/components/ui/drawer.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {closeAgentMobileDrawer, toggleAgentSidebarDrawer} from "@/store/ui-slice.ts";
import {createPortal} from "react-dom";
import {agentMenuLinks} from "@/constants/ui.constants.ts";
import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";

function AgentMobileSideDrawer() {

    const { openAgentMobileSideDrawer } = useAppSelector((state) => state.ui);
    const dispatch = useAppDispatch();

    return (

        createPortal(
            <Drawer
                handleOnly={false}
                open={openAgentMobileSideDrawer} onOpenChange={() => dispatch(toggleAgentSidebarDrawer()) }>
                {/*<DrawerTrigger>Open</DrawerTrigger>*/}
                <DrawerContent className={`bg-white`}>
                    <DrawerHeader>
                        <DrawerTitle> </DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    {
                        agentMenuLinks.map((link) => {

                            const Icon = link.icon

                            return (
                                <DashboardMenuItem
                                    key={link.url}
                                    icon={<Icon size={20}/>}
                                    title={link.title}
                                    to={link.url}
                                    onMenuClicked={ () => dispatch(closeAgentMobileDrawer()) }
                                />
                            )
                        })
                    }
                    <div className="h-8"></div>
                </DrawerContent>
            </Drawer>,
            document.getElementById("root") as HTMLElement,
        )

    )
}

export default AgentMobileSideDrawer;
