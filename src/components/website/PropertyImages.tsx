import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {agentsImg, propGalleryImage, womanImg} from "@/assets";

function PropertyImages() {
    return (
        <>
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <div className="aspect-video overflow-hidden rounded-lg">
                            <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="aspect-video overflow-hidden rounded-lg">
                            <img src={womanImg} alt="Gallery Item" className="object-cover w-full h-full"/>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div className="aspect-video  overflow-hidden rounded-lg">
                            <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                        </div>
                    </CarouselItem>
                </CarouselContent >
                <CarouselPrevious  className="left-4 md:left-8" />
                <CarouselNext className="right-4 md:right-8"/>
            </Carousel>

            <div className="flex flex-row py-4 md:pt-8 gap-4">
                <div className="aspect-video bg-amber-200  overflow-hidden rounded-lg  w-full">
                    <img src={agentsImg} alt="Gallery Item" className="object-cover w-full h-full"/>
                </div>
                <div className="aspect-video bg-amber-200  overflow-hidden rounded-lg w-full">
                    <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                </div>
                <div className="aspect-video bg-amber-200  overflow-hidden rounded-lg w-full">
                    <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                </div>
                <div className="hidden md:block aspect-video bg-amber-200  overflow-hidden rounded-lg w-full">
                    <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                </div>
                <div className="hidden md:block aspect-video bg-amber-200  overflow-hidden rounded-lg  w-full relative">
                    <img src={womanImg} alt="Gallery Item" className="object-cover w-full h-full absolute"/>
                    <div className="w-full h-full bg-black/50 absolute flex justify-center items-center">
                        <span className="text-4xl text-white">+10</span>
                    </div>
                </div>

            </div>

        </>
    )
}

export default PropertyImages;