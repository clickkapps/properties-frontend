import {Button} from "@/components/ui/button.tsx";
import { BellDot } from 'lucide-react';
import { Settings } from 'lucide-react';
import { CircleUser } from 'lucide-react';

function AgentHeader() {
    return (
        <div className="border-b">
            <div className="flex">
                <div id="dashboard-header-title" className="w-[20%] border-r "></div>
                <div className="mr-[7.5%] w-full flex justify-end ">
                    <div id="dashboard-header-actions" className="flex flex-row gap-4 py-2 ">
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

export default AgentHeader;