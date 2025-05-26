import PropertyListItem from "@/components/website/PropertyListItem.tsx";
import {useQuery} from "@tanstack/react-query";
import {PropertyModel} from "@/lib/types";
import {apiGetProperties} from "@/api/properties.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

type Props = {
    propertyId?: number
}
function RelatedProperties({ propertyId }: Props) {

        const { data, isPending } = useQuery<PropertyModel[]>({ queryKey: ['fetch-related-properties'], queryFn: () => apiGetProperties( {
                endpoint: "/public/related/"+propertyId
            } ) });


    return (
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
    )
}

export default RelatedProperties