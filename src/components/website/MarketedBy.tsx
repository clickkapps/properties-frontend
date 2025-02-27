import { locationIcon, phoneIcon, websiteIcon, whatsappIcon } from "@/assets"

const MarketedBy = () => {
  return (
    <div className="border bg-white w-full">
  
      <div className="bg-[#F5F5F5] px-4 py-2 font-medium text-[15px]">Marketed by</div>

      <div className="p-4 space-y-6">
        <h3 className="font-semibold text-sm">AA COMPANY LIMITED</h3>

        {/* Contact Details */}
        <div className="space-y-4 text-sm">
          <div className="flex items-center space-x-2">
            <img src={locationIcon} alt="Location" className="w-5 h-5" />
            <span>Cantonment, Greater Accra</span>
          </div>

          <div className="flex items-center space-x-2">
            <img src={phoneIcon} alt="Phone" className="w-5 h-5" />
            <span>02400484659</span>
          </div>

          <div className="flex items-center space-x-2">
            <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5" />
            <span>02400484659</span>
          </div>

          <div className="flex items-center space-x-2">
            <img src={websiteIcon} alt="Website" className="w-5 h-5" />
            <span>Visit Website</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketedBy