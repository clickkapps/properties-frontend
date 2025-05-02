import {Search, SearchIcon} from "lucide-react"
import {Button} from "@/components/ui/button.tsx";
import {useRef, useState} from "react";
import SearchResults from "@/components/website/SearchResults.tsx";
import {useNavigate} from "react-router";
import {ModalHandle} from "@/lib/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {ghRegions} from "@/constants/ui.constants.ts";



const Searchbar = ({ className }: { className: string}) => {

    const modalRef = useRef<ModalHandle>()
    const navigate = useNavigate()
    const [searchValues, setSearchValues] = useState<Record<string, string> | undefined >(undefined)

    const editSearchValueHandler = (arg: {key: string, value: string}) => {
        setSearchValues( (prev) => {
            return {
                ...prev,
                [arg.key]: arg.value
            }
        })
    }

    return (
        <>
          {/* Destop */}
          <div className={`bg-white p-2 rounded-full hidden md:flex items-center w-full max-w-5xl mx-auto ${className}`}>


              <Select onValueChange={(value) => {
                  editSearchValueHandler({ key: "type", value: value})
              }}>
                  <SelectTrigger className="px-4 py-3 border-none text-[#6A6A6A] focus:border-none active:border-none shadow-none focus:ring-0 h-full">
                      <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                  </SelectContent>
              </Select>

            <div className="w-px h-8 bg-gray-300"></div>

              <Select onValueChange={(value) => {
                  editSearchValueHandler({ key: "region", value: value})
              }}>
                  <SelectTrigger className="px-4 py-3 border-none text-[#6A6A6A] focus:border-none active:border-none shadow-none focus:ring-0 h-full">
                      <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                      { ghRegions.map((region) => (
                          <SelectItem value={region}>{ region }</SelectItem>
                      ))}
                  </SelectContent>
              </Select>

            <div className="w-px h-8 bg-gray-300"></div>

              <Select onValueChange={(value) => {
                  editSearchValueHandler({ key: "type", value: value})
              }}>
                  <SelectTrigger className="px-4 py-3 border-none text-[#6A6A6A] focus:border-none active:border-none shadow-none focus:ring-0 h-full">
                      <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="1">1 bedroom</SelectItem>
                      <SelectItem value="2">2 bedrooms</SelectItem>
                      <SelectItem value="3">3 bedrooms</SelectItem>
                      <SelectItem value="4">4 bedrooms</SelectItem>
                      <SelectItem value="5">5 bedrooms</SelectItem>
                      <SelectItem value="6">6 bedrooms</SelectItem>
                      <SelectItem value="7">7 bedrooms</SelectItem>
                      <SelectItem value="8">9 bedrooms</SelectItem>
                  </SelectContent>
              </Select>

            <div className="w-px h-8 bg-gray-300"></div>

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