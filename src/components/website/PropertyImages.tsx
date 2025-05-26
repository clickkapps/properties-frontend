import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ImagePreviewer from "@/components/website/ImagePreviewer.tsx";
import { PropertyModel } from "@/lib/types";
import { getCdnFile } from "@/lib/utils.ts";

type Props = {
    property: PropertyModel;
};

function PropertyImages({ property }: Props) {
    const mainImage = getCdnFile(property.mainImagePath);
    const gallery = property.gallery || [];

    return (
        <>
            {/* Top Image Carousel */}
            <ImagePreviewer options={{ Carousel: { infinite: false } }}>
                <Carousel>
                    <CarouselContent>
                        {/* Main Image */}
                        <CarouselItem>
                            <a
                                className="aspect-video overflow-hidden rounded-lg"
                                data-fancybox="gallery"
                                href={mainImage}
                            >
                                <img
                                    src={mainImage}
                                    alt="Main Gallery Item"
                                    className="object-cover w-full h-full"
                                />
                            </a>
                        </CarouselItem>

                        {/* First 2 gallery images */}
                        {gallery.slice(0, 2).map((img, index) => (
                            <CarouselItem key={index}>
                                <a
                                    className="aspect-video overflow-hidden rounded-lg"
                                    data-fancybox="gallery"
                                    href={getCdnFile(img.path)}
                                >
                                    <img
                                        src={getCdnFile(img.path)}
                                        alt={`Gallery ${index + 1}`}
                                        className="object-cover w-full h-full"
                                    />
                                </a>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 md:left-8" />
                    <CarouselNext className="right-4 md:right-8" />
                </Carousel>
            </ImagePreviewer>

            {/* Bottom Thumbnails */}
            <ImagePreviewer options={{ Carousel: { infinite: true } }}>
                <div className="flex flex-row py-4 md:pt-8 gap-4">
                    {/* Main Image Thumbnail */}
                    <a
                        className="aspect-video bg-amber-200 overflow-hidden rounded-lg w-full"
                        data-fancybox="thumbnail"
                        href={mainImage}
                    >
                        <img
                            src={mainImage}
                            alt="Main Thumbnail"
                            className="object-cover w-full h-full"
                        />
                    </a>

                    {/* Up to 3 Gallery Thumbnails */}
                    {gallery.slice(0, 3).map((img, index) => (
                        <a
                            key={index}
                            className="aspect-video bg-amber-200 overflow-hidden rounded-lg w-full"
                            data-fancybox="thumbnail"
                            href={getCdnFile(img.path)}
                        >
                            <img
                                src={getCdnFile(img.path)}
                                alt={`Thumb ${index + 1}`}
                                className="object-cover w-full h-full"
                            />
                        </a>
                    ))}

                    {/* Optional static +10 image placeholder */}
                    <a
                        className="hidden md:block aspect-video bg-amber-200 overflow-hidden rounded-lg w-full relative"
                        data-fancybox="thumbnail"
                        href={mainImage}
                    >
                        <img
                            src={mainImage}
                            alt="More thumbnails"
                            className="object-cover w-full h-full absolute"
                        />
                        <div className="w-full h-full bg-black/50 absolute flex justify-center items-center">
                            <span className="text-4xl text-white">+10</span>
                        </div>
                    </a>
                </div>
            </ImagePreviewer>
        </>
    );
}

export default PropertyImages;
