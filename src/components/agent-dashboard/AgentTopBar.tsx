import {Button} from "@/components/ui/button.tsx";
import {BellDot, Ellipsis} from 'lucide-react';
import { Settings } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import {useDispatch} from "react-redux";
import {toggleAgentSidebarDrawer} from "@/store/ui-slice.ts";

function AgentTopBar() {

    const dispatch = useDispatch();

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
                    <div className="flex flex-row gap-4 py-2 mr-[7%]" id="dashboard-header-actions" >
                        <Button variant="ghost" size="icon">
                            <Settings/>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <BellDot/>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <CircleUser/>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AgentTopBar;