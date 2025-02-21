import { agentsImg, locationIcon, phoneIcon, websiteIcon, whatsappIcon } from "@/assets";

const AgentInfoCard = () => {
  return (
    <div className="border rounded-md shadow-sm p-6 w-full max-w-2xl mx-auto bg-white">
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Image */}
        <img 
          src={agentsImg} 
          alt="agent image" 
          className="w-full lg:w-1/2 h-[250px] object-cover rounded-md"
        />

        {/* Agent info */}
        <div className="flex-1 space-y-3">
          <h3 className="text-lg font-semibold">BROWN GROUP COMPANY LTD</h3>

          <div className="flex items-center gap-2 text-sm">
            <img src={locationIcon} alt="Location" className="w-4 h-4" />
            <span>Spintex, Accra</span>
          </div>

          <p className="text-sm">Total Listings: <span className="font-semibold">250</span></p>

          <div className="flex items-center gap-2 text-sm">
            <img src={websiteIcon} alt="Website" className="w-4 h-4"/>
            <span>Visit website</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4 pt-8">
            <button className="flex items-center gap-2 bg-[#E50005] hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md">
              <img src={phoneIcon} alt="Call" className="w-4 h-4 invert" />
              Call
            </button>

            <button className="flex items-center gap-2 bg-[#209E48] hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md">
              <img src={whatsappIcon} alt="WhatsApp" className="w-4 h-4 invert" />
              Whatsapp
            </button>
          </div>
        </div>
      </div>

      {/* About us*/}
      <div className="mt-6 pt-4">
        <h4 className="text-lg text-center font-semibold">ABOUT US</h4>
        <p className="text-sm mt-2">
          Brown Group Company is a trusted private company providing expert Land Surveying,
          Engineering, and Real Estate Brokerage services, always putting client satisfaction first.
          Our services include Site Plan and Indenture, Land registration, and Real estate brokers and managers.
        </p>
      </div>
    </div>
  );
};

export default AgentInfoCard;