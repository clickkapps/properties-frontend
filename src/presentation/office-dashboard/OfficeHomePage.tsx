import TotalPropertiesCard from "@/components/agent-dashboard/TotalPropertiesCard"
import OfficePendingApprovalsCard from "@/components/office-dashboard/OfficePendingApprovalsCard"
import OfficeTotalAgentsCard from "@/components/office-dashboard/OfficeTotalAgentsCard"
import PropertyViewChart from "@/components/agent-dashboard/PropertyViewChart"
import RecentMessages from "@/components/agent-dashboard/RecentMessages"
import OfficePropertyViewingsCard from "@/components/office-dashboard/OfficePropertyViewingsCard"

function OfficeHomePage() {
    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold"> Dashboard</h2>

            <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-4 mt-4">
                <TotalPropertiesCard />
                <OfficeTotalAgentsCard />
                <OfficePendingApprovalsCard />
                <OfficePropertyViewingsCard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-10 h-full">
                <PropertyViewChart />  
                <RecentMessages />
            </div>
        </div>
    )
}

export default OfficeHomePage