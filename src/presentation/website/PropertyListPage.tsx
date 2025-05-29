import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
// import HeaderImageItem1 from "@/assets/images/header-image-item-1.svg";
import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropertyModel} from "@/lib/types";
import {apiGetProperties} from "@/api/properties.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import MobileSearchBar from "@/components/website/MobileSearchBar.tsx";
import SearchbarExtendedForm from "@/components/website/SearchbarExtendedForm.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import usePropertyFilters from "@/hooks/use-property-filters.ts";

function PropertyListPage() {

    const filters = usePropertyFilters()

    const { data, isPending } = useQuery<PropertyModel[]>({ queryKey: [
        'fetch-filtered-properties',
        ...Object.values(filters)
        ], queryFn: () => apiGetProperties( {
            endpoint: "/public/filtered",
            filters: filters
        } ) });



    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16"></div>

            <div className="container mx-auto">

                <div className="hidden md:flex flex-col md:flex-row font-normal text-xl md:text-3xl py-6">
                    <div className="w-full md:w-[25%] text-center md:text-start">
                        Apply Filters
                    </div>
                    <div className="w-full md:w-[75%]">
                        <Badge className="bg-black hidden md:inline py-2">filtered results</Badge>
                    </div>

                </div>

                <div className="text-center md:hidden">
                    <MobileSearchBar/>
                </div>

                {/*<div className="h-16 md:h-16 "></div>*/}

                <div className="flex flex-row mt-4 ">
                    {/* Search bar on wider screen*/}
                    <div className="hidden md:block md:w-[23%]">
                        <div className="border pl-8 pr-8 pt-8 pb-8">
                            <SearchbarExtendedForm/>
                        </div>
                    </div>
                    <div className="md:w-[2%]"></div>
                    {/* Property list on wider screen */}
                    <div className="w-full md:w-[75%]">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mx-5 md:mx-0">
                            {isPending && Array.from({length: 15}).map((_, index) => {
                                const key = `sk-${-index}`
                                return (
                                    <Skeleton key={key} className="w-full h-full aspect-square rounded"/>
                                );
                            })}
                            {data && data.map((item) => {
                                return (
                                    <PropertyListItem property={item} key={item.id}/>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>

            <div className="h-20"></div>
            <Footer/>

        </>
    )
}

export default PropertyListPage