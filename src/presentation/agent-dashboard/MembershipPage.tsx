import MembershipCard from "@/components/agent-dashboard/MembershipCard"
import MembershipPackages from "@/components/agent-dashboard/MembershipPackages"

function MembershipPage() {
    return (
        <div className="container mx-auto h-screen ">

            <h2 className="text-2xl font-semibold mb-8">Membership</h2>
            
            <div className="mb-6">
            <MembershipCard />
            </div>
            <div className="">
            <MembershipPackages />
            </div>

        </div>
    )
}

export default MembershipPage