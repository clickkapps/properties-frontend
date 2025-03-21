import {Search, SearchIcon} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import {ModalHandle} from "@/types/ui.types";
import {useRef} from "react";
import SearchResults from "@/components/website/SearchResults.tsx";
import {useNavigate} from "react-router";

const Searchbar = ({ className }: { className: string}) => {

    const modalRef = useRef<ModalHandle>()
    const navigate = useNavigate()

    return (
        <>
          {/* Destop */}
          <div className={`bg-white p-2 rounded-full hidden md:flex items-center w-full max-w-5xl mx-auto ${className}`}>

            <input type="text"
                   placeholder="Location"
                   className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
            />

            <div className="w-px h-8 bg-gray-300"></div>

            <input type="text"
                   placeholder="Category"
                   className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
            />

            <div className="w-px h-8 bg-gray-300"></div>

            <input type="text"
                   placeholder="Bedroom"
                   className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
            />

            <div className="w-px h-8 bg-gray-300"></div>

            <input type="text"
                   placeholder="Price"
                   className="flex-1 bg-transparent px-4 py-3 rounded-full text-[#6A6A6A] focus:outline-none"
            />

            <button
                onClick={() => {
                    navigate('/properties/rent')
                }}
                className="flex items-center justify-center bg-[#e50005] rounded-full px-4 py-3 space-x-2 text-white font-semibold hover:bg-red-700">
              <Search className="w-5 h-5"/>
              <span>Search</span>
            </button>

          </div>
          {/* Mobile Screen  */}
          <Button
              onClick={ () => {
                  modalRef.current?.open()
              }}
              size={"lg"} className={`rounded-full md:hidden bg-white text-black mt-4 ${className}`}> <SearchIcon /> Search for properties </Button>
          <SearchResults ref={modalRef} />
        </>
    )
}

export default Searchbar