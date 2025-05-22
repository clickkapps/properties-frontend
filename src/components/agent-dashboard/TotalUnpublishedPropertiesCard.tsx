import {FactoryIcon, MoreHorizontal} from "lucide-react"
import {useQuery} from "@tanstack/react-query";
import {apiCountProperties} from "@/api/properties.api.ts";

type Props = {
    userId?: number
}
const TotalUnpublishedPropertiesCard = ({ userId }: Props) => {

    const { isPending, data } = useQuery<{ count: number }>({ queryKey: ['fetch-unpublished-properties-count'], queryFn: () => apiCountProperties({
            userId: userId,
            endpoint: "/count",
            filters: {
                published: false
            }
        }) });


    return (
        <div
            className="border rounded-md p-6 w-full h-32 bg-white text-center flex flex-col justify-between items-center">
            <div className="mb-2">
                <FactoryIcon className="w-7 h-7 text-gray-600"/>
            </div>

            <p className="text-gray-600">Unpublished properties</p>
            <p className="text-black font-semibold text-lg">
                {isPending && <span> <MoreHorizontal/> </span>}
                {data && <span className="font-[Inter]"> {data.count} </span>}
            </p>
        </div>
    )
}

export default TotalUnpublishedPropertiesCard