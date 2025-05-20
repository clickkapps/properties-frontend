import PropertiesDropdown from "@/components/ui/PropertiesDropdown.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation} from "@tanstack/react-query";
import {axiosErrorHandler, formErrorsHandler} from "@/lib/utils.ts";
import {toast} from "@/hooks/use-toast.ts";
import {apiCreateNewShowing} from "@/api/showings.api.ts";
import {useForm} from "react-hook-form";
import {ShowingFormInput, ShowingModel} from "@/lib/types";
import {LoaderCircle} from "lucide-react";
import DatePickerInput from "@/components/ui/DatePickerInput.tsx";

type Prop = {
    onRecordAdded?: (record: ShowingModel) => void;
}

function AddShowingForm({ onRecordAdded }: Prop) {


    const {
        register,
        handleSubmit,
        reset,
        setValue,
    } = useForm<ShowingFormInput>()



    // this sends form data to backend
    const { mutate, isPending } = useMutation({
        mutationKey: ['add-showing'],
        mutationFn: (formData: ShowingFormInput) => apiCreateNewShowing(formData),
        onSuccess: async (resp) => {
            // const data = resp.data;
            console.log("added showing:", resp.data)
            toast({
                title: "Great!",
                description: "Record created!",
            })
            reset()
            if(onRecordAdded) {
                onRecordAdded(resp.data)
            }
        },
        onError: axiosErrorHandler,
    })

    //  method called when form is posted!!
    const handleFormSubmit = (data: ShowingFormInput) => {
        mutate(data)
    }


    return (
        <div className="">
            <h3 className="text-lg font-medium mb-6">Add new order</h3>
            <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit, formErrorsHandler<ShowingFormInput>)}>
                {/* Client Name & Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <PropertiesDropdown onValueChange={(val) =>  setValue("propertyId", val)}/>
                    <div>
                        <label className="block text-sm  mb-1">Customer First Name</label>
                        <Input
                            placeholder="Enter first name here"
                            className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            { ...register('customerFirstName') }
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm  mb-1">Customer Last Name (optional)</label>
                        <Input
                            placeholder="Enter last name here"
                            className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            { ...register('customerLastName') }
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
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm  mb-1">Contact Email (optional)</label>
                        <Input
                            placeholder="Enter email here"
                            className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            { ...register('customerContactEmail') }
                        />
                    </div>
                    <div>
                        <label className="block text-sm  mb-1">Appointment Date</label>
                        <DatePickerInput
                            // className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            fromDate={new Date()}
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

                {/* Button */}
                <Button
                    type="submit"
                    className="bg-[#020050] hover:bg-[#0D0B66] rounded-md text-sm"
                    disabled={isPending}
                >
                    { isPending ? (<LoaderCircle className="animate-spin" />) : (<span>Place Order</span>)}
                </Button>
            </form>
        </div>
    )
}

export default AddShowingForm