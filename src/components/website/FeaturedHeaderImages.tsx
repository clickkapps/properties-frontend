// import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {features} from "@/assets";
import Autoplay from "embla-carousel-autoplay"

//
function FeaturedHeaderImages({ className }: { className: string }) {
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
                {features.map((feature, index) => (
                    <CarouselItem key={index} className="md:basis-1/6 cursor-pointer h-[200px]">
                        <div
                            key={index}
                            className="relative rounded-lg w-full h-full"
                        >
                            {/* Image */}
                            <img
                                src={feature.image}
                                alt={feature.title}
                                className=" object-cover w-full h-full"
                            />
                            <div
                                className="absolute top-0 left-0 bg-gradient-to-b from-black/60 via-transparent to-transparent p-4">
                                <h3 className="text-white font-bold text-lg">{feature.title}</h3>
                                <p className="text-gray-300 text-sm">{feature.description}</p>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <CarouselPrevious className="left-8"/>
            <CarouselNext className="right-8"/>

        </Carousel>
    )
}

export default FeaturedHeaderImages