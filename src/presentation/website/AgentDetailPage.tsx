import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import AgentInfoCard from "@/components/website/AgentInfoCard.tsx";
import FeaturedProperties from "@/components/website/FeaturedProperties.tsx";

function AgentDetailPage() {
    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16 "></div>

            <div className="container mx-auto">
                <div className="h-24 "></div>
                <AgentInfoCard/>
                <div className="h-24 "></div>
                <FeaturedProperties/>
            </div>


            <div className="h-20"></div>
            <Footer/>
        </>
    )
}

export default AgentDetailPage