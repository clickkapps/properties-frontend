import {AdvertisementFormInputs, InnerFormComponent} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";
import {apiPostNewAd} from "@/api/ads.api.ts";
import {useForm} from "react-hook-form";
import {useCallback, useEffect, useRef} from "react";
import {toast} from "@/hooks/use-toast.ts";
import {customLog} from "@/lib/utils.ts";
import {AxiosError} from "axios";
import {Button} from "@/components/ui/button.tsx";
import {LoaderCircle} from "lucide-react";
import FileSelector from "@/components/shared-dashboard/FileSelector.tsx";
import {Input} from "@/components/ui/input.tsx";
import useGetPackageBill from "@/hooks/use-get-package-bill.ts";
import * as React from "react";
import {DateRange} from "react-day-picker";
import usePurchasePackage from "@/hooks/use-purchase-package.ts";
import {useAppSelector} from "@/hooks";
import DateRangePickerInput from "@/components/ui/DateRangePickerInput.tsx";
import {addDays} from "date-fns";


function AddNewAdvertisementPage() {

    const formDataRef = useRef<FormData>(new FormData());
    const imagesRef = useRef<InnerFormComponent>(null);
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<AdvertisementFormInputs>()

    const { userInfo: currentUser } = useAppSelector(state => state.auth )
    const { mutate: mutateCreateAdvertisement, isPending: isPendingCreateAdvertisement } = useMutation({
        mutationKey: ['add-new-ad'],
        mutationFn: apiPostNewAd,
        onSuccess: async (resp) => {
            // const data = resp.data;
            customLog("added property:", resp.data)
            toast({
                title: "Rocket! 🚀🚀🚀",
                description: "Advertisement created. It will kick off as scheduled",
            })
            reset()
            imagesRef.current?.clear()

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



    // called when payment is completed
    const onPurchaseSuccessFn = useCallback(({subId}: {subId:number, extra?: {userId?:number, propertyId?: number}}) => {
        //  if modal is closed reopen it
        formDataRef.current.append("subscriptionId", String(subId))

        // create promotion
        mutateCreateAdvertisement(formDataRef.current)

    }, [mutateCreateAdvertisement])


    const { isGetPackageBillPending, getPackageBillFn, bill } = useGetPackageBill()
    const { processPaymentFn, isPurchasePackagePending } = usePurchasePackage(onPurchaseSuccessFn)

    useEffect(() => {

        if(Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0] as keyof AdvertisementFormInputs;
            const firstErrorMessage = errors[firstErrorKey]?.message;
            toast({
                title: "Uh oh! Something went wrong",
                description: firstErrorMessage,
                variant: "destructive"
            })
        }

    }, [errors]);


    const submitHandler = (data: AdvertisementFormInputs) => {

        if(!data.image) {
            toast({
                variant: "destructive",
                title: "Flyer for advert not selected",
                description: "Please set a valid image for the advertisement",
            })
            return
        }

        if(!data.contactPhone) {
            toast({
                variant: "destructive",
                title: "Missing contact phone",
                description: "Please set a valid phone number",
            })
            return
        }

        formDataRef.current.append("contactPhone", data.contactPhone);

        if(data.contactEmail) {
            formDataRef.current.append("contactEmail", data.contactEmail);
        }
        if(data.link) {
            formDataRef.current.append("link", data.link);
        }


        formDataRef.current.append("image", data.image);


        if(!(date?.from) || !(date?.to)) {
            toast({
                variant: "destructive",
                title: "Invalid data selected",
                description: "Please select a valid date range",
            })
            return;
        }

        formDataRef.current.append("endDate", date?.to?.toISOString());
        formDataRef.current.append("startDate",  date?.from?.toISOString());

        processPaymentFn({
            packageSlug: "advertisement",
            startDate: date?.to?.toISOString(),
            endDate: date?.from?.toISOString(),
        })


    }

    const filesChangeHandler = useCallback((files: File[]) => {
        if(files && files.length > 0) {
            setValue("image", files[0])
        }

    }, [setValue])

    const [date, setDate] = React.useState<DateRange | undefined>( {
        from: addDays(new Date(), 1),
        to: addDays(new Date(), 8),
    })

    useEffect(() => {
        console.log("use Effect called")
        getPackageBillFn({
            startDate: date?.from?.toISOString(),
            endDate: date?.to?.toISOString(),
            packageSlug: "advertisement",
        })
    }, [date?.from, date?.to, getPackageBillFn]);

    return (
        <div className="container mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-semibold ">Publish a new Ad</h2>
                <p>Advertisements will show on the main website page</p>
            </div>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="border bg-white px-10 py-6 mb-10 space-y-6">

                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-6"> Image </h2>
                        <h3 className="text-md font-medium mb-2">Attach an image of the Ad</h3>

                        <FileSelector onChange={filesChangeHandler} ref={imagesRef} multiple={false}/>

                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label className="block text-sm mb-1">Date range</label>
                            <DateRangePickerInput defaultValue={date} onSelectionChangedFn={setDate} fromDate={addDays(new Date(), 1)} />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Contact person's phone number</label>
                            <Input placeholder="eg. 0541234567"
                                   {...register('contactPhone')}
                                   defaultValue={currentUser?.contactPhone}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Contact person's email</label>
                            <Input placeholder="eg. john@example.com"
                                {...register('contactEmail')}
                                defaultValue={currentUser?.contactEmail}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Any related link</label>
                            <Input placeholder="eg. https://mywebsite.com"
                                   { ...register('link') }
                            />
                        </div>
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <div className="flex justify-end gap-4 pt-6 pb-6">
                        <Button
                            type="submit"
                            className="bg-primary text-white px-6"
                            disabled={isPendingCreateAdvertisement || isGetPackageBillPending || isPurchasePackagePending}
                        >
                            {(isPendingCreateAdvertisement || isGetPackageBillPending || isPurchasePackagePending) ? (<LoaderCircle className="animate-spin"/>) : (
                                <span>Post Advert <span className="font-[Inter]">{bill && `at ${bill.currency} ${bill.amountToPay}`}</span> </span>)}

                        </Button>
                        <Button variant="outline" type={"button"} onClick={() => reset()}
                                className="border border-gray-400 text-black px-6">
                            Cancel
                        </Button>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default AddNewAdvertisementPage;