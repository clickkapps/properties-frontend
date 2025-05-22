import {Button} from "@/components/ui/button.tsx";
import {BellDot, Ellipsis} from 'lucide-react';
import { Settings } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import {useDispatch} from "react-redux";
import {toggleAgentSidebarDrawer} from "@/store/ui-slice.ts";
import {useAppSelector} from "@/hooks";

function AgentTopBar() {

    const dispatch = useDispatch();
    const currentUser = useAppSelector(state => state.auth);

    return (
        <div className="border-b w-full fixed bg-white z-20" id="agent-top-bar">
            <div className="h-16 md:h-16 "></div>
            <div className="flex ">
                <div className="border-r w-[15%] flex justify-center items-center" id="dashboard-header-title" >
                    <Ellipsis className="md:hidden"  onClick={() => {
                        dispatch(toggleAgentSidebarDrawer())
                    }} />
                </div>
                <div className="w-[85%] flex justify-end ">
                    <div className="flex flex-row items-center gap-4 py-2 mr-[7%]" id="dashboard-header-actions">

                        <div> {currentUser.userInfo?.firstName} {currentUser.userInfo?.lastName} </div>
                        <Button variant="ghost" size="icon">
                            <CircleUser/>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Settings/>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <BellDot/>
                        </Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentTopBar;