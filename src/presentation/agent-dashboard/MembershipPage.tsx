import MembershipCard from "@/components/agent-dashboard/MembershipCard"
import Packages from "@/components/website/Packages.tsx";

function MembershipPage() {
    return (
        <div className="">

            <h2 className="text-2xl font-semibold mb-8">Membership</h2>
            
            <div className="mb-6">
            <MembershipCard />
            </div>
            <div className="mb-20">
            <Packages showTitle={false} />
            </div>

        </div>
    )
}

export default MembershipPage