import { Badge } from "@/components/ui/badge"
import {AdvertisementModel} from "@/lib/types";
import {format} from "date-fns";
import {axiosErrorHandler, canPublishAds, getCdnFile} from "@/lib/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {useAppSelector} from "@/hooks";
import {apiPublishAdToWebsite} from "@/api/ads.api.ts";
import {useMutation} from "@tanstack/react-query";
import {toast} from "@/hooks/use-toast.ts";
import {LoaderCircle} from "lucide-react";

type Props = {
   ad: AdvertisementModel,
   onAdUpdated?: (ad: AdvertisementModel) => void
}

function AdvertisementCard({ ad, onAdUpdated } : Props) {

    const { userInfo: currentUser } = useAppSelector(state => state.auth)
    const { mutate, isPending  } = useMutation({
        mutationKey: ["updateUserEntitlement"],
        mutationFn: (status: string) => apiPublishAdToWebsite(ad.id, status),
        onSuccess: () => {
            if(onAdUpdated){
                onAdUpdated(ad)
            }
            toast({
                title: "Successful! 🚀🔥🔥",
                description: "Action completed!",
            });
        },
        onError: axiosErrorHandler
    })

    const publishAdToWebsite = (status: string) => {
        mutate(status)
    }

    return (
        <div className="flex flex-row gap-2 border rounded-md shadow-sm p-4 w-full">
            {/* Image */}
            <img
                src={getCdnFile(ad.imagePath)}
                alt="agent image"
                className="w-[40%] object-cover rounded-md"
            />

            {/* Agent info */}
            <div className="border border-dashed w-full p-4">
                <h3 className="text-md font-semibold">Created on { format((ad?.createdAt || new Date()), "LLL dd, y")}</h3>

                <div className="divide-y">
                    <div className="flex flex-col py-4">
                        <h3 className="font-medium">Contact Phone</h3>
                        <p className="text-sm">{ ad?.contactPhone || 'N/A' }</p>
                    </div>
                    <div className="flex flex-col py-4">
                        <h3 className="font-medium">Contact Email</h3>
                        <p className="text-sm">{ ad.contactEmail || 'N/A'} </p>
                    </div>
                    <div className="flex flex-col py-4">
                        <h3 className="font-medium">Starts from</h3>
                        <p className="text-sm">{format((ad?.startFrom || ''), "LLL dd, y")}</p>
                    </div>
                    <div className="flex flex-col py-4">
                        <h3 className="font-medium">Ends at</h3>
                        <p className="text-sm">{format((ad?.endAt || ''), "LLL dd, y")}</p>
                    </div>
                    <div className="flex flex-col py-4 space-y-2">
                        <div>
                            <Badge> {ad.status} </Badge>
                        </div>
                        <small>Created at {format((ad?.createdAt || new Date()), "LLL dd, y")}</small>

                        {
                             ad.status != "approved" && canPublishAds(currentUser) && (
                                <div className="pt-8">
                                    <Button
                                        onClick={() => publishAdToWebsite("approved")}
                                        disabled={isPending}
                                        className="bg-teal-500">
                                        { isPending && <LoaderCircle className="animate-spin" />}
                                        Publish
                                    </Button>
                                </div>
                            )
                        }

                        {
                            ad.status == "approved" && canPublishAds(currentUser) && (
                                <div className="pt-8">
                                    <Button
                                        onClick={() => publishAdToWebsite("inactive")}
                                        disabled={isPending}
                                        className="bg-red-800">
                                        { isPending && <LoaderCircle className="animate-spin" />}
                                        Deactivate
                                    </Button>
                                </div>
                            )
                        }

                    </div>
                </div>


            </div>

            {/* Buttons */}
            {/*<div className="flex gap-3 mt-5">*/}
            {/*    <button className="flex items-center gap-2 bg-[#E50005] hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">*/}
            {/*        <img src={phoneIcon} alt="WhatsApp" className="w-4 h-4 invert"/>*/}
            {/*        Canc*/}
            {/*    </button>*/}

            {/*    <button className="flex items-center gap-2 bg-[#209E48] hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">*/}
            {/*        <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4 invert" />*/}
            {/*        Whatsapp*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    )
}

export default AdvertisementCard