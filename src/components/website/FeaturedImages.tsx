import { useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react"; 
import { features } from "@/assets";

const FeaturedImages = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="relative bg-black mx-auto overflow-hidden rounded-lg mt-10"
      style={{ width: "1215px", height: "264px" }}
    >
      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-4 py-6 overflow-x-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Map through the features array to render each image card */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative w-[264px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden"
          >
            {/* Image */}
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay with title and description */}
            <div className="absolute top-0 left-0 bg-gradient-to-b from-black/60 via-transparent to-transparent p-4">
              <h3 className="text-white font-bold text-lg">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md hover:bg-gray-200"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </div>
  )
}

export default FeaturedImages