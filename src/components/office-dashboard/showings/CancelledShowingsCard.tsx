import {Notebook} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {apiCountGetShowings} from "@/api/showings.api.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";

function CancelledShowingsCard() {

    const { data: count, isPending } = useQuery<number>({ queryKey: ['count-showings', "cancelled" ], queryFn: () => apiCountGetShowings( { status: "cancelled" } ) });

    if ( isPending ) {
        return (
            <Skeleton className="border rounded-md p-6 w-full h-32" />
        );
    }

    return (
        <div className="border rounded-md p-6 w-full h-32 bg-white text-center flex flex-col justify-between items-center">
            <div className="mb-2">
                <Notebook className="w-7 h-7 text-gray-600" />
            </div>

            <p className="text-gray-600">Cancelled Schedules</p>
            <p className="text-black font-semibold text-lg font-[inter]"> { count } </p>
        </div>
    )
}

export default CancelledShowingsCard