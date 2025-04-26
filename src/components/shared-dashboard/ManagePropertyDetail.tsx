import {InnerFormComponent, KeyValue, PropertyFormInput, PropertyModel} from "@/lib/types";
import {SkeletonCard} from "@/components/ui/SkeletonCard.tsx";
import {customLog, getCdnFile, getUuid} from "@/lib/utils.ts";
import {LoaderCircle, StarIcon} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Input} from "@/components/ui/input.tsx";
import {ghRegions} from "@/constants/ui.constants.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import SpecificationsCard from "@/components/agent-dashboard/SpecificationsCard.tsx";
import FileSelector from "@/components/shared-dashboard/FileSelector.tsx";
import {useCallback, useEffect, useRef, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {apiDeleteProperty, apiEditProperty, apiGetPropertyCategories} from "@/api/properties.api.ts";
import {toast} from "@/hooks/use-toast.ts";
import {AxiosError} from "axios";
import {useForm} from "react-hook-form";

type Props = {
    selectedProperty?: PropertyModel
    isPendingPropertyDetail: boolean
}
function ManagePropertyDetail({ selectedProperty, isPendingPropertyDetail }: Props) {

    const specificationsRef = useRef<InnerFormComponent>(null);
    const mainImageRef = useRef<InnerFormComponent>(null);
    const otherImagesRef = useRef<InnerFormComponent>(null);
    const [editing, setEditing] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<PropertyFormInput>()

    useEffect(() => {
        if(Object.keys(errors).length > 0) {
            const firstErrorKey = Object.keys(errors)[0] as keyof PropertyFormInput;
            const firstErrorMessage = errors[firstErrorKey]?.message;
            toast({
                title: "Uh oh! Something went wrong",
                description: firstErrorMessage,
                variant: "destructive"
            })
        }
    }, [errors]);


    const { isPending: isPendingCategories, isError: isErrorCategories, data: propertyCategories } = useQuery<{id: number, title: string}[]>({ queryKey: ['property-categories'], queryFn: apiGetPropertyCategories })

    const { mutate, isPending: inPendingPropertyEdit } = useMutation({
        mutationKey: ['edit-property'],
        mutationFn: (formData: FormData) => apiEditProperty(formData, selectedProperty?.user?.id),
        onSuccess: async (resp) => {
            // const data = resp.data;
            customLog("added property:", resp.data)
            toast({
                title: "Great!",
                description: "Property added successfully!",
            })
            reset()
            specificationsRef.current?.clear()
            mainImageRef.current?.clear()
            otherImagesRef.current?.clear()
            setEditing(false);

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

    const { mutate: mutateDeleteImage, isPending: isPendingDeleteImage } = useMutation({
        mutationKey: ['delete-property-image'],
        mutationFn: apiDeleteProperty,
        onSuccess: () => {
            toast({
                title: 'Successful',
                description: 'Photo deleted!'
            })
        },
        onError: error => {
            const axiosError = error as AxiosError<{ message: string }>;
            customLog("on error", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: axiosError.response?.data?.message || "Sorry! connection failed",
            })
        }
    })

    useEffect(() => {
        if(isPendingDeleteImage) {
            toast({
                title: 'Deleting ...',
                description: "We're deleting selected image"
            })
        }
    }, [isPendingDeleteImage]);

    const mainImageFileChangeHandler = useCallback((files: File[]) => {
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
        const preparedSpecifications= specs.map((spec: KeyValue) => {
            const data: KeyValue = {
                id: getUuid(),
                title: spec.title,
                value: String(spec.value),
            }
            return data
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
        formData.append("offerType", data.offerType);
        formData.append("propertyCategoryId", data.propertyCategoryId.toString());
        formData.append("rooms", String(data.rooms));
        if(data.address) {
            formData.append("address", data.address);
        }
        if(data.washrooms) {
            formData.append("bathrooms", String(data.washrooms));
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
        <div className="px-6">

            {
                isPendingPropertyDetail && <div className="flex flex-row overflow-y-auto gap-4">
                    {
                        Array.from({length: 4}).map((_, index) => (
                            <SkeletonCard key={"sk-" + index}/>
                        ))
                    }
                </div>
            }

            {
                selectedProperty &&
                <div className="animated fadeIn duration-700">
                    {/*<h2> Property Gallery </h2>*/}
                    {/* Featured image  */}
                    <div className="flex flex-row overflow-y-auto gap-4 py-4 ">
                        {selectedProperty.mainImagePath && selectedProperty.mainImagePath !== "" && (
                            <div className=" w-48 h-48 overflow-clip group relative rounded-lg cursor-pointer">
                                <img key={selectedProperty.mainImagePath}
                                     src={getCdnFile(selectedProperty.mainImagePath)} alt={"property image"}
                                     className="aspect-square w-full h-full object-cover absolute"/>
                                <div
                                    className="bg-black/30 group-hover:bg-black/30 transition duration-700 w-full h-full absolute flex justify-center items-center ">
                                    <p className="inline-flex gap-2 items-center font-bold text-amber-500 absolute left-2 top-2">
                                        <span>Featured</span>
                                        <StarIcon fill={'#fff'} size={14}/></p>
                                    <Button
                                        className="hidden group-hover:block transition duration-900 inset-x-4 space-y-2 bg-black/30 text-white rounded-none hover:bg-black/50 hover:text-white"
                                        variant="outline">Expand</Button>


                                </div>
                            </div>
                        )}
                        {
                            selectedProperty.gallery.filter(e => e.path && e.path !== "").map((item) => (
                                <div
                                    key={item.id}
                                    className=" w-48 h-48 overflow-clip group relative rounded-lg cursor-pointer">
                                    <img
                                        src={getCdnFile(item.path)}
                                        alt={"property image"}
                                        className="aspect-square w-full h-full object-cover absolute"/>
                                    <div
                                        className="group-hover:bg-black/30 transition duration-700 w-full h-full absolute flex justify-center items-center ">
                                        <div
                                            className={"hidden group-hover:block transition duration-900 inset-x-4 space-y-2"}>
                                            <Button
                                                className="w-full bg-black/30 text-white rounded-none  hover:bg-black/50 hover:text-white"
                                                variant="outline"
                                                onClick={() => mutateDeleteImage(item.id)}>Delete</Button>
                                            <Button
                                                className="w-full bg-black/30 text-white rounded-none hover:bg-black/50 hover:text-white"
                                                variant="outline">Expand</Button>
                                        </div>


                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

            {/* Form here ..... */}

            { selectedProperty &&
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="px-0 space-y-6">

                        {/* Property Information */}
                        <h3 className="text-xl font-semibold">Property Information</h3>

                        {/* Property Name & Address */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div className="flex flex-row gap-2">
                                <div className="w-[180px]">
                                    <label className="block text-sm mb-1">Property For*</label>
                                    <Select onValueChange={(value) => {
                                        setValue('offerType', value)
                                    }} name={"offerType"} required defaultValue={selectedProperty.offerType}>
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
                                    <Select onValueChange={(value) => {
                                        setValue('propertyCategoryId', +value)
                                    }} name={"offerType"} required
                                            defaultValue={String(selectedProperty.propertyCategoryId)}>
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
                                <label className="block text-sm mb-1">Property Title*</label>
                                <Input
                                    defaultValue={selectedProperty.title}
                                    placeholder="eg. Newly renovated apartment"
                                    {...register('title')}
                                    readOnly={!editing}
                                    required
                                />
                            </div>

                            <div className="flex flex-row gap-2">
                                <div className="w-full">
                                    <label className="block text-sm mb-1">Bedrooms</label>
                                    <Input placeholder="eg. 5" {...register('rooms')}
                                           defaultValue={selectedProperty.rooms}
                                           readOnly={!editing}
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm mb-1">Washrooms</label>
                                    <Input placeholder="eg. 5" {...register('washrooms')}
                                           defaultValue={selectedProperty.washrooms}
                                           readOnly={!editing}
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            <div>
                                <label className="block text-sm mb-1">Property Price*</label>
                                <div className="flex gap-2">
                                    <Select onValueChange={(value) => {
                                        setValue('currency', value)
                                    }} required defaultValue={selectedProperty.currency}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Currency"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD</SelectItem>
                                            <SelectItem value="GHS">GH₵</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Input placeholder="eg. 5000" className="w-full" {...register('amount')}
                                           required defaultValue={selectedProperty.amount}
                                           readOnly={!editing}/>
                                </div>

                            </div>

                            <div className={"col-span-2"}>
                                <label className="block text-sm mb-1">Property Address*</label>
                                <div className="flex flex-col md:flex-row gap-2">
                                    <Select onValueChange={(value) => {
                                        setValue('country', value)
                                    }} required defaultValue={selectedProperty.country}>
                                        <SelectTrigger className="w-full md:w-[180px]">
                                            <SelectValue placeholder="Country"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Ghana">Ghana</SelectItem>
                                            {/*<SelectItem value="Canada">Canada</SelectItem>*/}
                                        </SelectContent>
                                    </Select>
                                    <Select onValueChange={(value) => {
                                        setValue('region', value)
                                    }} required defaultValue={selectedProperty.region}>
                                        <SelectTrigger className="w-full md:w-[180px]">
                                            <SelectValue placeholder="Region"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ghRegions.map(region => (
                                                <SelectItem key={region}
                                                            value={region}>{region}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Input placeholder="eg. 44 Ogyam Road" {...register('address')}
                                           className={"w-full"} defaultValue={selectedProperty.address}
                                           readOnly={!editing}/>
                                </div>

                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm mb-1">Property Description</label>
                            <Textarea placeholder="eg. pets allowed"
                                      defaultValue={selectedProperty.description}
                                      readOnly={!editing}
                                      className="min-h-[120px]" {...register('description')}/>
                        </div>

                        {/*<div className="h-8"></div>*/}

                        {/* Property For, Category, Garages */}
                        <SpecificationsCard readOnly={!editing} onChange={specificationsChangeHandler}
                                            ref={specificationsRef} spec={selectedProperty.specifications}/>


                        {/* File Attachment */}
                        {
                            editing && (
                                <div className="mt-4">
                                    <h2 className="text-xl font-semibold mb-6"> Property Photos / Images </h2>
                                    <h3 className="text-md font-medium mb-2">Featured image on the left,
                                        supporting
                                        images on the right</h3>

                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full md:w-[30%]">
                                            <FileSelector
                                                title={'Select Featured Image'}
                                                onChange={mainImageFileChangeHandler} ref={mainImageRef}
                                                multiple={false}/>
                                        </div>
                                        <div className="w-full md:w-[70%]">
                                            <FileSelector
                                                onChange={otherImagesFileChangeHandler} ref={otherImagesRef}/>
                                        </div>
                                    </div>

                                </div>
                            )
                        }

                        {/* Submit & Cancel Buttons */}
                        {!editing && (<div className="flex justify-end gap-4 pt-6 pb-6">
                            <Button
                                type="button"
                                onClick={() => setEditing(true)}
                                className="bg-primary text-white px-6"
                                disabled={isPendingCategories || isErrorCategories}
                            >
                                Edit
                            </Button>
                        </div>)}
                        {editing && <div className="flex justify-end gap-4 pt-6 pb-6">

                            <Button
                                type="submit"
                                className="bg-primary text-white px-6"
                                disabled={isPendingCategories || isErrorCategories}
                            >
                                {inPendingPropertyEdit && <LoaderCircle className="animate-spin"/>}
                                {!inPendingPropertyEdit && <span>Update</span>}

                            </Button>
                            <Button variant="outline" type={"button"} onClick={() => setEditing(false)}
                                    className="border border-gray-400 text-black px-6">
                                Cancel
                            </Button>
                        </div>}

                    </div>
                </form>
            }

        </div>

    )
}

export default ManagePropertyDetail;