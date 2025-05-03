import {useMutation} from "@tanstack/react-query";
import {apiGetPackageBill} from "@/api/subscription.api.ts";
import {AxiosError} from "axios";
import {customLog} from "@/lib/utils.ts";
import {PurchasePackageParams} from "@/lib/types";
import {useCallback} from "react";

function useGetPackageBill() {

    const { mutate, isPending, data } = useMutation({
        mutationKey: ['getPackageBill'],
        mutationFn: apiGetPackageBill,
        // onSuccess: ({data}) => {
        //     console.log("package bill", data);
        // },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            customLog("on error", axiosError.message);
        }
    })

    const getBillHandler = useCallback((payload: PurchasePackageParams) => {
        mutate(payload)
    }, [mutate])

    return {
        getPackageBillFn: getBillHandler,
        isGetPackageBillPending: isPending,
        bill: data ? data.data : undefined
    }
}

export default useGetPackageBill;