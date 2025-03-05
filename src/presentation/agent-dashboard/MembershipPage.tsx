import MembershipCard from "@/components/agent-dashboard/MembershipCard"
import Packages from "@/components/website/Packages"

function MembershipPage() {
    return (
        <div className="container mx-auto h-screen ">
            <h2 className="text-2xl font-semibold mb-6 ml-10">Membership</h2>

            <MembershipCard />
            <Packages />
        </div>
    )
}

export default MembershipPage