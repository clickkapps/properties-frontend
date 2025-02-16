import { propertyGalleryImages } from "@/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Fancybox } from "@fancyapps/ui";

const PropertyGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? propertyGalleryImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === propertyGalleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-[600px] mx-auto bg-white p-4 rounded-lg shadow-lg">
      {/* Main Image with Navigation */}
      <div className="relative">
        {/* Click to Open Fancybox */}
        <a href={propertyGalleryImages[currentIndex]} data-fancybox="gallery">
          <img
            src={propertyGalleryImages[currentIndex]}
            alt="Property"
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </a>

        {/* arrow navigations */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Thumbnail Images Below */}
      <div className="flex items-center gap-3 mt-4 justify-center">
        {propertyGalleryImages.slice(0, 4).map((img: string, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
              index === currentIndex ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

        {/* "+X" Indicator for More Images */}
        {propertyGalleryImages.length > 5 && (
          <button
            className="w-20 h-16 flex items-center justify-center bg-gray-300 text-white text-lg font-bold rounded-lg"
            onClick={() => Fancybox.show(propertyGalleryImages.map((img) => ({ src: img })))}
          >
            +{propertyGalleryImages.length - 5}
          </button>
        )}
      </div>
    </div>
  );
};

export default PropertyGallery;
