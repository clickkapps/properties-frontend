import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import PropertyImages from "@/components/website/PropertyImages.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Mail, Phone} from "lucide-react";
import PropertyDetailsTable from "@/components/website/PropertyDetailsTable.tsx";
// import ReviewSection from "@/components/website/ReviewSection.tsx";
import {
    // advertImg,
    whatsappIcon} from "@/assets";
import MarketedBy from "@/components/website/MarketedBy.tsx";
import ReportListing from "@/components/website/ReportListing.tsx";
import SafetyTips from "@/components/website/SafetyTips.tsx";
import RelatedProperties from "@/components/website/RelatedProperties.tsx";
import {useLoaderData} from "react-router";
import {PropertyModel} from "@/lib/types";

function PropertyDetailPage() {

    const propertyData = useLoaderData<PropertyModel>()
    
    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16 "></div>

            <main className="container mx-auto">
                <div className="flex mx-5 md:mx-auto">

                    {/* Left Column*/}
                    <div className="w-full md:w-[65%]">
                        <h2 className="uppercase font-normal text-xl md:text-3xl py-8">
                            { propertyData.title }
                        </h2>
                        <PropertyImages property={propertyData}/>
                        <h2 className="font-normal text-xl md:text-2xl my-4">Interested in this property?</h2>
                        <div className="flex gap-2 md:gap-4">
                            <Button className="bg-[#E50005] flex-1 md:py-6"> <Phone/> Call </Button>
                            <Button className="bg-[#209E48] flex-1 md:py-6">
                                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 invert"/>
                                Whatsapp
                            </Button>
                            <Button className="bg-[#00014F] flex-1 md:py-6"> <Mail/> Email </Button>
                        </div>
                        <div className="h-4"></div>
                        <h2 className="font-normal text-xl md:text-2xl my-4">Property Details</h2>
                        <PropertyDetailsTable property={propertyData}/>
                        <div className="h-12"></div>
                        {/*<ReviewSection/>*/}
                        {/*<div className="h-12"></div>*/}


                    </div>

                    {/* Column Separating Gap */}
                    <div className="hidden md:block md:w-[10%]"></div>

                    {/* Right Column*/}
                    <div className="hidden md:block md:w-[25%]">

                        <div className="h-24"></div>

                        {/*<div className="rounded-lg overflow-hidden">*/}
                        {/*    <img*/}
                        {/*        src={advertImg}*/}
                        {/*        alt="advert"*/}
                        {/*        className="w-full h-auto"*/}
                        {/*    />*/}
                        {/*</div>*/}

                        {/* MarketedBy Section */}
                        <div className="">
                            <MarketedBy/>
                        </div>

                        {/* Report Listing Section */}
                        <div className="my-12">
                            <ReportListing/>
                        </div>

                        {/* Safety Tips Section */}
                        <div className="">
                            <SafetyTips/>
                        </div>

                    </div>
                </div>

                <h2 className="font-normal text-xl md:text-4xl my-4 text-center">Related Properties</h2>
                <div className="h-12"></div>

                <RelatedProperties propertyId={propertyData.id}/>

            </main>


            <div className="h-20 "></div>
            <Footer/>
        </>
    )
}

export default PropertyDetailPage;