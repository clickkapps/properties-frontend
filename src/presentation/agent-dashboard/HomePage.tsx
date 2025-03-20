import AddListingsCard from "@/components/agent-dashboard/AddListingsCard"
import AdvertiseCard from "@/components/agent-dashboard/AdvertiseCard"
import PropertyViewChart from "@/components/agent-dashboard/PropertyViewChart"
import RecentMessages from "@/components/agent-dashboard/RecentMessages"
import TotalPropertiesCard from "@/components/agent-dashboard/TotalPropertiesCard"

function HomePage() {
    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold"> Dashboard</h2>

            <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-8 gap-4 mt-4">
                <TotalPropertiesCard />
                <TotalPropertiesCard />
                <AdvertiseCard />
                <AddListingsCard />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-10 h-full">
                <PropertyViewChart />  
                <RecentMessages />
            </div>
        </div>
    )
}

export default HomePage