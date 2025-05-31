import {buySellConsultImg} from "@/assets";
import {useRouteLoaderData} from "react-router";

function ConsultationServicesAd() {

    const { support } = useRouteLoaderData('index')

    return (
        <div className="bg-[#ECEAF7] p-6 flex flex-col gap-4">

            <h3 className="text-center text-lg">For your buying and selling consultation services </h3>
            <img src={buySellConsultImg} alt=""/>
            <div className="flex flex-row gap-2">
                <a href={"tel:" + support.contactPhone} className="bg-[#E50005] flex-1 shadow-none text-center text-white text-sm py-2 rounded"> Call </a>
                <a href={"mailto:" + support.contactEmail}
                    className="bg-[#209E48] flex-1 shadow-none text-center text-white text-sm py-2 rounded"> Email </a>
            </div>

        </div>
    )
}

export default ConsultationServicesAd;