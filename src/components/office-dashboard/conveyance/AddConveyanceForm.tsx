import { Button } from "@/components/ui/button"
import DatePickerInput from "@/components/ui/DatePickerInput"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { ConveyanceFormInput } from "@/lib/types"
import { axiosErrorHandler, formErrorsHandler } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import { title } from "process"
import { useForm } from "react-hook-form"

const AddConveyanceForm = () => {

  const {
          register,
          handleSubmit,
          reset,
          setValue,
      } = useForm<ConveyanceFormInput>()

      // this sends form data to backend
      const { mutate, isPending } = useMutation({
        mutationKey: ['add-conveyance'],
        mutationFn: (formData:ConveyanceFormInput) => apiCreateNewConveyance(formData),
        onSuccess: async (resp) => {
          console.log("added conveyance:", resp.data)
          toast({
            title: "Great",
            description: "Record created",
          })
          reset()
          if(onRecordAdded) {
            onRecordAdded(resp.data)
          }
        },
        onError: axiosErrorHandler,
      })

      //  method called when form is posted
      const handleFormSubmit = (data: ConveyanceFormInput) => {
        mutate(data)
      }


  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit, formErrorsHandler<ConveyanceFormInput>)}>
        {/* Client Name & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm  mb-1">Client Name</label>
            <Input placeholder="name" className="focus:outline-none focus:ring-0 focus:ring-offset-0"
            { ...register('clientName') }
            required
            />
          </div>
          <div>
            <label className="block text-sm  mb-1">Contact</label>
            <Input placeholder="name" className="focus:outline-none focus:ring-0 focus:ring-offset-0" 
            { ...register('customerContactPhone') }
            required
            />
          </div>
        </div>
    
        {/* From, To, Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm  mb-1">From Location</label>
            <Input placeholder="name" 
            { ...register('clientCurrentLocation') }
            required
            />
          </div>
          <div>
            <label className="block text-sm  mb-1">To Location</label>
            <Input placeholder="name" 
            { ...register('clientNewLocation') }
            required
            />
          </div>
          <div>
            <label className="block text-sm  mb-1">Date</label>
            <DatePickerInput
                            // className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            fromDate={new Date()}
                            onSelectionChangedFn={(date) => {
                                if(date){
                                    setValue("conveyanceDate", date.toDateString());
                                }

                            }} />
          </div>
        </div>
    
        {/* Description */}
        <div>
          <label className="block text-sm  mb-1">Description</label>
          <Textarea placeholder="name" className="min-h-[120px]" 
          { ...register('description') }
            required
          />
        </div>
    
        {/* Button */}
        <Button type="submit" className="bg-[#020050] hover:bg-[#0D0B66] rounded-md text-sm"
        disabled={isPending}
        >
          { isPending ? (<LoaderCircle className="animate-spin" />) : (<span>Add Order</span>)}
        </Button>
      </form>
  )
}

export default AddConveyanceForm