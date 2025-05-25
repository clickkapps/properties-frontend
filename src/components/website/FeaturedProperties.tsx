import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import AlphaAd from "@/components/website/AlphaAd.tsx";
import BetaAd from "@/components/website/BetaAd.tsx";
import ConsultationServicesAd from "@/components/website/ConsultationServicesAd.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropertyModel} from "@/lib/types";
import {apiGetProperties} from "@/api/properties.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function FeaturedProperties() {

    const { data, isPending } = useQuery<PropertyModel[]>({ queryKey: ['fetch-featured-properties'], queryFn: () => apiGetProperties( {
            endpoint: "/public/featured"
        } ) });

    return (

            <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-10 mx-5 md:mx-0">

                { isPending && Array.from({ length: 15 }).map( (_, index) => {
                    const key = `sk-${-index}`
                    return (
                        <Skeleton key={key} className="w-full h-full aspect-square rounded"/>
                    );
                }) }

                {
                    data && data.map((property, index) => {
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
                        <PropertyListItem property={property} key={"item-" + index}/>
                    )
                })
                }

            </div>
    )
}

export default FeaturedProperties