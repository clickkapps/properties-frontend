import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useQuery} from "@tanstack/react-query";
import {apiGetProperties} from "@/api/properties.api.ts";
import {PropertyModel} from "@/lib/types";
import {forwardRef, Ref, useImperativeHandle, useState} from "react";

type Props = {
    onValueChange?: (id: number) => void;
    defaultValue?: number,
}

export type PropertyDropdownRef = {
    reset: () => void
}

const PropertiesDropdown = forwardRef(function PropertiesDropdown({ defaultValue, onValueChange }: Props, ref: Ref<PropertyDropdownRef | undefined>) {

    const [selectedPropertyId, setSelectedPropertyId] = useState<number|undefined>(undefined)

    const { data: dataFetchProperties } = useQuery<PropertyModel[]>({ queryKey: ['fetch-properties'], queryFn: () => apiGetProperties( {} ) });


    useImperativeHandle(ref, () => {
        return {
            reset: () => {
                setSelectedPropertyId(undefined)
            }
        }
    })

    const propertySelectedHandler = (val: string) => {
        if(onValueChange) { onValueChange(+val) }
        setSelectedPropertyId(+val)
    }

    return (
        <div className="w-full">
            <label className="block text-sm mb-1">Select Property*</label>
            <Select
                value={selectedPropertyId ? String(selectedPropertyId) : ""}
                onValueChange={propertySelectedHandler}
                    defaultValue={defaultValue ? String(defaultValue) : ""}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Property"/>
                </SelectTrigger>
                <SelectContent>
                    {dataFetchProperties && dataFetchProperties.map((property) => {
                        return (
                            <SelectItem key={property.id} value={`${property['id']}`}>{property['title'] as string} @ { property.address }</SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </div>
    )
})

export default PropertiesDropdown