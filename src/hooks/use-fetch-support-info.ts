import {useQuery} from "@tanstack/react-query";
import {User} from "@/lib/types";
import {apiGetIndexInfo} from "@/api/system.api.ts";

function useFetchSupportInfo() {

    const { isPending, data } = useQuery<User>({
        queryKey: ["fetchSupportInfo"],
        queryFn: () => apiGetIndexInfo(),
    });

    return {
        isFetchingSupportInfo: isPending,
        supportInfo: data
    }

}

export default useFetchSupportInfo;