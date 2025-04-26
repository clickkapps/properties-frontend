import {ChevronLeftIcon, ChevronRight, LoaderCircle, StarIcon} from 'lucide-react';
import {useCallback, useEffect, useRef, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    apiDeleteProperty,
    apiEditProperty,
    apiGetProperties,
    apiGetPropertyCategories,
    apiGetPropertyDetail
} from "@/api/properties.api.ts";
import SkeletonListItem from "@/components/ui/SkeletonListItem.tsx";
import {InnerFormComponent, KeyValue, PropertyFormInput, PropertyModel} from "@/lib/types";
import {SkeletonCard} from "@/components/ui/SkeletonCard.tsx";
import {customLog, getCdnFile} from "@/lib/utils.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {ghRegions} from "@/constants/ui.constants.ts";
import {Textarea} from "@/components/ui/textarea.tsx";
import SpecificationsCard from "@/components/agent-dashboard/SpecificationsCard.tsx";
import FileSelector from "@/components/shared-dashboard/FileSelector.tsx";
import {toast} from "@/hooks/use-toast.ts";
import {AxiosError} from "axios";
import {useForm} from "react-hook-form";

// const propertyList = Array.from({ length: 5 }).map((_, i) => {
//     return {
//         id: `id-${i}`,
//         title: "Dan's Villa",
//         selected: i == 0
//     }
// })

type Props = {
    userId?: number
}

