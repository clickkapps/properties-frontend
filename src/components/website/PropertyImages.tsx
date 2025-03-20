import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {agentsImg, propGalleryImage, womanImg} from "@/assets";
import ImagePreviewer from "@/components/website/ImagePreviewer.tsx";

function PropertyImages() {
    return (
        <>
            <ImagePreviewer
                options={{
                    Carousel: {
                        infinite: false,
                    },
                }}
            >
                <Carousel>
                    <CarouselContent>
                        <CarouselItem>
                                <a className="aspect-video overflow-hidden rounded-lg" data-fancybox="gallery" href={propGalleryImage}>
                                    <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                                </a>
                        </CarouselItem>
                        <CarouselItem>
                            <a className="aspect-video overflow-hidden rounded-lg"  data-fancybox="gallery" href={womanImg}>
                                <img src={womanImg} alt="Gallery Item" className="object-cover w-full h-full" />
                            </a>
                        </CarouselItem>
                        <CarouselItem>
                            <a className="aspect-video  overflow-hidden rounded-lg" data-fancybox="gallery"  href={propGalleryImage}>
                                <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full" />
                            </a>
                        </CarouselItem>
                    </CarouselContent >
                    <CarouselPrevious  className="left-4 md:left-8" />
                    <CarouselNext className="right-4 md:right-8"/>
                </Carousel>
            </ImagePreviewer>

            <ImagePreviewer
                options={{
                    Carousel: {
                        infinite: true,
                    },
                }}
            >
                <div className="flex flex-row py-4 md:pt-8 gap-4">
                    <a className="aspect-video bg-amber-200  overflow-hidden rounded-lg  w-full" data-fancybox="thumbnail" href={agentsImg}>
                        <img src={agentsImg} alt="Gallery Item" className="object-cover w-full h-full"/>
                    </a>
                    <a className="aspect-video bg-amber-200  overflow-hidden rounded-lg w-full"  data-fancybox="thumbnail" href={propGalleryImage}>
                        <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                    </a>
                    <a className="aspect-video bg-amber-200  overflow-hidden rounded-lg w-full"  data-fancybox="thumbnail" href={propGalleryImage}>
                        <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                    </a>
                    <a className="hidden md:block aspect-video bg-amber-200  overflow-hidden rounded-lg w-full"  data-fancybox="thumbnail" href={propGalleryImage}>
                        <img src={propGalleryImage} alt="Gallery Item" className="object-cover w-full h-full"/>
                    </a>
                    <a
                        className="hidden md:block aspect-video bg-amber-200  overflow-hidden rounded-lg  w-full relative"  data-fancybox="thumbnail" href={womanImg}>
                        <img src={womanImg} alt="Gallery Item" className="object-cover w-full h-full absolute"/>
                        <div className="w-full h-full bg-black/50 absolute flex justify-center items-center">
                            <span className="text-4xl text-white">+10</span>
                        </div>
                    </a>

                </div>
            </ImagePreviewer>

        </>
    )
}

export default PropertyImages;