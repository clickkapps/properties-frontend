import { useState } from "react";
import {PhoneIcon, MailIcon, LinkIcon} from "lucide-react";

import {
  Dialog,
  DialogContent, DialogDescription, DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem, CarouselNext, CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {apiFetchPublicAds} from "@/api/ads.api.ts";
import {useQuery} from "@tanstack/react-query";
import {AdvertisementModel} from "@/lib/types";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {getCdnFile} from "@/lib/utils.ts";

function AdCarousel() {

  const { isPending, data } = useQuery<AdvertisementModel[]>({queryKey: ["fetchAds"], queryFn: () => apiFetchPublicAds(),});
  const [selectedAd, setSelectedAd] = useState<AdvertisementModel | null>(null);

  if(isPending) {
    return (
        <Skeleton className="w-full h-full aspect-square rounded"/>
    )
  }

  return (
    <>
      {/* Carousel Section */}
      <div className="w-full">
        <Carousel
            opts={{
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: false
              }),
            ]}
        >
          <CarouselContent className="">
            {data && data.map((ad, index) => (
              <CarouselItem key={index} className="basis-1/1 h-full w-full">
                <img
                  src={getCdnFile(ad.imagePath)}
                  alt={ad.contactPhone}
                  className="rounded-lg w-full h-full object-cover cursor-pointer"
                  onClick={() => setSelectedAd(ad)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4"/>
          <CarouselNext className="right-4"/>
        </Carousel>
      </div>

      {/* Modal Section */}
      <Dialog open={selectedAd !== null} onOpenChange={(open) => {
          if(!open) setSelectedAd(null);
      }}>
        <DialogContent className="h-full w-full bg-[#151b23] border-none text-white overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Contact <a className="font-[Inter]" href={"tel:"+selectedAd?.contactPhone}>{selectedAd?.contactEmail}</a></DialogTitle>
            <DialogDescription> For more information </DialogDescription>
          </DialogHeader>

          <img
              src={getCdnFile(selectedAd?.imagePath)}
              alt="Ad flyer"
              className="rounded-lg h-full w-full bg-no-repeat"
          />

          <DialogFooter className="bg-black/80 rounded">

            <div className="w-full py-2 px-4 flex flex-col divide-y divide-slate-800 text-white rounded">

              <div className="flex flex-row gap-4 py-2 items-center">
                <PhoneIcon size={16} className="text-blue-500"/>
                <a href={"tel:"+selectedAd?.contactPhone} className="text-blue-500">{selectedAd?.contactEmail}</a>
              </div>
              <div className="flex flex-row gap-4 py-2 items-center">
                <MailIcon size={16} className="text-blue-500"/>
                <a href={"mailto:"+selectedAd?.contactEmail} className="text-blue-500">{selectedAd?.contactEmail}</a>
              </div>
              <div className="flex flex-row gap-4 py-2 items-center">
                <LinkIcon size={16} className="text-blue-500"/>
                <a target="_blank" href={selectedAd?.link} className="text-blue-500">{selectedAd?.link}</a>
              </div>

            </div>

          </DialogFooter>


        </DialogContent>
      </Dialog>
    </>
  );
}

export default AdCarousel;
