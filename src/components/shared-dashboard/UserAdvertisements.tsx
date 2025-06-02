import AdvertisementCard from "@/components/agent-dashboard/AdvertisementCard.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {apiFetchUserAds} from "@/api/ads.api.ts";
import {AdvertisementModel} from "@/lib/types";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import EmptyDisplayPage from "@/components/ui/EmptyDisplayPage.tsx";
import {useCallback} from "react";
import {canCreateAds} from "@/lib/utils.ts";
import {useAppSelector} from "@/hooks";

type Props = {
    userId?: number
}

function UserAdvertisements({ userId }: Props ) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { userInfo:currentUser } = useAppSelector(state => state.auth)

    const { isPending: isPendingFetchUserAds, data: dataFetchUserAds } = useQuery<AdvertisementModel[]>({
        queryKey: ["fetchAdvertisements", userId],
        queryFn: () => apiFetchUserAds(userId),
    })

    const refreshAndSyncRecordsWithServer = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetchAdvertisements', userId ] }).catch((error) => {
            console.log("error syncing records: ", error.message)
        });
    }, [queryClient, userId]);


    return (
        <div className="">
            <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-8">
                <h3 className="text-2xl font-semibold">Recent Ads</h3>
                {
                    canCreateAds(currentUser) && (
                        <Button variant="default" onClick={() => navigate("/account/agent/create-ads")}> Create advertisement </Button>
                    )
                }
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
                dataFetchUserAds && dataFetchUserAds.length > 0  ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dataFetchUserAds.map((ad) => (
                            <AdvertisementCard ad={ad} key={ad.id} onAdUpdated={() => refreshAndSyncRecordsWithServer()}  />
                        ))}
                    </div>
                ) : (
                    <EmptyDisplayPage />
                )
            }

        </div>
    )
}

export default UserAdvertisements