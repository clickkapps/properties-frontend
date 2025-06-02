import { locationIcon, phoneIcon, websiteIcon, whatsappIcon } from "@/assets"
import {User} from "@/lib/types";

type Props = {
  user: User
}
const MarketedBy = ({ user }: Props) => {
  return (
    <div className="border bg-white w-full">
  
      <div className="bg-[#F5F5F5] px-4 py-2 font-medium text-[15px]">Marketed by</div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm">{ user.companyName }</h3>

        {/* Contact Details */}
        <div className="flex flex-wrap text-sm gap-4">
          <div className="inline-flex items-center space-x-2">
            <img src={locationIcon} alt="Location" className="w-5 h-5" />
            <span className="font-[Inter]"> {user.companyLocation} </span>
          </div>

          <div className="inline-flex items-center space-x-2">
            <img src={phoneIcon} alt="Phone" className="w-5 h-5" />
            <span className="font-[Inter]">{ user.contactPhone }</span>
          </div>

          <div className="inline-flex items-center space-x-2">
            <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
            <span className="font-[Inter]">{ user.contactPhone }</span>
          </div>

          <div className="inline-flex items-center space-x-2">
            <img src={websiteIcon} alt="Website" className="w-5 h-5" />
            <span className="font-[Inter]">{ user.contactEmail }</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketedBy