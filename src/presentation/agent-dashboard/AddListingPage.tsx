import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {LoaderCircle, TrashIcon, PlusCircle} from "lucide-react";
import {useMutation, useQuery,} from "@tanstack/react-query";
import {apiAddNewProperty, apiGetPropertyCategories} from "@/api/properties.api.ts";
import {customLog, getUuid} from "@/lib/utils.ts";
import {AxiosError} from "axios";
import {toast} from "@/hooks/use-toast.ts";
import {useForm} from "react-hook-form";
import {KeyValue, PropertyFormInputs} from "@/lib/types";
import {useCallback, useEffect, useState} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FileSelector from "@/presentation/agent-dashboard/FileSelector.tsx";
import {ghRegions} from "@/constants/ui.constants.ts";

function AddListingPage() {

  // const openDropZoneRef = useRef()
  const [specifications, setSpecifications] = useState<KeyValue[]>([{id: getUuid(), key: "", value: ""}]);
  const { isPending: isPendingCategories, isError: isErrorCategories, data: propertyCategories } = useQuery<{id: number, title: string}[]>({ queryKey: ['property-categories'], queryFn: apiGetPropertyCategories })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormInputs>()


  useEffect(() => {

    if(Object.keys(errors).length > 0) {
      const firstErrorKey = Object.keys(errors)[0] as keyof PropertyFormInputs;
      const firstErrorMessage = errors[firstErrorKey]?.message;
      toast({
        title: "Uh oh! Something went wrong",
        description: firstErrorMessage,
        variant: "destructive"
      })
    }

  }, [errors]);

  const { mutate, isPending } = useMutation({
    mutationKey: ['add-property'],
    mutationFn: apiAddNewProperty,
    onSuccess: async (resp) => {

      customLog("verification request success", resp);
      // const data = resp.data;
      toast({
        title: "Great!",
        description: "Property added successfully!",
      })
      reset()

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

  const addNewSpecificationField = () => {
    setSpecifications(prev => {
      return [
        ...prev,
        {id: getUuid(), key: "", value: ""}
      ]
    });
  }

  const removeSpecificationField = (id?: string) => {
    setSpecifications(prev => {
      return prev.filter((spec) => spec.id !== id);
    })
  }

  const onFilesChange = useCallback((files: File[]) => {
    if(files && files.length > 0) {
      setValue("mainImage", files[0])
      setValue("otherImages", files.filter(f => f.name != files[0].name))
    }

  }, [setValue])


  return (
      <div className="container mx-auto">

        <h2 className="text-2xl font-semibold mb-6">Add Property</h2>


        <form onSubmit={handleSubmit((data: PropertyFormInputs) => mutate(data))}>
          <div className="border bg-white px-10 py-6 mb-10 space-y-6">


            {/* Property Information */}
            <h3 className="text-xl font-semibold mb-6">Property Information</h3>

            {/* Property Name & Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="flex flex-row gap-2">
                <div className="w-[180px]">
                  <label className="block text-sm mb-1">Property For</label>
                  <Select onValueChange={(value) => {
                    setValue('offerType', value)
                  }} name={"offerType"} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Rent or Sale"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <label className="block text-sm mb-1">Select Category</label>
                  <Select onValueChange={(value) => {
                    setValue('propertyCategoryId', +value)
                  }} name={"offerType"} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Category"/>
                    </SelectTrigger>
                    <SelectContent>
                      {propertyCategories && propertyCategories.map((category) => {
                        return (
                            <SelectItem key={category.id}
                                        value={`${category['id']}`}>{category['title'] as string}</SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

              </div>

              <div>
                <label className="block text-sm mb-1">Property Title</label>
                <Input
                    placeholder="eg. 2 Bedroom detached house"
                    {...register('title')}
                    required
                />
              </div>

              <div className="flex flex-row gap-2">
                <div className="w-full">
                  <label className="block text-sm mb-1">Bedrooms</label>
                  <Input placeholder="eg. 5" {...register('rooms')}/>
                </div>
                <div className="w-full">
                  <label className="block text-sm mb-1">Washrooms</label>
                  <Input placeholder="eg. 5" {...register('bathrooms')}/>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div>
                <label className="block text-sm mb-1">Property Price</label>
                <div className="flex gap-2">
                  <Select defaultValue={'USD'} onValueChange={(value) => {
                    setValue('currency', value)
                  }}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Currency"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GHS">GH₵</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="eg. 5000" className="w-full" {...register('price')}/>
                </div>

              </div>

              <div className={"col-span-2"}>
                <label className="block text-sm mb-1">Property Address</label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Select defaultValue={'Ghana'} onValueChange={(value) => {
                    setValue('country', value)
                  }}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Country"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ghana">Ghana</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select onValueChange={(value) => {
                    setValue('region', value)
                  }}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Region"/>
                    </SelectTrigger>
                    <SelectContent>
                      {ghRegions.map(region => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input placeholder="eg. 44 Ogyam Road" {...register('address')} className={"w-full"} />
                </div>

              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm mb-1">Property Description</label>
              <Textarea placeholder="eg. pets allowed" className="min-h-[120px]"/>
            </div>

            {/*<div className="h-8"></div>*/}

            {/* Property For, Category, Garages */}
            <div>
              <h2 className="text-xl font-semibold mb-6"> More Property Specifications </h2>
              <div className="space-y-4">
                {
                  specifications.map((spec: KeyValue) => (
                      <div className="flex flex-col md:flex-row gap-4" key={spec.id}>
                        <Input placeholder="eg. utilities" defaultValue={spec.key} className="w-full"/>
                        <Input placeholder="eg. not included" defaultValue={spec.value as string} className={"w-full"}/>
                        <Button type={"button"} onClick={() => removeSpecificationField(spec.id)}
                                variant={"outline"}><TrashIcon
                            className={"text-red-700"}/></Button>
                      </div>
                  ))
                }
                <Button type={"button"} variant={"outline"} onClick={addNewSpecificationField}> <PlusCircle/> Add
                  another
                  specification</Button>
              </div>
            </div>


            {/* File Attachment */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-6"> Property Photos / Images </h2>
              <h3 className="text-md font-medium mb-2">Attach images <small className="text-blue-500">(first image will be used as the featured image)</small></h3>

              <FileSelector onChange={onFilesChange} />

            </div>

            {/* Submit & Cancel Buttons */}
            <div className="flex justify-end gap-4 pt-6 pb-6">
              <Button
                  type="submit"
                  className="bg-primary text-white px-6"
                  disabled={isPendingCategories || isErrorCategories}
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
  );
}

export default AddListingPage;
