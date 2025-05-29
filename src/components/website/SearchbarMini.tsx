import {Search} from "lucide-react"
import { useState} from "react";
import {useNavigate} from "react-router";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {ghRegions} from "@/constants/ui.constants.ts";
import {Input} from "@/components/ui/input.tsx";
import MobileSearchBar from "@/components/website/MobileSearchBar.tsx";


const SearchbarMini = () => {

    const navigate = useNavigate()
    const [searchValues, setSearchValues] = useState<Record<string, string> | undefined >(undefined)

    console.log("searchValues => ", searchValues)


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
          <div className={`bg-white p-2 rounded-full hidden md:flex items-center w-full max-w-5xl mx-auto animated fadeInUp animate__delay-5s`}>


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
                          <SelectItem key={region} value={region}>{ region }</SelectItem>
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
                      <SelectItem value="2">2 rooms</SelectItem>
                      <SelectItem value="3">3 rooms</SelectItem>
                      <SelectItem value="4">4 rooms</SelectItem>
                      <SelectItem value="5">5 rooms</SelectItem>
                      <SelectItem value="6">6 rooms</SelectItem>
                      <SelectItem value="7">7 rooms</SelectItem>
                      <SelectItem value="8">9 rooms</SelectItem>
                  </SelectContent>
              </Select>

            <div className="w-px h-8 bg-gray-300"></div>

            <Input
                type="text"
                   placeholder="Location"
                   className="w-full bg-transparent px-4 py-3 text-[#6A6A6A] shadow-none active:border-none focus:border-none h-full focus-visible:outline-none focus-visible:ring-0 border-none"
            />

            <button
                onClick={() => {
                    navigate('/properties')
                }}
                className="flex items-center justify-center bg-[#e50005] rounded-full px-4 py-3 space-x-2 text-white font-semibold hover:bg-red-700">
              <Search className="w-5 h-5"/>
              <span>Search</span>
            </button>

          </div>
          {/* Mobile Screen  */}
          <MobileSearchBar />

        </>
    )
}

export default SearchbarMini