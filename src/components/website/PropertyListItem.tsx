import { Bed, Bath, Toilet, Star, Heart } from "lucide-react"
import {Link} from "react-router";
import {PropertyModel} from "@/lib/types";
import {getCdnFile} from "@/lib/utils.ts";
import {capitalize} from "lodash";

type Props = {
  property: PropertyModel
}
const PropertyListItem = ({ property }: Props) => {
  return (
      <Link to={`/property-detail/${property.id}`}>
        <div className="w-full ">
          {/* Image Section */}
          <div className="relative group">

            <img
                src={getCdnFile(property.mainImagePath)}
                alt="House for Sale"
                className="aspect-square w-full h-full object-cover rounded-lg md:hover:scale-105 cursor-pointer md:hover:z-100 transition duration-150"
            />

            <span
                className="absolute top-3 left-2 bg-white text-black text-[14px] font-medium px-3 py-1 rounded-full  md:group-hover:scale-110  transition duration-150">
          For { capitalize(property.offerType) }
        </span>

            <button className="absolute top-2 right-2 p-2 rounded-full md:group-hover:scale-110  transition duration-150">
              <Heart fill="#000" className="w-[24px] h-[24px] "/>
            </button>
          </div>

          {/* Property Information */}
          <div className="mt-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-[15px] font-medium flex justify-between items-start  w-full">
                <div className="text-start">
                  {/*<span className="font-[Inter]">5</span>*/}
                  <span> {property.title} </span>
                </div>
                <div className="inline-flex items-center pl-4 space-x-1 ">
                  <Star size={12} style={{fill: "black"}}/>
                  <span className="font-[Inter]">4.92</span>
                </div>
              </h3>

            </div>
            <p className="text-[#6A6A6A] mt-2">Labadi - Accra</p>

            {/* Features */}
            <div className="mt-4 space-y-2 text-black text-[15px]">
              <p className="flex items-center gap-2">
                <Bed size={20}/> <span className="font-[Inter]">5</span> - bedrooms
              </p>
              <p className="flex items-center gap-2">
                <Bath size={20}/> <span className="font-[Inter]">5</span> - bathrooms
              </p>
              <p className="flex items-center gap-2">
                <Toilet size={20}/> <span className="font-[Inter]">5</span> - water closets
              </p>
            </div>
          </div>
        </div>
      </Link>

  )
}

export default PropertyListItem