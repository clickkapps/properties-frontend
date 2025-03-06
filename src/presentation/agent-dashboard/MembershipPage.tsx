import MembershipCard from "@/components/agent-dashboard/MembershipCard"
import Packages from "@/components/website/Packages"

function MembershipPage() {
    return (
        <div className="container mx-auto  ">
            <h2 className="text-2xl font-semibold mb-8">Membership</h2>

            <div>
            <MembershipCard />
            <Packages />
            </div>
            
        </div>
    )
}

export default MembershipPage