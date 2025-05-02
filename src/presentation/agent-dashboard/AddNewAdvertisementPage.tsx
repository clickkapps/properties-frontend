import {AdvertisementFormInputs, InnerFormComponent} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";
import {apiPostNewAd} from "@/api/ads.api.ts";
import {useForm} from "react-hook-form";
import {useCallback, useEffect, useRef} from "react";
import {toast} from "@/hooks/use-toast.ts";
import {cn, customLog} from "@/lib/utils.ts";
import {AxiosError} from "axios";
import { Calendar } from "@/components/ui/calendar"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {Button} from "@/components/ui/button.tsx";
import {CalendarIcon, LoaderCircle} from "lucide-react";
import {format} from "date-fns";
import FileSelector from "@/components/shared-dashboard/FileSelector.tsx";
import {Input} from "@/components/ui/input.tsx";
import {apiPostNewAdvertisement} from "@/api/advertisement.api.ts";


function AddNewAdvertisementPage() {

    const imagesRef = useRef<InnerFormComponent>(null);
    const {
        // register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<AdvertisementFormInputs>()

    // Watch the "startDate" field to trigger re-renders
    const watchedStartDate = watch("startDate");
    const watchedEndDate = watch("endDate");

    const { mutate: mutateCreateAdvertisement, isPending: isPendingCreateAdvertisement } = useMutation({
        mutationKey: ['create-advertisement'],
        mutationFn: apiPostNewAdvertisement,
        onSuccess: async (resp) => {

        },
        onError: async (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: axiosError.response?.data?.message || "Sorry! connection failed",
            });
        }
    })

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

    const { mutate, isPending } = useMutation({
        mutationKey: ['add-new-ad'],
        mutationFn: apiPostNewAd,
        onSuccess: async (resp) => {
            // const data = resp.data;
            customLog("added property:", resp.data)
            toast({
                title: "Great!",
                description: "Property added successfully!",
            })
            reset()
            // imagesRef.current?.clear()

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

    const submitHandler = (data: AdvertisementFormInputs) => {
        const formData = new FormData();
        formData.append("title", data.title);
        mutate(formData)
    }

    const filesChangeHandler = useCallback((files: File[]) => {
        if(files && files.length > 0) {
            setValue("image", files[0])
        }

    }, [setValue])

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Publish a new Ad</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="border bg-white px-10 py-6 mb-10 space-y-6">

                    <div className="mt-4">
                        <h2 className="text-xl font-semibold mb-6"> Image </h2>
                        <h3 className="text-md font-medium mb-2">Attach an image of the Ad</h3>

                        <FileSelector onChange={filesChangeHandler} ref={imagesRef} multiple={false}/>

                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label className="block text-sm mb-1" htmlFor="start_date">Start from*</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !watchedStartDate && "text-muted-foreground"
                                        )}
                                    >
                                        {watchedStartDate ? (
                                            format(watchedStartDate, "PPP")
                                        ) : (
                                            <span>Pick start date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={watchedStartDate}
                                        onSelect={(date: Date | undefined) => setValue("startDate", date)}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="w-full">
                            <label className="block text-sm mb-1" htmlFor="start_date">End at*</label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !watchedEndDate && "text-muted-foreground"
                                        )}
                                    >
                                        {watchedEndDate ? (
                                            format(watchedEndDate, "PPP")
                                        ) : (
                                            <span>Pick end date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={watchedEndDate}
                                        onSelect={(date: Date | undefined) => setValue("endDate", date)}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                        // initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Contact person's phone number</label>
                            <Input placeholder="eg. 0541234567"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Contact person's email</label>
                            <Input placeholder="eg. john@example.com"/>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm mb-1">Any related link</label>
                            <Input placeholder="eg. https://mywebsite.com"/>
                        </div>
                    </div>

                    {/* Submit & Cancel Buttons */}
                    <div className="flex justify-end gap-4 pt-6 pb-6">
                        <Button
                            type="submit"
                            className="bg-primary text-white px-6"
                            disabled={isPending}
                        >
                            {isPending && <LoaderCircle className="animate-spin"/>}
                            {!isPending && <span>Submit Property</span>}

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