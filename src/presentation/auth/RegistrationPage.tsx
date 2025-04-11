import Navbar from "@/components/website/Navbar.tsx";
import Footer from "@/components/website/Footer.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LoaderCircle} from "lucide-react";
import {useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {customLog} from "@/lib/utils.ts";
import {AxiosError} from "axios";
import {useToast} from "@/hooks/use-toast.ts";
import {RegistrationFormInputs} from "@/lib/types";
import {apiUpdateCurrentUserInfo} from "@/api/user.api.ts";
import {useDispatch} from "react-redux";
import {login} from "@/store/auth-slice.ts";
import {useLoaderData, useNavigate} from "react-router";


function RegistrationPage() {

    const { toast } = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUserInfo =  useLoaderData();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegistrationFormInputs>({
        defaultValues: {
            firstName: currentUserInfo.firstName,
            lastName: currentUserInfo.lastName,
            contactPhone: currentUserInfo.contactPhone,
            contactEmail: currentUserInfo.contactEmail,
        }
    })

    const { mutate, isPending, } = useMutation({
        mutationKey: ['updateCurrentUserInfo'],
        mutationFn: apiUpdateCurrentUserInfo,
        onSuccess: async (res) => {

            customLog("Registration completed", res.data);
            // const data = rep.data;
            const userInfo = res.data;
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            dispatch(login({ userInfo: userInfo }))
            reset()
            toast({
                variant: "default",
                title: "Akwaaba!",
                description: "Welcome to Your Account",
            })
            navigate('/account/agent')

        },
        onError: async (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            customLog("on error", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: axiosError.response?.data?.message || "Sorry! connection failed",
            })
        },
    })

    function submitHandler(data: RegistrationFormInputs) {
        console.log('Form submitted!', data.contactPhone);
        mutate(data)
    }

    return (
        <div className="md:bg-gray-100 bg-white overflow-y-auto">
            <Navbar className="fixed bg-black w-full z-20 " animate={false}/>
            <div className="h-4 md:h-16"></div>

            <div className="flex items-center justify-center mt-12">
                <div className="bg-white p-8 w-full md:w-[500px]">
                    <h2 className="text-center text-lg font-semibold">Complete your details</h2>

                    <form onSubmit={handleSubmit(submitHandler)} className="my-12 flex flex-col gap-8">
                        <div>
                            <label className="block text-sm  mb-1">First name</label>
                            <Input
                                {...register('firstName', {
                                    required: {
                                        value: true,
                                        message: "Enter your first name here"
                                    },
                                })}
                                placeholder="Enter first name here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                            {
                                errors.firstName && (<p className="text-[11px] mt-2 text-red-700">
                                    {/*We'll send you a verification code to confirm your phone number.*/}
                                    {errors.firstName?.message}
                                </p>)
                            }
                        </div>
                        <div>
                            <label className="block text-sm  mb-1">Last name</label>
                            <Input
                                {...register('lastName', {
                                    required: {
                                        value: true,
                                        message: "Enter your last name here"
                                    },
                                }) }
                                placeholder="Enter last name here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                            {
                                errors.lastName && (<p className="text-[11px] mt-2 text-red-700">
                                    {/*We'll send you a verification code to confirm your phone number.*/}
                                    {errors.lastName?.message}
                                </p>)
                            }
                        </div>

                        <div>
                            <label className="block text-sm  mb-1">Email address</label>
                            <Input
                                { ...register('contactEmail', {
                                    required: {
                                        value: true,
                                        message: "Enter your email here"
                                    },
                                }) }
                                placeholder="Enter email here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                            {
                                errors.contactEmail && (<p className="text-[11px] mt-2 text-red-700">
                                    {/*We'll send you a verification code to confirm your phone number.*/}
                                    {errors.contactEmail?.message}
                                </p>)
                            }
                        </div>

                        <div>
                            <label className="block text-sm  mb-1">Phone number</label>
                            <Input
                                { ...register('contactPhone', {
                                    required: {
                                        value: true,
                                        message: "Enter your phone number here"
                                    },
                                }) }
                                placeholder="Enter phone here"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                            {
                                errors.contactPhone && (<p className="text-[11px] mt-2 text-red-700">
                                    {/*We'll send you a verification code to confirm your phone number.*/}
                                    {errors.contactPhone?.message}
                                </p>)
                            }
                        </div>

                        <Button
                            className="w-full bg-red-600 text-white rounded-lg mt-4  py-6"
                            type="submit"
                        >
                            {isPending && <LoaderCircle className="animate-spin"/>}
                            {!isPending && <span>Update profile</span>}
                        </Button>

                    </form>

                </div>
            </div>

            <div className="h-4 md:h-16"></div>
            <Footer/>
        </div>
    )
}

export default RegistrationPage