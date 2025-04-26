import AddPropertyActionCard from "@/components/agent-dashboard/AddPropertyActionCard.tsx"
import AdvertiseActionCard from "@/components/agent-dashboard/AdvertiseActionCard.tsx"
import PropertyViewChart from "@/components/agent-dashboard/PropertyViewChart"
import RecentMessages from "@/components/agent-dashboard/RecentMessages"
import TotalPropertiesCard from "@/components/agent-dashboard/TotalPropertiesCard"

function AgentHomePage() {
    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold"> Dashboard</h2>

            <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-4 mt-4">
                <TotalPropertiesCard />
                <TotalPropertiesCard />
                <AdvertiseActionCard />
                <AddPropertyActionCard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-10 h-full">
                <PropertyViewChart />  
                <RecentMessages />
            </div>
        </div>
    )
}

export default AgentHomePage