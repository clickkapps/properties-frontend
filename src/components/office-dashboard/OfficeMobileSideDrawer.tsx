import {
    Drawer,
    DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
} from "@/components/ui/drawer.tsx";
import {useAppDispatch, useAppSelector} from "@/hooks";
import {closeOfficeMobileDrawer, toggleAgentSidebarDrawer} from "@/store/ui-slice.ts";
import {createPortal} from "react-dom";
import { officeMenuLinks} from "@/utils/ui.constants.ts";
import DashboardMenuItem from "@/components/shared-dashboard/DashboardMenuItem.tsx";

function OfficeMobileSideDrawer() {

    const { openOfficeMobileSideDrawer } = useAppSelector((state) => state.ui);
    const dispatch = useAppDispatch();

    return (

        createPortal(
            <Drawer
                handleOnly={false}
                open={openOfficeMobileSideDrawer} onOpenChange={() => dispatch(toggleAgentSidebarDrawer()) }>
                {/*<DrawerTrigger>Open</DrawerTrigger>*/}
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle> </DrawerTitle>
                        <DrawerDescription></DrawerDescription>
                    </DrawerHeader>
                    {
                        officeMenuLinks.map((link) => {

                            const Icon = link.icon

                            return (
                                <DashboardMenuItem
                                    key={link.url}
                                    icon={<Icon size={20}/>}
                                    title={link.title}
                                    to={link.url}
                                    onMenuClicked={ () => dispatch(closeOfficeMobileDrawer())}
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

export default OfficeMobileSideDrawer;
