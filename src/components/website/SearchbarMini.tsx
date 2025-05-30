import {Search} from "lucide-react"
import {useMemo} from "react";
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
import {useDebouncedCallback} from "use-debounce";


const SearchbarMini = () => {

    const navigate = useNavigate()
    const params = useMemo(() => {
        return new URLSearchParams(location.search)
    }, []);


    const updateQueryParam = (key: string, value: string) => {
        if (value) {
            params.set(key, value); // Add or update the parameter
        } else {
            params.delete(key); // Remove the parameter if value is empty
        }
        navigate(`/properties?${params.toString()}`);
    };

    // Debounce callback
    const debouncedSearch = useDebouncedCallback(
        // function
        (value) => {
            // setValue(value);
            updateQueryParam('search', value);
        },
        // delay in ms
        1000
    );

    const debouncedMaxAmount = useDebouncedCallback(
        // function
        (value) => {
            // setValue(value);
            updateQueryParam('maxAmount', value);
        },
        // delay in ms
        1000
    );

    return (
        <>
          {/* Destop */}
            <div
                className={`bg-white p-2 rounded-full hidden md:flex items-center w-full max-w-5xl mx-auto animated fadeInUp animate__delay-5s`}>

                <Input
                    type="text"
                    placeholder="Search here"
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="w-full bg-transparent px-4 py-3 text-[#6A6A6A] shadow-none active:border-none focus:border-none h-full focus-visible:outline-none focus-visible:ring-0 border-none"
                />

                <div className="w-px h-8 bg-gray-300"></div>

                <Select onValueChange={(value) => {
                    if (value == "any") {
                        updateQueryParam("offerType", "")
                        return
                    }
                    updateQueryParam("offerType", value)
                }}>
                    <SelectTrigger
                        className="px-4 py-3 border-none text-[#6A6A6A] focus:border-none active:border-none shadow-none focus:ring-0 h-full">
                        <SelectValue placeholder="Property Type"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="rent">For Rent</SelectItem>
                        <SelectItem value="sale">For Sale</SelectItem>
                        <SelectItem value="any">All</SelectItem>
                    </SelectContent>
                </Select>

                <div className="w-px h-8 bg-gray-300"></div>

                <Select onValueChange={(value) => {
                    updateQueryParam("region", value)
                }}>
                    <SelectTrigger
                        className="px-4 py-3 border-none text-[#6A6A6A] focus:border-none active:border-none shadow-none focus:ring-0 h-full">
                        <SelectValue placeholder="Region"/>
                    </SelectTrigger>
                    <SelectContent>
                        {ghRegions.map((region) => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="w-px h-8 bg-gray-300"></div>

                <Input
                    type={"number"}
                    placeholder="Maximum price"
                    onChange={(e) => debouncedMaxAmount(e.target.value)}
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