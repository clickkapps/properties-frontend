import AdvertisementCard from "@/components/agent-dashboard/AdvertisementCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {apiFetchUserAds} from "@/api/ads.api.ts";
import {AdvertisementModel} from "@/lib/types";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function AdvertisementsPage() {
    const navigate = useNavigate();

    const { isPending: isPendingFetchUserAds, data: dataFetchUserAds } = useQuery<AdvertisementModel[]>({
        queryKey: ["fetchAdvertisements"],
        queryFn: apiFetchUserAds,
    })


    return (
        <div className="">
            <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-8">
                <h3 className="text-2xl font-semibold">Your Recent Ads</h3>
                <Button variant="default" onClick={() => navigate("/account/agent/create-ads")}> Create advertisement </Button>
            </div>

            {
                isPendingFetchUserAds && (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {
                        Array.from({length: 4}).map((_, index) => (
                            <div key={`ad-${index}`}>
                                <Skeleton className="h-[200px] w-full rounded-xl"/>
                            </div>
                        ))
                    }
                </div>)
            }
            {
                dataFetchUserAds && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dataFetchUserAds.map((ad) => (
                            <AdvertisementCard ad={ad} key={ad.id}  />
                        ))}
                    </div>
                )
            }

        </div>
    )
}

export default AdvertisementsPage