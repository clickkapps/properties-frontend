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
import {isAllDigits} from "@/lib/utils.ts";


function PhoneVerificationPage({ onCancelVerification, phone, serverId } : { onCancelVerification?: () => void, phone: string, serverId: string }) {

    const {
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<{ otp: string }>()

    const inputRef = useRef<string>()

    const { mutate, isPending } = useMutation({
        mutationKey: ['otp'],
        mutationFn: apiVerifyPhoneOTP,
        onSuccess: async (data) => {
            console.log("on success", data);
            reset()
        },
        onError: async (error) => {
            console.log("on error", error.message);
            setError("otp", {
                type: "manual",
                message: error.message,
            })
        },
    })

    function submitHandler(value?: string) {
        const input = value || inputRef.current

        if(input == undefined || input?.length < 6 || !isAllDigits(input)) {
            setError('otp', {
                type: "manual",
                message: "Invalid verification code",
            })
            return
        }
        mutate({otp: input, serverId: serverId})
    }

    function otpCompleteHandler(value: string) {
        inputRef.current = value
        submitHandler(value)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(() => submitHandler())}>
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
                    type="submit"

                    // onClick={() => navigate('/agent')}
                >
                    {isPending && <LoaderCircle className="animate-spin"/>}
                    {!isPending && <span>Confirm</span>}
                </Button>

                <Button variant={'link'} onClick={onCancelVerification} >Or use a different phone number</Button>

            </div>
        </form>
    )
}

export default PhoneVerificationPage