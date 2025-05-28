import {useQuery} from "@tanstack/react-query";
import {User} from "@/lib/types";
import {apiGetUserSupportInfo} from "@/api/users.api.ts";

function useFetchSupportInfo() {

    const { isPending, data } = useQuery<User>({
        queryKey: ["fetchSupportInfo"],
        queryFn: () => apiGetUserSupportInfo(),
    });

    return {
        isFetchingSupportInfo: isPending,
        supportInfo: data
    }

}

export default useFetchSupportInfo;