function ManagePropertiesList({ userId } : Props) {

    const specificationsRef = useRef<InnerFormComponent>(null);
    const mainImageRef = useRef<InnerFormComponent>(null);
    const otherImagesRef = useRef<InnerFormComponent>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<PropertyFormInput>()

    const { isPending: isPendingCategories, isError: isErrorCategories, data: propertyCategories } = useQuery<{id: number, title: string}[]>({ queryKey: ['property-categories'], queryFn: apiGetPropertyCategories })
    const { isPending, data } = useQuery<PropertyModel[]>({ queryKey: ['fetch-properties'], queryFn: () => apiGetProperties({ userId: userId}) });
    const [activatedMobileSection, setActivatedMobileSection] = useState<'list' | 'detail'>('list')
    const [selectedProperty, setSelectedProperty] = useState<PropertyModel|undefined>()

    const { mutate: mutatePropertyDetail, isPending: isPendingPropertyDetail } = useMutation({
        mutationKey: ['property-detail'],
        mutationFn: apiGetPropertyDetail,
        onSuccess: async (resp) => {
            console.log("selectedProperty",resp.data)
            setSelectedProperty(resp.data);
        },
        onError: async (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            customLog("on error", axiosError.message);
        }
    })


    useEffect(() => {
        if(data && data.length > 0 && selectedProperty == undefined){
            const selected: PropertyModel = data[0];
            mutatePropertyDetail(selected)
        }
    }, [data, mutatePropertyDetail, selectedProperty])


    useEffect(() => {
        const firstErrorKey = Object.keys(errors)[0] as keyof PropertyFormInput;
        const firstErrorMessage = errors[firstErrorKey]?.message;
        toast({
            title: "Uh oh! Something went wrong",
            description: firstErrorMessage,
            variant: "destructive"
        })
    }, [errors]);


    const listItemClickHandler = (item: PropertyModel) => {
        // setSelectedProperty(item)
        mutatePropertyDetail(item)
        setActivatedMobileSection('detail')

    }


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


    const mainImagefileChangeHandler = useCallback((files: File[]) => {
        if(files && files.length > 0) {
            setValue("mainImage", files[0])
        }

    }, [setValue])

    const otherImagesFileChangeHandler = useCallback((files: File[]) => {
        if(files && files.length > 0) {
            setValue("otherImages", files.filter(f => f.name != files[0].name))
        }

    }, [setValue])

    const specificationsChangeHandler = (specs: KeyValue[]) => {
        const preparedSpecifications = specs.map((spec: KeyValue) => {
            return {
                title: spec.key,
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
        formData.append("offerType", data.offerType);
        formData.append("propertyCategoryId", data.propertyCategoryId.toString());
        formData.append("rooms", String(data.rooms));
        if(data.address) {
            formData.append("address", data.address);
        }
        if(data.bathrooms) {
            formData.append("bathrooms", String(data.bathrooms));
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
        <div className="py-4">
            <div className="flex flex-row border md:divide-x">
                <div className={` ${activatedMobileSection == 'list' ? 'block' : 'hidden' } md:block w-full md:w-[20%] `}>
                    { isPending && (
                        <div className={"px-4 py-4 space-y-4"}>
                            { Array.from({ length: 5 }).map((_, index) => (<SkeletonListItem showAvatar={false} showSubTitle={false} key={"sk-" + index} />)) }
                        </div>
                    )}
                    { data && data.map((item) => {
                        const selected = selectedProperty && (item.id === selectedProperty?.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => listItemClickHandler(item)}
                                className={`flex flex-row justify-between cursor-pointer py-4 px-4 ${selected? 'bg-[#f5f5f5]' : ''}`}>
                                {item.title}
                                <ChevronRight className="block md:hidden"/>
                            </div>
                        );
                    })}
                </div>
                <div
                    className={` ${activatedMobileSection == 'detail' ? 'block' : 'hidden'} md:block w-full md:w-[80%] flex flex-col `}>

                    <div className="py-4 px-2 border-b inline-flex w-full space-x-4" onClick={() => setActivatedMobileSection('list')}>
                        {data && selectedProperty &&
                            <div className="inline-flex space-x-1 text-blue-500 items-center md:hidden">
                                <ChevronLeftIcon/>
                                <span className="text-sm">Back</span>
                            </div>
                        }
                        {data && selectedProperty && <p className="font-semibold"> { selectedProperty.title } </p>}
                    </div>

                    {/* Content here for item detail */}
                    <div className="px-6 animated slideInRight duration-100">

                        {
                            isPendingPropertyDetail && <div className="flex flex-row overflow-y-auto gap-4">
                                {
                                    Array.from({length: 4}).map((_, index) => (
                                        <SkeletonCard key={"sk-" + index} />
                                    ))
                                }
                            </div>
                        }

                        {data && !selectedProperty && <h2>Nothing selected</h2>}

                        {
                            data && selectedProperty && <div className="">
                                {/*<h2> Property Gallery </h2>*/}
                                {/* Featured image  */}
                                <div className="flex flex-row overflow-y-auto gap-4 py-4 ">
                                    { selectedProperty.mainImagePath && selectedProperty.mainImagePath !== "" && (
                                        <div className=" w-48 h-48 overflow-clip group relative rounded-lg cursor-pointer">
                                            <img key={selectedProperty.mainImagePath}
                                                 src={getCdnFile(selectedProperty.mainImagePath)} alt={"property image"}
                                                 className="aspect-square w-full h-full object-cover absolute"/>
                                            <div
                                                className="bg-black/30 group-hover:bg-black/30 transition duration-700 w-full h-full absolute flex justify-center items-center ">
                                                <p className="inline-flex gap-2 items-center font-bold text-amber-500 absolute left-2 top-2"><span>Featured</span>
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
                                                            variant="outline" onClick={() => mutateDeleteImage(item.id)}>Delete</Button>
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

                        {data && selectedProperty &&
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
                                                }} name={"offerType"} required defaultValue={String(selectedProperty.propertyCategoryId)}>
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
                                                required
                                            />
                                        </div>

                                        <div className="flex flex-row gap-2">
                                            <div className="w-full">
                                                <label className="block text-sm mb-1">Bedrooms</label>
                                                <Input placeholder="eg. 5" {...register('rooms')}
                                                       defaultValue={selectedProperty.rooms}/>
                                            </div>
                                            <div className="w-full">
                                                <label className="block text-sm mb-1">Washrooms</label>
                                                <Input placeholder="eg. 5" {...register('bathrooms')}
                                                       defaultValue={selectedProperty.bathrooms}/>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                        <div>
                                            <label className="block text-sm mb-1">Property Price*</label>
                                            <div className="flex gap-2">
                                                <Select onValueChange={(value) => {
                                                    setValue('currency', value)
                                                }} required defaultValue={selectedProperty.currency}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Currency"/>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="USD">USD</SelectItem>
                                                        <SelectItem value="GHS">GH₵</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input placeholder="eg. 5000" className="w-full" {...register('amount')}
                                                       required defaultValue={selectedProperty.amount}/>
                                            </div>

                                        </div>

                                        <div className={"col-span-2"}>
                                            <label className="block text-sm mb-1">Property Address*</label>
                                            <div className="flex flex-col md:flex-row gap-2">
                                                <Select onValueChange={(value) => {
                                                    setValue('country', value)
                                                }} required defaultValue={selectedProperty.address}>
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
                                                }} required>
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
                                                       className={"w-full"}/>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm mb-1">Property Description</label>
                                        <Textarea placeholder="eg. pets allowed"
                                                  defaultValue={selectedProperty.description}
                                                  className="min-h-[120px]" {...register('description')}/>
                                    </div>

                                    {/*<div className="h-8"></div>*/}

                                    {/* Property For, Category, Garages */}
                                    <SpecificationsCard onChange={specificationsChangeHandler} ref={specificationsRef}/>


                                    {/* File Attachment */}
                                    <div className="mt-4">
                                        <h2 className="text-xl font-semibold mb-6"> Property Photos / Images </h2>
                                        <h3 className="text-md font-medium mb-2">Featured image on the left, supporting
                                            images on the right</h3>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="w-full md:w-[30%]">
                                                <FileSelector
                                                    title={'Select Featured Image'}
                                                    onChange={mainImagefileChangeHandler} ref={mainImageRef}
                                                    multiple={false}/>
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
                                            disabled={isPendingCategories || isErrorCategories}
                                        >
                                            {inPendingPropertyEdit && <LoaderCircle className="animate-spin"/>}
                                            {!inPendingPropertyEdit && <span>Update Property</span>}

                                        </Button>
                                        <Button variant="outline" type={"button"} onClick={() => reset()}
                                                className="border border-gray-400 text-black px-6">
                                            Cancel
                                        </Button>
                                    </div>

                                </div>
                            </form>
                        }

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ManagePropertiesList;