import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import AlphaAd from "@/components/website/AlphaAd.tsx";
import BetaAd from "@/components/website/BetaAd.tsx";
import ConsultationServicesAd from "@/components/website/ConsultationServicesAd.tsx";

function FeaturedProperties() {
    return (

            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-10 mx-5 md:mx-0">
                {Array.from({length: 15}).map((_, index) => {
                    if (index == 4) {
                        return (
                            <AlphaAd  key={"item-" + index}/>
                        )
                    }

                    if(index == 9) {
                        return (
                            <ConsultationServicesAd key={"item-" + index} />
                        )
                    }

                    if (index == 14) {
                        return (
                            <BetaAd  key={"item-" + index}/>
                        )
                    }

                    return (
                        <PropertyListItem key={"item-" + index}/>
                    )
                })}
            </div>
    )
}

export default FeaturedProperties