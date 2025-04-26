import {ChevronLeftIcon, ChevronRight} from 'lucide-react';
import { useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {
    apiGetProperties,
    apiGetPropertyDetail
} from "@/api/properties.api.ts";
import SkeletonListItem from "@/components/ui/SkeletonListItem.tsx";
import {PropertyModel} from "@/lib/types";
import {customLog} from "@/lib/utils.ts";
import {AxiosError} from "axios";
import ManagePropertyDetail from "@/components/shared-dashboard/ManagePropertyDetail.tsx";
import {Badge} from "@/components/ui/badge.tsx";

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



    const listItemClickHandler = (item: PropertyModel) => {
        // setSelectedProperty(item)
        mutatePropertyDetail(item)
        setActivatedMobileSection('detail')

    }


    return (
        <div className="py-4">
            <div className="flex flex-row border md:divide-x">
                <div className={` ${activatedMobileSection == 'list' ? 'block' : 'hidden' } md:block w-full md:w-[20%] divide-y`}>
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
                                className={`flex flex-row justify-between cursor-pointer py-4 px-4 text-sm ${selected? 'bg-[#f5f5f5]' : ''}`}>
                                <p className="inline-flex items-center gap-2 font-[Inter]">
                                    {item.title} { !item.published && "⚠️"}
                                    {/*{!item.published && <i className="fa-solid fa-circle text-amber-500 "></i>}*/}
                                </p>

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
                        {data && selectedProperty && <p className="font-semibold"> { selectedProperty.title } { !selectedProperty.published && (<Badge className={"bg-amber-500 rounded-full"} >Not published</Badge>) }  </p>}
                    </div>

                    {/* Content here for item detail */}

                    { ( isPendingPropertyDetail || selectedProperty) && <ManagePropertyDetail
                        key={selectedProperty?.id}
                        selectedProperty={selectedProperty}
                        isPendingPropertyDetail={isPendingPropertyDetail}
                    /> }
                </div>
            </div>
        </div>)
                        }

export default ManagePropertiesList;