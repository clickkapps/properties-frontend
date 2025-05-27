import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {LoaderCircle} from "lucide-react";
import {useMutation,} from "@tanstack/react-query";
import {apiAddNewProperty} from "@/api/properties.api.ts";
import {axiosErrorHandler, customLog, formErrorsHandler} from "@/lib/utils.ts";
import {toast} from "@/hooks/use-toast.ts";
import {useForm} from "react-hook-form";
import {InnerFormComponent, KeyValue, PropertyFormInput} from "@/lib/types";
import {useCallback, useRef} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FileSelector from "@/components/shared-dashboard/FileSelector.tsx";
import {ghRegions} from "@/constants/ui.constants.ts";
import SpecificationsCard from "@/components/agent-dashboard/SpecificationsCard.tsx";
import {useAppSelector} from "@/hooks";
import PropertyCategoriesDropdown, {PropertyCategoryDropdownRef} from "@/components/ui/PropertyCategoriesDropdown.tsx";

function AddPropertyPage() {


  const specificationsRef = useRef<InnerFormComponent>(null);
  const mainImageRef = useRef<InnerFormComponent>(null);
  const otherImagesRef = useRef<InnerFormComponent>(null);
  const auth = useAppSelector( state => state.auth)
  const propertyCategoriesRef =  useRef<PropertyCategoryDropdownRef>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<PropertyFormInput>()

  const offerType = watch("offerType")
  const currency = watch("currency")
  const country = watch("country")
  const region = watch("region")


  const { mutate, isPending } = useMutation({
    mutationKey: ['add-property'],
    mutationFn: (formData: FormData) => apiAddNewProperty(formData, auth.userInfo?.id),
    onSuccess: async (resp) => {
      // const data = resp.data;
      customLog("added property:", resp.data)
      toast({
        title: "Great!",
        description: "Property added successfully!",
      })
      reset()
      propertyCategoriesRef.current?.reset()
      specificationsRef.current?.clear()
      mainImageRef.current?.clear()
      otherImagesRef.current?.clear()
    },
    onError: axiosErrorHandler
  })

  const mainImagefileChangeHandler = useCallback((files: File[]) => {
    if(files && files.length > 0) {
      setValue("mainImage", files[0])
    }

  }, [setValue])

  const otherImagesFileChangeHandler = useCallback((files: File[]) => {
    if(files && files.length > 0) {
      setValue("otherImages", files)
    }

  }, [setValue])

  const specificationsChangeHandler = (specs: KeyValue[]) => {
    const preparedSpecifications = specs.map((spec: KeyValue) => {
      return {
        title: spec.title,
        value: String(spec.value),
      }
    })
    setValue("specifications", preparedSpecifications)
  }

  const submitHandler = (data: PropertyFormInput) => {

    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("country", data.country);
    formData.append("region", data.region);
    formData.append("currency", data.currency);
    formData.append("amount", String(data.amount));
    formData.append("offerType", data.offerType || "");
    formData.append("categoryId", data.categoryId.toString());
    formData.append("rooms", String(data.rooms));
    if(data.address) {
      formData.append("address", data.address);
    }
    if(data.washrooms) {
      formData.append("washrooms", String(data.washrooms));
    }
    if(data.description) {
      formData.append("description", data.description || "" );
    }

    // Append the main image
    if (data.mainImage) {
      formData.append("mainImage", data.mainImage);
    }

    // Append other images
    if (data.otherImages && data.otherImages.length > 0) {
      data.otherImages.forEach((file) => {
        formData.append("otherImages", file); // multer will collect them into an array
      });
    }

    // Append specifications as JSON
    formData.append("specifications", JSON.stringify(data.specifications));

    // Now call your mutate or axios
    mutate(formData);

  }

  return (
      <div className="container mx-auto">

        <h2 className="text-2xl font-semibold mb-6">Add New Property</h2>

        <form onSubmit={handleSubmit(submitHandler, formErrorsHandler)}>
          <div className="border bg-white px-10 py-6 mb-10 space-y-6">


            {/* Property Information */}
            <h3 className="text-xl font-semibold mb-6">Property Information</h3>

            {/* Property Name & Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="flex flex-row gap-2">
                <div className="w-[180px]">
                  <label className="block text-sm mb-1">Property For*</label>
                  <Select
                      value={offerType || ""}
                      onValueChange={(value) => {
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
                  <label className="block text-sm mb-1">Select Category*</label>
                  <PropertyCategoriesDropdown
                      ref={propertyCategoriesRef}
                      onCategorySelected={(categoryId) => {
                    setValue('categoryId', categoryId)
                  }} />
                </div>

              </div>

              <div>
                <label className="block text-sm mb-1">Property Title*</label>
                <Input
                    placeholder="eg. Newly renovated apartment"
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
                  <Input placeholder="eg. 5" {...register('washrooms')}/>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div>
                <label className="block text-sm mb-1">Property Price*</label>
                <div className="flex gap-2">
                  <Select
                      value={currency || ""}
                      onValueChange={(value) => {
                    setValue('currency', value)
                  }} required >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Currency"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GHS">GH₵</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="eg. 5000" className="w-full" {...register('amount')} required />
                </div>

              </div>

              <div className={"col-span-2"}>
                <label className="block text-sm mb-1">Property Address*</label>
                <div className="flex flex-col md:flex-row gap-2">
                  <Select
                      value={country || ""}
                      onValueChange={(value) => {
                    setValue('country', value)
                  }}  required >
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Country"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ghana">Ghana</SelectItem>
                      {/*<SelectItem value="Canada">Canada</SelectItem>*/}
                    </SelectContent>
                  </Select>
                  <Select
                      value={region || ""}
                      onValueChange={(value) => {
                    setValue('region', value)
                  }} required >
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
              <Textarea placeholder="eg. This a apartment is suitable for couples" className="min-h-[120px]" {...register('description')}/>
            </div>

            {/*<div className="h-8"></div>*/}

            {/* Property For, Category, Garages */}
            <SpecificationsCard onChange={specificationsChangeHandler} ref={specificationsRef}/>


            {/* File Attachment */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-6"> Property Photos / Images </h2>
              <h3 className="text-md font-medium mb-2">Featured image on the left, supporting images on the right</h3>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-[30%]">
                      <FileSelector
                          title={'Select Featured Image'}
                          onChange={mainImagefileChangeHandler} ref={mainImageRef} multiple={false}/>
                    </div>
                    <div className="w-full md:w-[70%]">
                      <FileSelector
                          onChange={otherImagesFileChangeHandler} ref={otherImagesRef}/>
                    </div>
                </div>

              </div>

              {/* Submit & Cancel Buttons */}
            <div className="flex justify-end gap-4 pt-6 pb-6">
              <Button
                  type="submit"
                  className="bg-primary text-white px-6"
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

export default AddPropertyPage;
