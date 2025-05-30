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
import RelatedProperties from "@/components/website/RelatedProperties.tsx";
import {useLoaderData} from "react-router";
import {PropertyModel} from "@/lib/types";
import AnimatedInView from "@/components/ui/AnimatedInView.tsx";


function PropertyDetailPage() {

    const propertyData = useLoaderData<PropertyModel>()
    
    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16 "></div>

            <main className="container mx-auto">
                <h2 className="uppercase font-normal text-xl md:text-3xl py-8 mx-5 md:mx-auto">
                    {propertyData.title}
                </h2>
                <div className="flex flex-col md:flex-row mx-5 md:mx-auto gap-8">
                    {/* Left Column*/}
                    <div className="w-full md:flex-1">

                        <AnimatedInView delay={0.1}>
                            <PropertyImages property={propertyData}/>
                        </AnimatedInView>

                        <div className="h-4"></div>

                    </div>

                    <div className="w-full md:flex-1">
                        <AnimatedInView delay={0.2}>
                            <PropertyDetailsTable property={propertyData}/>
                            <h2 className="font-normal text-xl md:text-2xl my-8">Interested in this property?</h2>
                            <div className="flex gap-2 md:gap-4">
                                <Button className="bg-[#E50005] flex-1 md:py-6"> <Phone/> Call </Button>
                                <Button className="bg-[#209E48] flex-1 md:py-6">
                                    <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 invert"/>
                                    Whatsapp
                                </Button>
                                <Button className="bg-[#00014F] flex-1 md:py-6"> <Mail/> Email </Button>
                            </div>
                        </AnimatedInView>
                        {/*<ReviewSection/>*/}
                        {/*<div className="h-12"></div>*/}
                    </div>

                    {/*/!* Column Separating Gap *!/*/}
                    {/*<div className="hidden md:block md:w-[10%]"></div>*/}

                    {/*/!* Right Column*!/*/}
                    {/*<div className="hidden md:block md:w-[25%]">*/}

                    {/*    <div className="h-24"></div>*/}

                    {/*    /!*<div className="rounded-lg overflow-hidden">*!/*/}
                    {/*    /!*    <img*!/*/}
                    {/*    /!*        src={advertImg}*!/*/}
                    {/*    /!*        alt="advert"*!/*/}
                    {/*    /!*        className="w-full h-auto"*!/*/}
                    {/*    /!*    />*!/*/}
                    {/*    /!*</div>*!/*/}

                        {/* MarketedBy Section */}

                    {/*</div>*/}
                </div>

                <h2 className="font-normal text-xl md:text-4xl mb-8 mt-8 text-center">Related Properties</h2>

                <RelatedProperties propertyId={propertyData.id}/>

            </main>


            <div className="h-20 "></div>
            <Footer/>
        </>
    )
}

export default PropertyDetailPage;