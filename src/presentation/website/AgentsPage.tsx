import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";

function AgentsPage() {
    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16 "></div>

            <div className="container mx-auto">
                <h2 className="uppercase font-normal text-xl md:text-3xl py-8">
                    Real Estate Agents
                </h2>
            </div>


            <div className="h-20"></div>
            <Footer/>
        </>
    )
}

export default AgentsPage