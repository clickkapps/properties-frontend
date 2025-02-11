import { propertyImg } from "@/assets"
import { Bed, Bath, Toilet, Star, Heart } from "lucide-react"


const PropertyListItem = () => {
  return (
    <div className="p-4 w-[300px]">
      {/* Image Section */}
      <div className="relative">
        <img
          src={propertyImg} 
          alt="House for Sale"
          className="w-full h-full object-cover rounded-lg"
        />
        
        <span className="absolute top-3 left-2 bg-white text-black text-[14px] font-medium px-3 py-1 rounded-full shadow">
          For Sale
        </span>

        <button className="absolute top-2 right-2 p-2 rounded-full shadow">
          <Heart className="w-[24px] h-[24px] text-white" />
        </button>
      </div>

      {/* Property Information */}
      <div className="mt-3">
        <div className="flex items-center space-x-2">
        <h3 className="text-[15px] font-medium">
          5 - bedroom house for sale at 
        </h3>
        <Star className="w-3 h-3" style={{fill:"black"}} /> 
        <h3>4.92</h3>
        </div>
        <p className="text-[#6A6A6A] mt-2">Labadi - Accra</p>
        
        {/* Features */}
        <div className="mt-4 space-y-2 text-black text-[15px]">
          <p className="flex items-center gap-2">
            <Bed className="w-6 h-6" /> 5 - bedrooms
          </p>
          <p className="flex items-center gap-2">
            <Bath className="w-6 h-6" /> 6 - bathrooms
          </p>
          <p className="flex items-center gap-2">
            <Toilet className="w-6 h-6" /> 6 - water closets
          </p>
        </div>
      </div>
    </div>
  )
}

export default PropertyListItem