import { advertImg } from "@/assets";
import { adPlaceholderImg } from "@/assets";
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

// Ad type
type Ad = {
  flyerUrl: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  link: string;
};

// Mock data 
const mockAds: Ad[] = [
  {
    flyerUrl: advertImg,
    title: "Ultramodern Property for Sale",
    description: "Join us this July for great real estate deals!",
    phone: "057-263-6005",
    email: "kojo@gmail.com",
    link: "https://propertiespark.com/",
  },
  {
    flyerUrl: adPlaceholderImg,
    title: "Resilience Homes",
    description: "Live in a home where you feel safe and secure",
    phone: "024-242-0848",
    email: "elton@gmail.com",
    link: "https://propertiespark.com/",
  },
];

function AdCarousel() {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

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
            {mockAds.map((ad, index) => (
              <CarouselItem key={index} className="basis-1/1 h-full w-full">
                <img
                  src={ad.flyerUrl}
                  alt={ad.title}
                  className="rounded-lg w-full h-auto object-cover cursor-pointer"
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
            <DialogTitle>Contact <a className="font-[Inter]" href={"tel:"+selectedAd?.phone}>{selectedAd?.phone}</a></DialogTitle>
            <DialogDescription> For more information </DialogDescription>
          </DialogHeader>

          <img
              src={selectedAd?.flyerUrl}
              alt="Ad flyer"
              className="rounded-lg h-full w-full bg-no-repeat"
          />

          <DialogFooter className="bg-black/80 rounded">

            <div className="w-full py-2 px-4 flex flex-col divide-y divide-slate-800 text-white rounded">

              <div className="flex flex-row gap-4 py-2 items-center">
                <PhoneIcon size={16} className="text-blue-500"/>
                <a href={"tel:"+selectedAd?.phone} className="text-blue-500">{selectedAd?.phone}</a>
              </div>
              <div className="flex flex-row gap-4 py-2 items-center">
                <MailIcon size={16} className="text-blue-500"/>
                <a href={"mailto:"+selectedAd?.email} className="text-blue-500">{selectedAd?.email}</a>
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
