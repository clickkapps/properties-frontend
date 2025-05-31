import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import ConsultationServicesAd from "@/components/website/ConsultationServicesAd.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropertyModel} from "@/lib/types";
import {apiGetProperties} from "@/api/properties.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import AnimatedInView from "@/components/ui/AnimatedInView.tsx";
import AdCarousel from "./AdCarousel";

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
                    const delay = index * 0.05; // Optional stagger effect

                    if (index == 4) {
                        return (
                            <AnimatedInView key={"item-" + index} delay={delay}>
                                <AdCarousel />
                            </AnimatedInView>
                        )
                    }

                        if (index === 9) {
                            return (
                                <AnimatedInView key={"item-" + index} delay={delay}>
                                    <ConsultationServicesAd />
                                </AnimatedInView>
                            );
                        }

                        // if (index === 14) {
                        //     return (
                        //         <AnimatedInView key={"item-" + index} delay={delay}>
                        //             <BetaAd />
                        //         </AnimatedInView>
                        //     );
                        // }

                        return (
                            <AnimatedInView key={"item-" + index} delay={delay}>
                                <PropertyListItem property={property} />
                            </AnimatedInView>
                        );
                    })
                }


            </div>
    )
}

export default FeaturedProperties