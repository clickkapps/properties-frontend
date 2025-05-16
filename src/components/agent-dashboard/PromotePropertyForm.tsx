import {forwardRef, ReactNode, Ref, useCallback, useEffect, useImperativeHandle, useState} from "react";
import {ModalHandle, PropertyModel} from "@/lib/types";
import {createPortal} from "react-dom";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {ChartNoAxesCombined, LoaderCircle} from "lucide-react";
import * as React from "react"
import { addDays, addMonths} from "date-fns"
import { DateRange } from "react-day-picker"

import {cn} from "@/lib/utils"
import {useMutation} from "@tanstack/react-query";
import { apiPromoteProperty} from "@/api/properties.api.ts";
import {AxiosError} from "axios";
import {toast} from "@/hooks/use-toast.ts";
import useGetPackageBill from "@/hooks/use-get-package-bill.ts";
import usePurchasePackage from "@/hooks/use-purchase-package.ts";
import DateRangePickerInput from "@/components/ui/DateRangePickerInput.tsx";


type Props = {
    children?: ReactNode,
    property: PropertyModel,
    className?: string,
    onPromoted?: (propertyId?: number) => void,
}
const PromotePropertyForm =  forwardRef(({ property, className, onPromoted }: Props , ref: Ref<ModalHandle | undefined>) => {

    const [open, setOpen] = useState(false);
    const { mutate: mutatePromoteProperty, isPending: isPendingPromoteProperty } = useMutation({
        mutationKey: ['promote-property'],
        mutationFn: apiPromoteProperty,
        onSuccess: async () => {
            // property has been promoted
            console.log("property has been promoted")
            setOpen(false);
            if(onPromoted) {
                onPromoted(property.id)
            }
            toast({
                variant: "default",
                title: "Good job 🚀🔥🔥",
                description: "This property will be promoted on the landing page as scheduled",
            });
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


    // called when payment is completed
    const onPurchaseSuccessFn = useCallback(({subId, extra}: {subId:number, extra?: {userId?:number, propertyId?: number}}) => {
        //  if modal is closed reopen it
        if(!open) {
            setOpen(true)
        }

        // create promotion
        mutatePromoteProperty({propertyId: extra?.propertyId, subscriptionId: subId})

    }, [mutatePromoteProperty, open])


    const { isGetPackageBillPending, getPackageBillFn, bill } = useGetPackageBill()
    const { processPaymentFn, isPurchasePackagePending } = usePurchasePackage(onPurchaseSuccessFn)

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: addDays(new Date(), 1),
        to: addMonths(new Date(), 1),
    })



    useEffect(() => {
        console.log("use Effect called")
        getPackageBillFn({
            startDate: date?.from?.toISOString(),
            endDate: date?.to?.toISOString(),
            packageSlug: "properties_promotion",
            propertyId: property.id,
        })
    }, [date?.from, date?.to, getPackageBillFn, property.id]);

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                setOpen(true);
            },
            close: () => {
                setOpen(false);
            }
        }
    })


    const onPromoteButtonClickHandler = () => {
        // check if user has subscribed
        setOpen(false);
        processPaymentFn({
            propertyId: property.id,
            packageSlug: "properties_promotion",
            startDate: date?.from?.toISOString(),
            endDate: date?.to?.toISOString(),
        })
    }



    return createPortal(
        <Dialog open={open} onOpenChange={setOpen}>
            {/*<DialogTrigger>Open</DialogTrigger>*/}
            <DialogContent>

                <DialogHeader>
                    <DialogTitle>Promote property</DialogTitle>
                    <DialogDescription>
                        "{property.title}" will be prioritised on the front page of the website
                    </DialogDescription>
                </DialogHeader>

                <div className="py-6 flex justify-center">
                    <form className="w-full rounded-xl bg-white relative">

                        {/* Fields */}
                        <div className="space-y-3">
                            <div className={cn("grid gap-2", className)}>
                                <div className="w-full">
                                    <label className="block text-sm mb-1">Promotion date range</label>
                                    <DateRangePickerInput defaultValue={date} onSelectionChangedFn={setDate} fromDate={addDays(new Date(), 1)} />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Buttons */}
                        <div className="flex justify-between items-center mt-5">
                            <button type='button' className="font-semibold underline" onClick={() => setOpen(false)}>Close</button>
                            <button
                                type='button'
                                disabled={(isPendingPromoteProperty || isGetPackageBillPending || isPurchasePackagePending)}
                                onClick={() => {
                                    onPromoteButtonClickHandler()
                                }}
                                className="flex items-center gap-2 bg-[#e50005] text-white font-medium px-4 py-2 rounded-lg hover:bg-red-700 font-[Inter]">
                                {
                                    !(isPendingPromoteProperty || isGetPackageBillPending || isPurchasePackagePending) ? (
                                        <><ChartNoAxesCombined className="w-5 h-5"/> <span>Promote {bill && `at ${bill.currency} ${bill.amountToPay}`}</span></>
                                    ): <LoaderCircle className="animate-spin" />
                                }

                            </button>
                        </div>

                    </form>
                </div>

            </DialogContent>
        </Dialog>,
        document.getElementById('modal') as HTMLElement
    );


})


export default PromotePropertyForm;