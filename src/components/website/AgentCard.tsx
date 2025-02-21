import { agentsImg, locationIcon, phoneIcon, websiteIcon, whatsappIcon } from "@/assets"

const AgentCard = () => {
  return (
    <div className="border rounded-md shadow-sm p-4 w-full max-w-sm sm:max-w-md">
      {/* Image */}
      <img 
        src={agentsImg} 
        alt="agent image" 
        className="w-full h-[250px] object-cover rounded-md"
        />

      {/* Agent info */}
      <div className="mt-4">
      <h3 className="text-md font-semibold">BROWN GROUP COMPANY LTD</h3>

      <div className="flex items-center gap-2 text-sm mt-3">
        <img src={locationIcon} alt="Location" className="w-4 h-4" />
        <span className="font-medium">Spintex, Accra</span>
      </div>

      <p className="text-sm mt-3 font-medium">
        Total Listings: 250
      </p>

      <div className="flex items-center gap-2 text-sm mt-3">
        <img src={websiteIcon} alt="Location" className="w-4 h-4" />
        <span className="font-medium">Visit website</span>
      </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-5">
        <button className="flex items-center gap-2 bg-[#E50005] hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">
        <img src={phoneIcon} alt="WhatsApp" className="w-4 h-4 invert"/>
          Call
        </button>

        <button className="flex items-center gap-2 bg-[#209E48] hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
          <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4 invert" />
          Whatsapp
        </button>
      </div> 
    </div>
  )
}

export default AgentCard