import {Input} from "@/components/ui/input.tsx";
import {Search} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ghRegions} from "@/constants/ui.constants.ts";
import {useDebouncedCallback} from "use-debounce";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {useLocation, useNavigate} from "react-router";
import usePropertyFilters from "@/hooks/use-property-filters.ts";

type Props = {
    showSearchButton?: boolean;
    onSearchBtnTapped?: () => void;
    onClearBtnTapped?: () => void;
}

function SearchbarExtendedForm({ showSearchButton, onSearchBtnTapped, onClearBtnTapped }: Props = { showSearchButton: true} ) {

    const filters = usePropertyFilters()

    const navigate = useNavigate()
    const location = useLocation();


    const updateQueryParam = (key: string, value: string) => {
        const params = new URLSearchParams(location.search);
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

    const clearAll = () => {
        navigate(location.pathname); // Removes all query parameters
        if(onClearBtnTapped) {
            onClearBtnTapped()
        }
    }

    const navigateToProperties = () => {
        if(onSearchBtnTapped) {
            onSearchBtnTapped()
        }
        const params = new URLSearchParams(location.search);
        navigate(`/properties?${params.toString()}`);
    }

    return (
        <>
            <div className="w-full h-full rounded-xl bg-white relative">

                {/* Fields */}
                <div className="space-y-3">

                    <div>
                        <label className="block text-sm mb-1">General Search</label>
                        <Input placeholder="Search here" defaultValue={filters.search || ""} className="py-6 shadow-none" autoFocus={true}
                               onChange={(e) => debouncedSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Set maximum price</label>
                        <Input defaultValue={filters.maxAmount || ""} placeholder="Maximum maxAmount" className="py-6 shadow-none font-[Inter]" autoFocus={false} type={"number"}
                               onChange={(e) => debouncedMaxAmount(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Set currency</label>
                        <Select defaultValue={filters.currency || ""} onValueChange={(value) => {
                            updateQueryParam("currency", value)
                        }}>
                            <SelectTrigger className="px-4 py-3 text-[#6A6A6A] shadow-none focus:ring-0 h-full">
                                <SelectValue placeholder="Currency"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="GHS">GHS</SelectItem>
                                <SelectItem value="USD">USD</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Set property type</label>
                        <Select defaultValue={filters.offerType || ""} onValueChange={(value) => {
                            if(value == "any") {
                                updateQueryParam("offerType", "")
                                return
                            }
                            updateQueryParam("offerType", value)
                        }}>
                            <SelectTrigger className="px-4 py-3 text-[#6A6A6A] shadow-none focus:ring-0 h-full">
                                <SelectValue placeholder="Property Type"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="rent">For Rent</SelectItem>
                                <SelectItem value="sale">For Sale</SelectItem>
                                <SelectItem value="any">Any</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Select region</label>
                        <Select defaultValue={filters.region || ""} onValueChange={(value) => {
                            updateQueryParam("region", value)
                        }}>
                            <SelectTrigger className="px-4 py-3 text-[#6A6A6A] shadow-none focus:ring-0 h-full">
                                <SelectValue placeholder="Region"/>
                            </SelectTrigger>
                            <SelectContent>
                                {ghRegions.map((region) => (
                                    <SelectItem key={region} value={region}>{region}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <label className="block text-sm mb-1">Select rooms</label>
                        <Select defaultValue={filters.rooms || ""} onValueChange={(value) => {
                            updateQueryParam("rooms", value)
                        }}>
                            <SelectTrigger className="px-4 py-3 text-[#6A6A6A] shadow-none focus:ring-0 h-full">
                                <SelectValue placeholder="Rooms"/>
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
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Set washrooms</label>
                        <Select defaultValue={filters.washrooms || ""} onValueChange={(value) => {
                            updateQueryParam("washrooms", value)
                        }}>
                            <SelectTrigger className="px-4 py-3 text-[#6A6A6A]shadow-none focus:ring-0 h-full">
                                <SelectValue placeholder="Washrooms"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 washroom</SelectItem>
                                <SelectItem value="2">2 washrooms</SelectItem>
                                <SelectItem value="3">3 washrooms</SelectItem>
                                <SelectItem value="4">4 washrooms</SelectItem>
                                <SelectItem value="5">5 washrooms</SelectItem>
                                <SelectItem value="6">6 washrooms</SelectItem>
                                <SelectItem value="7">7 washrooms</SelectItem>
                                <SelectItem value="8">9 washrooms</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center space-x-2 py-2">
                        <Checkbox checked={ filters.promoted == "true" } id="terms" onCheckedChange={(checked) => {
                            updateQueryParam("promoted", checked ? "true" : "")
                        }}/>
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            show only promoted properties
                        </label>
                    </div>

                </div>

                {/* Bottom Buttons */}
                <div className="flex justify-between items-center mt-5">
                    <button type='reset' className="font-semibold underline" onClick={clearAll}>Clear all</button>
                    {
                        (showSearchButton && <button
                            type='button'
                            onClick={navigateToProperties}
                            className="flex items-center gap-2 bg-[#e50005] text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700">
                            <Search className="w-5 h-5"/> Search
                        </button>)
                    }
                </div>

            </div>
        </>
    )
}

export default SearchbarExtendedForm;