import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import PropertyImages from "@/components/website/PropertyImages.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Mail, Phone} from "lucide-react";

function PropertyDetailPage() {
    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16 "></div>

            <main className="container mx-auto px-6">
                <div className="flex">

                    {/* Left Column*/}
                    <div className="w-full md:w-[65%]">
                        <h2 className="uppercase font-normal text-xl md:text-3xl py-8"><span
                            className="font-[Inter]">5</span> - Bedroom house for sale at labardi, accra</h2>
                        <PropertyImages/>
                        <h2 className="font-normal text-xl md:text-2xl my-4">Interested in this property?</h2>
                        <div className="flex gap-4">
                            <Button className="bg-[#E50005] flex-1 py-6"> <Phone/> Call </Button>
                            <Button className="bg-[#209E48] flex-1 py-6"> Whatsapp
                            </Button>
                            <Button className="bg-[#00014F] flex-1 py-6"> <Mail/> Email </Button>
                        </div>
                        <div className="h-4"></div>
                        <h2 className="font-normal text-xl md:text-2xl my-4">Property Detail?</h2>
                    </div>

                    {/* Column Separating Gap */}
                    <div className="hidden md:w-[10%]"></div>

                    {/* Right Column*/}
                    <div className="hidden md:w-[25%]">
                        asdfasd
                    </div>
                </div>
            </main>
            <div className="h-20 bg-blue-50"></div>
            <Footer/>
        </>
    )
}

export default PropertyDetailPage;