import {useMutation} from "@tanstack/react-query";
import {apiGetUserInfo} from "@/api/users.api.ts";
import {updateAuthUser} from "@/store/auth-slice.ts";
import {AxiosError} from "axios";
import {useDispatch} from "react-redux";

function useGetCurrentUser({onSuccessFn, onErrorFn} : { onSuccessFn: () => void, onErrorFn: (error?: string) => void }) {

    const dispatch = useDispatch()

    const { mutate: mutateGetCurrentUser, isPending: inPendingGetCurrentUser } = useMutation({
        mutationKey: ['getUserInfo'],
        mutationFn: apiGetUserInfo,
        onSuccess: async (res) => {
            const userInfo = res.data;

            dispatch(updateAuthUser({ userInfo: userInfo }))

            onSuccessFn()
        },
        onError: async (error ) => {
            const axiosError = error as AxiosError<{ message: string }>;
            onErrorFn(axiosError.response?.data?.message ?? error.message)
        }
    })

    return  {
        mutateGetCurrentUser,
        inPendingGetCurrentUser
    }
}

export default useGetCurrentUser;