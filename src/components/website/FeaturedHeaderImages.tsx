// import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import {Link} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {PropertyModel} from "@/lib/types";
import {apiGetProperties} from "@/api/properties.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {getCdnFile} from "@/lib/utils.ts";
import {capitalize} from "lodash";
import {Badge} from "@/components/ui/badge.tsx";

//
function FeaturedHeaderImages({ className }: { className: string }) {

    const { data, isPending } = useQuery<PropertyModel[]>({ queryKey: ['fetch-promoted-properties'], queryFn: () => apiGetProperties( {
            endpoint: "/public/promoted"
        } ) });

    const classes = `w-full container mx-auto p-4 bg-black ${className}`;
    return (
        <Carousel
            opts={{
                align: "center",
            }}
            plugins={[
                Autoplay({
                    delay: 2000,
                }),
            ]}
            className={classes}
        >

                <CarouselContent>
                    { isPending && Array.from({ length: 6 }).map( (_, index) => {
                        const key = `sk-${-index}`
                        return (
                            <CarouselItem key={key} className="md:basis-1/6 cursor-pointer h-[200px]">
                                <Skeleton className="w-full h-full aspect-square bg-slate-200"/>
                            </CarouselItem>
                        );
                    }) }

                    {data && data?.map((feature, index) => (
                        <CarouselItem key={feature.id} className="md:basis-1/6 cursor-pointer h-[200px]">
                            <Link to="/property-detail">
                                <div
                                    key={index}
                                    className="relative w-full h-full group"
                                >
                                    {/* Image */}
                                    <img
                                        src={getCdnFile(feature.mainImagePath)}
                                        alt={feature.title}
                                        className="absolute object-cover w-full h-full group-hover:scale-95 cursor-pointer hover:z-100 transition duration-150"
                                    />
                                    <div
                                        className="w-full h-full bg-black/30 group-hover:bg-black/20 absolute transition duration-150"></div>
                                    <div
                                        className="absolute top-0 left-0 bg-gradient-to-b w-full from-black/60 via-transparent to-transparent p-4">
                                        <Badge className={"bg-teal-600"}>Promoted</Badge>
                                        <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                                        <p className="text-white text-sm">For {capitalize(feature.offerType)}</p>
                                    </div>
                                </div>
                            </Link>
                        </CarouselItem>
                    ))}

                </CarouselContent>

            <CarouselPrevious className="left-8"/>
            <CarouselNext className="right-8"/>

        </Carousel>
    )
}

export default FeaturedHeaderImages