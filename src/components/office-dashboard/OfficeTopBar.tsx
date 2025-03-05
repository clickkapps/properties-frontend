import {Button} from "@/components/ui/button.tsx";
import {BellDot, CircleUser, Settings} from "lucide-react";

function OfficeTopBar() {
    return (
        <div className="border-b w-full fixed bg-white z-10 " id="office-top-bar">
            <div className="h-16 md:h-16 "></div>
            <div className="flex ">
                <div className="border-r w-[15%]" id="dashboard-header-title" ></div>
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

export default OfficeTopBar;