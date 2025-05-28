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

  // Safe fallback for 5th image in thumbnails
  const extraImage =
    gallery.length > 3 && gallery[3]?.path
      ? getCdnFile(gallery[3].path)
      : mainImage;

  return (
    <>
      {/* Top Image Carousel */}
      <ImagePreviewer options={{ Carousel: { infinite: false } }}>
        <div className="max-h-[500px] overflow-hidden rounded-lg mb-4">
          <Carousel

          >
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
        </div>
      </ImagePreviewer>

      {/* Bottom Thumbnails (Dynamic with +X overlay) */}
      <ImagePreviewer options={{ Carousel: { infinite: true } }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-4 md:pt-8">
          {/* Main image + first 3 gallery images */}
          {[mainImage, ...gallery.map((g) => getCdnFile(g.path))]
            .slice(0, 4)
            .map((src, index) => (
              <a
                key={index}
                className="aspect-video bg-amber-200 overflow-hidden rounded-lg w-full"
                data-fancybox="thumbnail"
                href={src}
              >
                <img
                  src={src}
                  alt={`Thumb ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </a>
            ))}

          {/* 5th thumbnail with overlay if more images exist */}
          {gallery.length > 3 && (
            <a
              className="aspect-video bg-amber-200 overflow-hidden rounded-lg w-full relative"
              data-fancybox="thumbnail"
              href={extraImage}
            >
              <img
                src={extraImage}
                alt="More thumbnails"
                className="object-cover w-full h-full"
              />
              <div className="w-full h-full bg-black/50 absolute flex justify-center items-center">
                <span className="text-4xl text-white">+{gallery.length - 3}</span>
              </div>
            </a>
          )}
        </div>
      </ImagePreviewer>
    </>
  );
}

export default PropertyImages;
