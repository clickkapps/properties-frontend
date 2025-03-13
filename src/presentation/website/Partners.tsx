import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {partnerPlaceholderImg} from "@/assets";
import Autoplay from "embla-carousel-autoplay";

function Partners() {
    return (
        <>
            <div id="packages-heading" className="mb-10">
            <h2 className="text-3xl font-bold text-center ">Partners</h2>
            {/*<p className="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa*/}
            {/*  dicta ex itaque neque officia repellat sunt. Inventore similique totam voluptates?</p>*/}
            </div>

            <Carousel
                opts={{
                    align: "center",
                }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                className="w-full container mx-auto"
            >
                <CarouselContent className="flex justify-center">
                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>

                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>
                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>

                    <CarouselItem className="md:basis-1/6 w-full h-full flex justify-center grayscale">
                        <img src={partnerPlaceholderImg} alt="max-w-xs"/>
                    </CarouselItem>

                </CarouselContent>
                <CarouselPrevious className="left-8"/>
                <CarouselNext className="right-8"/>
            </Carousel>

        </>


    )
}

export default Partners
