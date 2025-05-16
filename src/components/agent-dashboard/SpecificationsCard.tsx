import {forwardRef, Ref, useEffect, useImperativeHandle, useState} from "react";
import {InnerFormComponent, KeyValue} from "@/lib/types";
import {getUuid} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircle, TrashIcon} from "lucide-react";
import {useDebouncedCallback} from "@/hooks/use-debounce-callback.ts"; // You can replace with a custom debounce if desired

type Props = {
    onChange?: (specs: KeyValue[]) => void
    spec?: KeyValue[]
    readOnly?: boolean,
    onDeleteSavedSpecification?: (id: number) => void
};
const starter: KeyValue[] = [{ localId: getUuid(), title: "", value: "" }]

const SpecificationsCard = forwardRef(({onChange, spec, onDeleteSavedSpecification, readOnly = false}: Props, ref: Ref<InnerFormComponent>) =>  {

    const [specifications, setSpecifications] = useState<KeyValue[]>(spec ? spec.map(sp => {
        if(!sp.localId) {
            sp.localId = getUuid()
        }
         return sp
    }) : starter);

    console.log("specs count => ", specifications.length)

    useImperativeHandle(ref, () => {
        return {
            clear() {
                setSpecifications(spec || starter);
            }
        }
    })

    const addNewSpecificationField = () => {
        setSpecifications(prev => [
            ...prev,
            { localId: getUuid(), title: "", value: "" }
        ]);
    };

    const removeSpecificationField = (localId?: string) => {
        setSpecifications(prev => prev.filter(spec => spec.localId !== localId));
        const spec = specifications.find(spec => spec.localId == localId)
        if(spec?.id && onDeleteSavedSpecification) {
            onDeleteSavedSpecification(spec.id)
        }
    };

    const updateSpecification = (localId: string | undefined, field: "title" | "value", value: string) => {
        setSpecifications(prev =>
            prev.map(spec =>
                spec.localId === localId ? { ...spec, [field]: value } : spec
            )
        );
    };

    const notifyParent = useDebouncedCallback((specs: KeyValue[]) => {
        if (onChange) {
            const nonEmpty = specs.filter(spec => spec.title.trim() !== "" || String(spec.value).trim() !== "");
            onChange(nonEmpty);
        }
    }, 500);

    useEffect(() => {
        notifyParent(specifications);
    }, [specifications, notifyParent]);

    console.log("specifications: ", specifications)

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">More Property Specifications</h2>
            <div className="space-y-4">
                {specifications.map((spec) => (
                    <div className="flex flex-col md:flex-row gap-4" key={`${spec.id}${spec.localId}`}>
                        <Input
                            placeholder="eg. utilities"
                            value={spec.title}
                            onChange={(e) => updateSpecification(spec.localId, "title", e.target.value)}
                            className="w-full"
                            readOnly={readOnly}
                        />
                        <Input
                            placeholder="eg. not included"
                            value={spec.value as string}
                            onChange={(e) => updateSpecification(spec.localId, "value", e.target.value)}
                            className="w-full"
                            readOnly={readOnly}
                        />
                        { <Button
                            type="button"
                            onClick={() => removeSpecificationField(spec.localId)}
                            variant="outline"
                        >
                            <TrashIcon className="text-red-700" />
                        </Button> }
                    </div>
                ))}
                { !readOnly && <Button type="button" variant="outline" onClick={addNewSpecificationField}>
                    <PlusCircle/> Add another specification
                </Button>}
            </div>
        </div>
    );
})

export default SpecificationsCard;
