import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
// import HeaderImageItem1 from "@/assets/images/header-image-item-1.svg";
import {useSearchParams} from "react-router";
import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import SearchbarExtended from "@/components/website/SearchbarExtended.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropertyModel} from "@/lib/types";
import {apiGetProperties} from "@/api/properties.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function PropertyListPage() {

    const [searchParams] = useSearchParams();
    const filters = {
        offerType: searchParams.get('offerType'),
        region: searchParams.get('region'),
        country: searchParams.get('country'),
        currency: searchParams.get('currency'),
        address: searchParams.get('address'),
        title: searchParams.get('title'),
        description: searchParams.get('description'),
        bedrooms: searchParams.get('bedrooms'),
        washrooms: searchParams.get('washrooms'),
        kitchens: searchParams.get('kitchens'),
        amount: searchParams.get('amount'),
        promoted: searchParams.get('promoted'),
        search: searchParams.get('search')
    }

    const { data, isPending } = useQuery<PropertyModel[]>({ queryKey: ['fetch-filtered-properties'], queryFn: () => apiGetProperties( {
            endpoint: "/public/filtered",
            filters: filters
        } ) });

    return (
        <>
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-16 md:h-16"></div>
            {/* content */}
            <div className="h-[20vh] md:h-auto bg-[#F5F5F5] py-12">
                {/*<img src={HeaderImageItem1} alt="" className="w-full object-cover h-[20vh] absolute"/>*/}
                <SearchbarExtended/>
            </div>

            <div className="container mx-auto">

                <h2 className="font-normal text-xl md:text-3xl py-6 text-center">
                    Properties For <span className="capitalize">{ filters.offerType || 'Sale'}</span>
                </h2>

                {/*<div className="h-16 md:h-16 "></div>*/}

                <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-10 mx-5 md:mx-0">
                    { isPending && Array.from({ length: 15 }).map( (_, index) => {
                        const key = `sk-${-index}`
                        return (
                            <Skeleton key={key} className="w-full h-full aspect-square rounded"/>
                        );
                    }) }
                    {data && data.map((item) => {
                        return (
                            <PropertyListItem property={item} key={item.id}/>
                        )
                    })}
                </div>

            </div>

            <div className="h-20"></div>
            <Footer/>

        </>
    )
}

export default PropertyListPage