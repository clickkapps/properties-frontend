import { advertImg } from "@/assets"
import Footer from "@/components/website/Footer"
import MarketedBy from "@/components/website/MarketedBy"
import Navbar from "@/components/website/Navbar"
import PropertyDetail from "@/components/website/PropertyDetail"
import PropertyDetailsTable from "@/components/website/PropertyDetailsTable"
import PropertyListItem from "@/components/website/PropertyListItem"
import ReportListing from "@/components/website/ReportListing"
import ReviewSection from "@/components/website/ReviewSection"
import SafetyTips from "@/components/website/SafetyTips"

const UnusedPropertyDetailsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar className="bg-black" />

      {/* Main Content */}
      <div className="container mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <PropertyDetail />
          <PropertyDetailsTable />
          <ReviewSection />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          {/* Move the Advert Image to the Bottom on Mobile */}
          <div className="order-3 lg:order-1">
            <img 
              src={advertImg} 
              alt="advert" 
              className="w-full h-auto"
            />
          </div>

          {/* MarketedBy Section */}
          <div className="order-1 lg:order-2 mt-10">
            <MarketedBy />
          </div>

          {/* Report Listing Section */}
          <div className="order-2 lg:order-3">
            <ReportListing />
          </div>

          {/* Safety Tips Section */}
          <div className="order-3 lg:order-4">
            <SafetyTips />
          </div>
        </div>
      </div>

      {/* Related Properties */}
      <div className="max-w-6xl mx-auto p-4 lg:p-8">
        <h2 className="text-lg text-center font-semibold mb-4">Related Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
          <PropertyListItem />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default UnusedPropertyDetailsPage
