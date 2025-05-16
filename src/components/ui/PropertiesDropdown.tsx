import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useQuery} from "@tanstack/react-query";
import {apiGetProperties} from "@/api/properties.api.ts";
import {PropertyModel} from "@/lib/types";

type Props = {
    onValueChange?: (id: number) => void;
    selectedId?: number,
}

function PropertiesDropdown({ selectedId, onValueChange }: Props) {

    const { data: dataFetchProperties } = useQuery<PropertyModel[]>({ queryKey: ['fetch-properties'], queryFn: () => apiGetProperties( {} ) });

    return (
        <div className="w-full">
            <label className="block text-sm mb-1">Select Property*</label>
            <Select onValueChange={(val: string) => {
                if(onValueChange) { onValueChange(+val) }
            }} defaultValue={selectedId ? String(selectedId) : ""}>
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
}

export default PropertiesDropdown