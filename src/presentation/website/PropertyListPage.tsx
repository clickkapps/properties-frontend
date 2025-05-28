import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
// import HeaderImageItem1 from "@/assets/images/header-image-item-1.svg";
import {useSearchParams} from "react-router";
import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropertyModel} from "@/lib/types";
import {apiGetProperties} from "@/api/properties.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import MobileSearchBar from "@/components/website/MobileSearchBar.tsx";
import SearchbarExtendedForm from "@/components/website/SearchbarExtendedForm.tsx";
import {Badge} from "@/components/ui/badge.tsx";

function PropertyListPage() {

    const [searchParams] = useSearchParams();
    const filters = {
        offerType: searchParams.get('offerType'),
        region: searchParams.get('region'),
        country: searchParams.get('country'),
        currency: searchParams.get('currency'),
        bedrooms: searchParams.get('bedrooms'),
        washrooms: searchParams.get('washrooms'),
        kitchens: searchParams.get('kitchens'),
        amount: searchParams.get('amount'),
        promoted: searchParams.get('promoted'),
        search: searchParams.get('search')
    }

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
            {/* content */}
            <div className="hidden h-[20vh] bg-[#F5F5F5] py-12">
                {/*<img src={HeaderImageItem1} alt="" className="w-full object-cover h-[20vh] absolute"/>*/}
                <MobileSearchBar/>
                <div className="flex flex-wrap">

                </div>
            </div>

            <div className="container mx-auto">

                <div className="flex flex-col md:flex-row font-normal text-xl md:text-3xl py-6">
                    <div className="w-full md:w-[25%] text-center md:text-start">
                        Properties Available
                    </div>
                    <div className="w-full md:w-[75%] flex flex-wrap px-8 md:px-0 pt-4 md:pt-0">
                        <Badge className="bg-black">All</Badge>
                    </div>

                </div>

                {/*<div className="h-16 md:h-16 "></div>*/}

                <div className="flex flex-row mt-4 ">
                    {/* Search bar on wider screen*/}
                    <div className="hidden md:block md:w-[23%]">
                        <div className="border pl-8 pr-8 pt-4 pb-8">
                            <h2 className="text-xl mb-4">Apply filters</h2>
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