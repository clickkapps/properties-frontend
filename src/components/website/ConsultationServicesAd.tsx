import {buySellConsultImg} from "@/assets";
import {Button} from "@/components/ui/button.tsx";

function ConsultationServicesAd() {
    return (
        <div className="bg-[#ECEAF7] p-6 flex flex-col gap-4">

            <h3 className="text-center text-lg">For your buying and selling consultation services </h3>
            <img src={buySellConsultImg} alt=""/>
            <div className="flex flex-row gap-2">
                <Button  className="bg-[#E50005] flex-1 shadow-none"> Call </Button>
                <Button  className="bg-[#209E48] flex-1 shadow-none"> Whatsapp </Button>
            </div>

        </div>
    )
}

export default ConsultationServicesAd;