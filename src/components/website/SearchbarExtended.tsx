import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import MobileSearchBar from "@/components/website/MobileSearchBar.tsx";

function SearchbarExtended() {
    return (
        <>
            <div className="hidden md:block bg-white py-4 px-8 max-w-7xl mx-auto w-full animated fadeInUp animate__delay-5s">
                <p className="my-4">Apply filters</p>
                <div className="grid grid-rows-3">
                    <Select
                        onValueChange={(value) => {
                            console.log(value)
                        }}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Country"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Ghana">P</SelectItem>
                            {/*<SelectItem value="Canada">Canada</SelectItem>*/}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <MobileSearchBar />
        </>
    )
}

export default SearchbarExtended;