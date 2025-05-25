import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useQuery} from "@tanstack/react-query";
import { apiGetPropertyCategories} from "@/api/properties.api.ts";
import {forwardRef, Ref, useCallback, useImperativeHandle, useState} from "react";

type Props = {
    defaultValue?: number,
    onCategorySelected?: (value: number) => void,
}
export type PropertyCategoryDropdownRef = {
    reset: () => void
}

const PropertyCategoriesDropdown = forwardRef(function PropertyCategoriesDropdown({ defaultValue, onCategorySelected }: Props, ref: Ref<PropertyCategoryDropdownRef | undefined>  ) {

    const [selectedCategoryId, setSelectedCategoryId] = useState<number|undefined>(undefined)

    const { data: propertyCategories } = useQuery<{id: number, title: string}[]>({ queryKey: ['property-categories'], queryFn: apiGetPropertyCategories })

    const categorySelectedHandler = useCallback((value: string) => {
        setSelectedCategoryId(+value)
        if(onCategorySelected) {
            onCategorySelected(Number(value)) }
    },[onCategorySelected])


    useImperativeHandle(ref, () => {
        return {
            reset: () => {
                setSelectedCategoryId(undefined)
            }
        }
    })

    return (
        <Select
            value={selectedCategoryId ? String(selectedCategoryId) : ""}
            defaultValue={defaultValue ? String(defaultValue) : undefined}
            onValueChange={categorySelectedHandler} required>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Category"/>
            </SelectTrigger>
            <SelectContent>
                {propertyCategories && propertyCategories.map((category) => {
                    return (
                        <SelectItem key={category.id} value={`${category['id']}`}>
                            {category['title'] as string}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
})

export default PropertyCategoriesDropdown