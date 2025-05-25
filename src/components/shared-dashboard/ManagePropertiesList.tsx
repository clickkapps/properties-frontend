import {
    ChartNoAxesCombined,
    ChevronLeftIcon,
    ChevronRight,
    EarthIcon,
    LoaderCircle,
    X, XCircleIcon
} from 'lucide-react';
import {useEffect, useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {
    apiGetProperties, apiPublishProperty, apiUnPublishProperty,
} from "@/api/properties.api.ts";
import SkeletonListItem from "@/components/ui/SkeletonListItem.tsx";
import {ModalHandle, PropertyModel} from "@/lib/types";
import ManagePropertyDetail from "@/components/shared-dashboard/ManagePropertyDetail.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {SkeletonCard} from "@/components/ui/SkeletonCard.tsx";
import {AxiosError} from "axios";
import {canPublishProperties, canUnpublishProperties, customLog} from "@/lib/utils.ts";
import {toast} from "@/hooks/use-toast.ts";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.tsx";
import {useConfirmDialog} from "@/hooks/use-confirm-dialog.ts";
import PromotePropertyForm from "@/components/agent-dashboard/PromotePropertyForm.tsx";
import EmptyDisplayPage from "@/components/ui/EmptyDisplayPage.tsx";
import {useAppSelector} from "@/hooks";

// const propertyList = Array.from({ length: 5 }).map((_, i) => {
//     return {
//         subscriptionId: `subscriptionId-${i}`,
//         title: "Dan's Villa",
//         selected: i == 0
//     }
// })

type Props = {
    userId?: number,
    published?: boolean,
}

function ManagePropertiesList({ userId, published } : Props) {

    const currentUser = useAppSelector(state => state.auth);
    const promotePropertyModalRef = useRef<ModalHandle|undefined>(undefined)
    const queryClient = useQueryClient();
    const { isPending: isPendingFetchProperties, data: dataFetchProperties } = useQuery<PropertyModel[]>({ queryKey: ['fetch-properties', published], queryFn: () => apiGetProperties({
            userId: userId,
            filters: {
                published: published
            }
    }) });
    const [activatedMobileSection, setActivatedMobileSection] = useState<'list' | 'detail'>('list')
    const [selectedProperty, setSelectedProperty] = useState<PropertyModel|undefined>()
    const { showConfirmDialog } = useConfirmDialog()


     useEffect(() => {
            if(dataFetchProperties && dataFetchProperties.length > 0 && selectedProperty == undefined){
                const selected = dataFetchProperties[0];
                setSelectedProperty(selected)
            }
     }, [dataFetchProperties, selectedProperty])

    console.log("ManagePropertiesList evaluated..", "data", dataFetchProperties, "isPendingFetchProperties", isPendingFetchProperties);
    // console.log("ManagePropertiesList evaluated..", isPendingPropertyDetail, "isSuccess", isSuccessPropertyDetail, "isError", isErrorPropertyDetail);


    const listItemClickHandler = (item: PropertyModel) => {
        // setSelectedProperty(item)
        setActivatedMobileSection('detail')
        setSelectedProperty(item)

    }

    const { mutate: mutatePublishProperty, isPending: isPendingPublishProperty } = useMutation({
        mutationKey: ['publish-property'],
        mutationFn: apiPublishProperty,
        onSuccess: async (resp) => {
            const updatedProperty: PropertyModel =  resp.data as PropertyModel
            setSelectedProperty(updatedProperty)
        },
        onError: async (error, _newData, context: { previousData?: PropertyModel[] } | undefined) => {

            const axiosError = error as AxiosError<{ message: string }>;

            // ✅ Rollback to previous state if available
            if (context?.previousData) {
                queryClient.setQueryData(['fetch-properties', published], context.previousData);
            }

            // Log and notify the user
            customLog("on error", axiosError.message);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: axiosError.response?.data?.message || "Sorry! connection failed",
            });

        },
        // ✅ Optimistically update the UI
        onMutate: async ( id ) => {

            await queryClient.cancelQueries({ queryKey: ['fetch-properties', published] })
            const previousData = queryClient.getQueryData<PropertyModel[]>(['fetch-properties', published]);

            queryClient.setQueryData<PropertyModel[]>(['fetch-properties', published], (old) =>
                old?.map((item) => {
                    if(item.id === id) {
                        item.published = true;
                    }
                    return item

                }) || []
            );

            // Return context for rollback
            return { previousData };
        },

    })

    const { mutate: mutateUnpublishProperty, isPending: isPendingUnpublishProperty } = useMutation({
        mutationKey: ['unpublish-property'],
        mutationFn: apiUnPublishProperty,
        onSuccess: async (resp) => {
            // mutatePropertyDetail(selectedProperty.subscriptionId)
            const updatedProperty: PropertyModel =  resp.data as PropertyModel
            setSelectedProperty(updatedProperty)
        },
        onError: async (error: Error, _newData, context: { previousData?: PropertyModel[] } | undefined) => {
            const axiosError = error as AxiosError<{ message: string }>;
            // ✅ Rollback to previous state if available
            if (context?.previousData) {
                queryClient.setQueryData(['fetch-properties', published], context.previousData);
            }

            // Log and notify the user
            customLog("on error", axiosError.message);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: axiosError.response?.data?.message || "Sorry! connection failed",
            });

        },
        onMutate: async ( id ) => {

            await queryClient.cancelQueries({ queryKey: ['fetch-properties', published] })
            const previousData = queryClient.getQueryData<PropertyModel[]>(['fetch-properties', published]);

            queryClient.setQueryData<PropertyModel[]>(['fetch-properties', published], (old) =>
                old?.map((item) => {
                    if(item.id === id) {
                        item.published = false;
                    }
                    return item

                }) || []
            );

            // Return context for rollback
            return { previousData };
        },

    })

    const publishPropertyHandler = (id?: number) => {
        showConfirmDialog({
            title: "Publish Property",
            description: "Are you sure you want to publish?",
            onConfirm: () => {
                mutatePublishProperty(id)
            },
        })
    }

    const unpublishPropertyHandler = (id?: number) => {
        showConfirmDialog({
            title: "Unpublish Property",
            description: "Are you sure you want to unpublish?",
            onConfirm: () => {
                mutateUnpublishProperty(id)
            },
        })
    }

    if(dataFetchProperties && dataFetchProperties.length === 0) {
        return <EmptyDisplayPage />
    }

    const propertyPromotedHandler = async (propertyId?: number) => {
        if(propertyId && selectedProperty?.id == propertyId) {
            // refresh list locally
            await queryClient.cancelQueries({ queryKey: ['fetch-properties', published] })
            queryClient.setQueryData<PropertyModel[]>(['fetch-properties', published], (old) =>
                old?.map((item) => {
                    if(item.id === selectedProperty?.id) {
                        item.promoted = true;
                    }
                    return item
                }) || []
            );

            // refresh selected property
            setSelectedProperty(prev => {
                if(!prev) {
                    return prev
                }
                return {
                    ...prev,
                    promoted: true,
                }
            });
        }
    }


    return (
        <div className="flex flex-row border md:divide-x w-full">

            {/* Left Side List */}
            <div
                className={` ${activatedMobileSection == 'list' ? 'block' : 'hidden'} md:block w-full md:w-[20%] divide-y`}>
                {isPendingFetchProperties && (
                    <div className={"px-4 py-4 space-y-4"}>
                        {Array.from({length: 5}).map((_, index) => (
                            <SkeletonListItem showAvatar={false} showSubTitle={false}
                                              key={"sk-" + index}/>))}
                    </div>
                )}
                {dataFetchProperties && dataFetchProperties.map((item) => {
                    const selected = selectedProperty && (item.id === selectedProperty?.id);
                    return (
                        <div
                            key={item.id}
                            onClick={() => listItemClickHandler(item)}
                            className={`flex flex-row justify-between cursor-pointer py-4 px-4 text-sm ${selected ? 'bg-[#f5f5f5]' : ''}`}>
                            <p className={`inline-flex items-center gap-2 font-[Inter] ${item.promoted && "text-teal-500 font-semibold"}`}>
                                {item.title} {!item.published && "🔒"} {item.published && "✓"}
                                {/*{!item.published && <i className="fa-solid fa-circle text-amber-500 "></i>}*/}
                            </p>

                            <ChevronRight className="block md:hidden"/>
                        </div>
                    );
                })}
            </div>

            {/* Right Main content*/}
            <div
                className={` ${activatedMobileSection == 'detail' ? 'block' : 'hidden'} md:block w-full md:w-[80%] flex flex-col `}>

                <div className="py-2 px-6 border-b  w-full flex justify-between items-center">

                    <div className="inline-flexspace-x-4" onClick={() => setActivatedMobileSection('list')}>
                        {dataFetchProperties && selectedProperty &&
                            <div className="inline-flex space-x-1 text-blue-500 items-center md:hidden">
                                <ChevronLeftIcon/>
                                <span className="text-sm">Back</span>
                            </div>
                        }
                        {dataFetchProperties && selectedProperty &&
                            <div className="font-semibold md:inline-flex flex flex-col md:flex-row gap-1 md:items-center">
                               <span> {selectedProperty.title} </span>
                                <div className="space-x-1">
                                    {!selectedProperty.published ? (
                                        <Badge className={"bg-amber-500 rounded-full"}>Not published</Badge>) : (
                                        <Badge className={"bg-black rounded-full"}> Published</Badge>
                                    )}
                                    {selectedProperty.promoted && (
                                        <Badge className={"bg-teal-500 rounded-full"}> Promoted 🚀</Badge>
                                    )}
                                </div>
                            </div>
                        }
                    </div>

                    {/* More menu   */}

                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {(isPendingUnpublishProperty || isPendingPublishProperty) ? (
                                    <LoaderCircle/>
                                ) : (
                                    <Button variant="outline">Actions</Button>
                                )}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>Options</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                {
                                    canUnpublishProperties(currentUser?.userInfo) && (
                                        selectedProperty && selectedProperty.published && (
                                            <DropdownMenuItem
                                                onClick={() => unpublishPropertyHandler(selectedProperty.id)}>
                                                <X/>
                                                UnPublish
                                            </DropdownMenuItem>
                                        )
                                    )
                                }
                                {canPublishProperties(currentUser?.userInfo) && (selectedProperty && !selectedProperty.published && (
                                    <DropdownMenuItem
                                        onClick={() => publishPropertyHandler(selectedProperty.id)}>
                                        <EarthIcon/>
                                        <span>Publish</span>
                                    </DropdownMenuItem>

                                ))}

                                {selectedProperty && selectedProperty.published && !selectedProperty.promoted && (
                                    <DropdownMenuItem onClick={() => {
                                        if (promotePropertyModalRef) {
                                            promotePropertyModalRef.current?.open()
                                        }
                                    }}>
                                        <ChartNoAxesCombined/>
                                        <span>Promote Property</span>
                                    </DropdownMenuItem>
                                )}

                                <DropdownMenuItem>
                                    <XCircleIcon/> <span>Close</span>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                        {selectedProperty &&
                            <PromotePropertyForm
                                property={selectedProperty}
                                ref={promotePropertyModalRef}
                                onPromoted={propertyPromotedHandler}
                            />
                        }
                    </div>

                </div>


                {/* Content here for item detail */}

                {
                    (isPendingFetchProperties) &&
                    <div className=" py-4 px-6 flex flex-row overflow-y-auto gap-4">
                        {
                            Array.from({length: 4}).map((_, index) => (
                                <SkeletonCard key={"sk-" + index}/>
                            ))
                        }
                    </div>
                }

                {(dataFetchProperties && selectedProperty) && <ManagePropertyDetail
                    key={"property-detail-" + selectedProperty.id}
                    selectedProperty={selectedProperty}
                />}


            </div>
        </div>
    )
}

export default ManagePropertiesList;