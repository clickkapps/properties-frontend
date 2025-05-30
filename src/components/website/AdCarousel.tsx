import { advertImg } from "@/assets";
import { adPlaceholderImg } from "@/assets";
import { useEffect, useState } from "react";
import { Mail, Phone, Link2, Info } from "lucide-react"; 

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockAds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAdClick = (ad: Ad) => {
    setSelectedAd(ad);
  };

  return (
    <>
      {/* Carousel Section */}
      <div className="w-full max-w-[300px] mx-auto">
        <Carousel>
          <CarouselContent>
            {mockAds.map((ad, index) => (
              <CarouselItem key={index} className={index === currentIndex ? "block" : "hidden"}>
                <img
                  src={ad.flyerUrl}
                  alt={ad.title}
                  className="rounded-lg w-full h-auto object-cover cursor-pointer"
                  onClick={() => handleAdClick(ad)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Modal Section */}
      <Dialog open={selectedAd !== null} onOpenChange={() => setSelectedAd(null)}>
  <DialogContent className="max-w-2xl w-[95%] max-h-[90vh] overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
    <DialogHeader>
      <DialogTitle>{selectedAd?.title}</DialogTitle>
    </DialogHeader>

    <div className="flex flex-col md:flex-row gap-6 py-4">
      {/* Flyer Image */}
      <div className="w-full md:w-[45%] flex justify-center items-start">
        <img
          src={selectedAd?.flyerUrl}
          alt="Ad flyer"
          className="rounded-lg w-full h-auto max-h-[250px] object-contain"
        />
      </div>

      {/* Info Table */}
      <div className="w-full md:w-[55%] text-sm border border-gray-200 rounded-lg overflow-hidden">
        {[
          {
            label: "Description",
            icon: <Info className="w-4 h-4 mr-2" />,
            value: selectedAd?.description,
          },
          {
            label: "Phone",
            icon: <Phone className="w-4 h-4 mr-2" />,
            value: selectedAd?.phone,
          },
          {
            label: "Email",
            icon: <Mail className="w-4 h-4 mr-2" />,
            value: selectedAd?.email,
          },
          {
            label: "Link",
            icon: <Link2 className="w-4 h-4 mr-2" />,
            value: (
              <a
                href={selectedAd?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block truncate max-w-full"
              >
                {selectedAd?.link}
              </a>
            ),
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`flex items-start px-4 py-3 ${
              idx % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <div className="flex items-center w-32 font-medium text-gray-700 border-r border-gray-200">
              {item.icon}
              {item.label}
            </div>
            <div className="pl-4 text-gray-800 flex-1 break-words">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  </DialogContent>
</Dialog>

    </>
  );
}

export default AdCarousel;
