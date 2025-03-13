import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import { Search } from "lucide-react";
import AgentCard from "@/components/website/AgentCard";

function AgentsPage() {
    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16 "></div>

            <div className="container mx-auto px-4">
                <h2 className="uppercase font-normal text-xl md:text-3xl py-8">
                    Real Estate Agents
                </h2>

                {/* Search bar */}
                <div className="relative w-full mx-auto">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                        <Search className="w-5 h-5" />
                    </div>

                    <input 
                        type="text"
                        placeholder="Find an agent"
                        className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-24 text-[#6A6A6A] focus:outline-none"
                    />

                    <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#e50005] hover:bg-red-700 rounded-full px-4 py-2 text-white flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Search
                    </button>
                </div>

                {/* Results */}
                <p className="mt-6">
                    Result <span className="font-semibold font-[inter]">1 - 20</span> of <span className="font-semibold font-[inter]">250</span>
                </p>

                {/* Agents Grid */}
                {/* figma is 2 cols but too much gap so either max-w-4xl or 3 cols */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <AgentCard />
                    <AgentCard />
                    <AgentCard />
                    <AgentCard />
                    <AgentCard />
                    <AgentCard />
                    <AgentCard />
                </div>
                
            </div>


            <div className="h-20"></div>
            <Footer/>
        </>
    )
}

export default AgentsPage