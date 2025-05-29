import {useSearchParams} from "react-router";

function usePropertyFilters() {
    const [searchParams] = useSearchParams();
    return {
        offerType: searchParams.get('offerType'),
        region: searchParams.get('region'),
        country: searchParams.get('country'),
        currency: searchParams.get('currency'),
        rooms: searchParams.get('rooms'),
        washrooms: searchParams.get('washrooms'),
        kitchens: searchParams.get('kitchens'),
        maxAmount: searchParams.get('maxAmount'),
        promoted: searchParams.get('promoted'),
        search: searchParams.get('search')
    };
}

export default usePropertyFilters;