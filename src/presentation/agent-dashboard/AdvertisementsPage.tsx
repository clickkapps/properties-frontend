import AdvertisementCard from "@/components/agent-dashboard/AdvertisementCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";

function AdvertisementsPage() {
    const navigate = useNavigate();
    return (
        <div className="">
            <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-8">
                <h3 className="text-2xl font-semibold">Your Recent Ads</h3>
                <Button variant="default" onClick={() => navigate("/account/agent/create-ads")}> Create advertisement </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AdvertisementCard title={ "Plumbing Works" } />
                <AdvertisementCard title={ "Plumbing Works" } />
                <AdvertisementCard title={ "Plumbing Works" } />
            </div>
        </div>
    )
}

export default AdvertisementsPage