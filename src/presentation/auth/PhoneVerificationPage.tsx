import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {LoaderCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useMutation} from "@tanstack/react-query";
import {apiVerifyPhoneOTP} from "@/api/auth.api.ts";
import {useForm} from "react-hook-form";
import {useRef} from "react";
import {customLog, isAllDigits} from "@/lib/utils.ts";
import { AxiosError } from "axios"
import {useNavigate} from "react-router";
import {appStorage} from "@/lib/storage.ts";
import useGetCurrentUser from "@/hooks/use-get-current-user.ts";


function PhoneVerificationPage({ onCancelVerification, phone, verificationRequirements } : { onCancelVerification?: () => void, phone: string, verificationRequirements: { serverId: string, isNew: boolean } }) {

    const {
        // handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<{ otp: string }>()

    const navigate = useNavigate()

    const inputRef = useRef<string>()
    const { mutateGetCurrentUser, inPendingGetCurrentUser} = useGetCurrentUser({
        onSuccessFn: () => {
            // redirect user to dashboard
            navigate('/account/agent')
        },
        onErrorFn: error => {
            setError("otp", {
                type: "manual",
                message: error,
            })
        }
    })

    const { mutate: mutateVerifyPhone, isPending: isPendingVerifyPhone } = useMutation({
        mutationKey: ['verifyPhone'],
        mutationFn: apiVerifyPhoneOTP,
        onSuccess: async (res) => {
            customLog("on success", res.data);
            // save
            const authToken = res.data;
            appStorage.setAccessToken(authToken)
            reset()

            mutateGetCurrentUser(undefined)

        },
        onError: async (error ) => {
            const axiosError = error as AxiosError<{ message: string }>;
            customLog("on error", axiosError.response?.data?.toString());
            setError("otp", {
                type: "manual",
                message: axiosError.response?.data?.message ?? error.message,
            })
        },
    })

    // storage.save("userInfo", userInfo)



    function submitHandler(value?: string) {
        console.log("submitHandler called", value)
        const input = value || inputRef.current

        if(input == undefined || input?.length < 6 || !isAllDigits(input)) {
            setError('otp', {
                type: "manual",
                message: "Invalid verification code",
            })
            return
        }
        mutateVerifyPhone({code: input, serverId: verificationRequirements.serverId, phone: phone})
    }

    function otpCompleteHandler(value: string) {
        inputRef.current = value
        submitHandler(value)
        reset()
    }

    return (
        <form>
            <div className="my-4 flex flex-col gap-4">
                <div className="animated fadeIn">
                    <p className="text-[11px] my-4">
                        Enter the verification code sent to your phone number ({phone}).
                    </p>
                    <InputOTP maxLength={6} onComplete={otpCompleteHandler}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>
                        </InputOTPGroup>
                        <InputOTPSeparator/>
                        <InputOTPGroup>
                            <InputOTPSlot index={3}/>
                            <InputOTPSlot index={4}/>
                            <InputOTPSlot index={5}/>
                        </InputOTPGroup>
                    </InputOTP>

                    {Object.keys(errors).length > 0 && (
                        <p className="text-[11px] mt-2 text-red-700">
                            {/*We'll send you a verification code to confirm your phone number.*/}
                            {errors.otp?.message}
                        </p>
                    )}
                </div>
                {/* Confirm Button */}

                <Button
                    className="w-full bg-red-600 text-white rounded-lg mt-4  py-6"
                    type="button"
                    onClick={() => submitHandler()}
                >
                    {inPendingGetCurrentUser || isPendingVerifyPhone && <LoaderCircle className="animate-spin"/>}
                    {!inPendingGetCurrentUser && !isPendingVerifyPhone && <span>Confirm</span>}
                </Button>

                <Button  type={"button"} variant={'link'} onClick={onCancelVerification} >Or use a different phone number</Button>

            </div>
        </form>
    )
}

export default PhoneVerificationPage