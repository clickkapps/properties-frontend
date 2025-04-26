import { Badge } from "@/components/ui/badge"
import {agentsImg} from "@/assets";

type Props = {
   title: string,
   status?: string
}

function AdvertisementCard({ title, status = "Pending" } : Props) {
    return (
        <div className="border rounded-md shadow-sm p-4 w-full max-w-sm sm:max-w-md">
            {/* Image */}
            <img
                src={agentsImg}
                alt="agent image"
                className="w-full h-[250px] object-cover rounded-md"
            />

            {/* Agent info */}
            <div className="mt-4">
                <h3 className="text-md font-semibold">{ title }</h3>

                <div className="divide-y">
                    <div className="flex flex-col py-4">
                        <h3 className="font-medium">April 21, 2020</h3>
                        <p className="text-sm">Starts from</p>
                    </div>
                    <div className="flex flex-col py-4">
                        <h3 className="font-medium">April 21, 2020</h3>
                        <p className="text-sm">Ends at</p>
                    </div>
                    <div className="flex flex-col py-4 space-y-2">
                        <div>
                            <Badge> { status } </Badge>
                        </div>
                        <small>Created at April 4, 2025</small>
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