import { propertyGalleryImages, whatsappIcon } from "@/assets";
import { ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";
import { useState } from "react";

const PropertyDetail = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle navigation
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
    <div className="max-w-[700px] mx-auto p-4">
      
      <h3 className="font-medium text-base mb-4 text-center sm:text-left">
        5 - BEDROOM HOUSE FOR SALE AT <br /> LABADI, ACCRA
      </h3>

      {/* Main image */}
      <div className="relative">
        <img 
          src={propertyGalleryImages[currentIndex]} 
          alt="Property"
          className="w-full h-[300px] object-cover rounded-lg"
        />

        {/* Left navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronLeft className="w-6 h-6 text-gray-700"/>
        </button>

        {/* Right navigation */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          <ChevronRight className="w-6 h-6 text-gray-700"/>
        </button>
      </div>

      {/* Thumbnail images */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {propertyGalleryImages.slice(0, 4).map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
              index === currentIndex ? "border-blue-500" : "border-transparent"
            }`}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}

        {/* Extra image thumbnail */}
        {propertyGalleryImages.length > 4 && (
          <div className="w-20 h-16 flex items-center justify-center bg-gray-300 text-white text-lg font-bold rounded-lg">
            +{propertyGalleryImages.length - 4}
          </div>
        )}
      </div>

      <p className="text-center text-lg font-medium mt-4">Interested in this property?</p>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        <button className="flex items-center justify-center gap-2 bg-[#E50005] text-white py-3 rounded-lg hover:bg-red-700 w-full">
          <Phone className="w-5 h-5" /> Call
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#209E48] text-white py-3 rounded-lg hover:bg-green-800 w-full">
          <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 invert" /> WhatsApp
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#00014F] text-white py-3 rounded-lg hover:bg-blue-950 w-full">
          <Mail className="w-5 h-5" /> Email
        </button>
      </div>
    </div>
  );
};

export default PropertyDetail;
