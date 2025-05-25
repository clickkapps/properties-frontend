import {createPortal} from "react-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LoaderCircle} from "lucide-react";
import {forwardRef, Ref, useEffect, useImperativeHandle, useState} from "react";
import {ModalHandle, ShowingFormInput, ShowingModel} from "@/lib/types";
import {useMutation} from "@tanstack/react-query";
import PropertiesDropdown from "@/components/ui/PropertiesDropdown.tsx";
import {useForm} from "react-hook-form";
import {toast} from "@/hooks/use-toast.ts";
import {Input} from "@/components/ui/input.tsx";
import DatePickerInput from "@/components/ui/DatePickerInput.tsx";
import {apiUpdateShowing} from "@/api/showings.api.ts";
import {axiosErrorHandler, formErrorsHandler} from "@/lib/utils.ts";

type Props = {
    onUpdate?: (data: ShowingModel) => void,
    initialValue: ShowingModel,
}
const EditShowingFormModal = forwardRef(( { onUpdate, initialValue  } : Props, ref: Ref<ModalHandle | undefined> )=> {

    const [propertyShowing, setPropertyShowing] = useState<ShowingModel|undefined>(initialValue);
    const [open, setOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm<ShowingFormInput>()

    useEffect(() => {
        if(propertyShowing && propertyShowing?.id) {
            setValue("id", propertyShowing?.id)
            setValue("userId", propertyShowing?.user?.id)
            setValue("subscriptionId", propertyShowing?.subscription?.id)
            setValue("propertyId", propertyShowing?.property?.id)
            setValue("appointmentDate", propertyShowing?.appointmentDate)
        }
    }, [propertyShowing, propertyShowing?.subscription?.id, propertyShowing?.user?.id, setValue]);

    // this sends form data to backend
    const { mutate, isPending } = useMutation({
        mutationKey: ['edit-property'],
        mutationFn: (formData: ShowingFormInput) => apiUpdateShowing(formData),
        onSuccess: async (resp) => {
            // const data = resp.data;

            toast({
                title: "Great!",
                description: "Record updated!",
            })
            if(onUpdate) {
                onUpdate(resp.data)
            }
            setOpen(false);
            setPropertyShowing(undefined)
        },
        onError: axiosErrorHandler,
    })


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

    // Form content
    const formContent = (
        <div className={"space-y-6"}>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <PropertiesDropdown defaultValue={propertyShowing?.property?.id} onValueChange={(val) => setValue("propertyId", val)}/>
                <div>
                    <label className="block text-sm  mb-1">Customer First Name</label>
                    <Input
                        placeholder="Enter first name here"
                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                        {...register('customerFirstName')}
                        defaultValue={propertyShowing?.user?.firstName}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm  mb-1">Customer Last Name (optional)</label>
                    <Input
                        placeholder="Enter last name here"
                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                        {...register('customerLastName')}
                        defaultValue={propertyShowing?.user?.lastName}
                    />
                </div>
            </div>

            {/* Contact & Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <label className="block text-sm  mb-1">Contact Phone</label>
                    <Input
                        placeholder="Enter phone number here"
                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                        { ...register('customerContactPhone') }
                        defaultValue={propertyShowing?.user?.contactPhone}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm  mb-1">Contact Email (optional)</label>
                    <Input
                        placeholder="Enter email here"
                        className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                        { ...register('customerContactEmail') }
                        defaultValue={propertyShowing?.user?.contactEmail}
                    />
                </div>
                <div>
                    <label className="block text-sm  mb-1">Appointment Date</label>
                    <DatePickerInput
                        fromDate={new Date()}
                        defaultValue={propertyShowing?.appointmentDate ? new Date(propertyShowing?.appointmentDate) : undefined}
                        // className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                        onSelectionChangedFn={(date) => {
                            if(date){
                                setValue("appointmentDate", date.toDateString());
                            }

                        }} />
                    {/*<Input*/}
                    {/*    type={"date"}*/}
                    {/*    placeholder="Appointment date here"*/}
                    {/*   */}
                    {/*    { ...register('appointmentDate') }*/}
                    {/*/>*/}
                </div>
            </div>

        </div>
    )

    //  Form submission here
    const submitHandler = (formData: ShowingFormInput) => {
        mutate(formData)
    }


    return createPortal((
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent className="max-w-screen-md">
                <DialogHeader>
                    <DialogTitle>Edit!</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(submitHandler, formErrorsHandler<ShowingFormInput>)} className="space-y-6">
                    {formContent}
                    <DialogFooter>
                        <Button variant={"default"} type="submit"
                        >
                            { isPending ?
                                (<LoaderCircle className="animate-spin" />) :
                                (<span> Update! </span>)
                            }
                        </Button>
                    </DialogFooter>
                </form>


            </DialogContent>
        </Dialog>
    ), document.getElementById('modal') as HTMLElement )


})

export default EditShowingFormModal