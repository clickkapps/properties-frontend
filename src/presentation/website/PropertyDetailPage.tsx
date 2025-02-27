import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";

function PropertyDetailPage() {
    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-4 md:h-16"></div>

            <main className="container mx-auto px-6">
                <div className="flex">
                    <div className="w-[65%]">

                    </div>
                    <div className="w-[10%]"></div>
                    <div className="w-[25%]">
                        asdfasd
                    </div>
                </div>
            </main>

            <Footer/>
        </>
    )
}

export default PropertyDetailPage;