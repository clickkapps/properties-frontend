import {Ref, useEffect, useImperativeHandle, useState} from "react";
import {InnerFormComponent, KeyValue} from "@/lib/types";
import {getUuid} from "@/lib/utils.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PlusCircle, TrashIcon} from "lucide-react";
import {useDebouncedCallback} from "@/hooks/use-debounce-callback.ts"; // You can replace with a custom debounce if desired

type Props = {
    onChange?: (specs: KeyValue[]) => void;
    ref: Ref<InnerFormComponent>;
};


function SpecificationsCard({ onChange, ref }: Props) {

    const [specifications, setSpecifications] = useState<KeyValue[]>([{ id: getUuid(), key: "", value: "" }]);

    useImperativeHandle(ref, () => {
        return {
            clear() {
                setSpecifications([]);
            }
        }
    })

    const addNewSpecificationField = () => {
        setSpecifications(prev => [
            ...prev,
            { id: getUuid(), key: "", value: "" }
        ]);
    };

    const removeSpecificationField = (id?: string) => {
        setSpecifications(prev => prev.filter(spec => spec.id !== id));
    };

    const updateSpecification = (id: string | undefined, field: "key" | "value", value: string) => {
        setSpecifications(prev =>
            prev.map(spec =>
                spec.id === id ? { ...spec, [field]: value } : spec
            )
        );
    };

    const notifyParent = useDebouncedCallback((specs: KeyValue[]) => {
        if (onChange) {
            const nonEmpty = specs.filter(spec => spec.key.trim() !== "" || String(spec.value).trim() !== "");
            onChange(nonEmpty);
        }
    }, 500);

    useEffect(() => {
        notifyParent(specifications);
    }, [specifications, notifyParent]);

    return (
        <div>
            <h2 className="text-xl font-semibold mb-6">More Property Specifications</h2>
            <div className="space-y-4">
                {specifications.map((spec) => (
                    <div className="flex flex-col md:flex-row gap-4" key={spec.id}>
                        <Input
                            placeholder="eg. utilities"
                            value={spec.key}
                            onChange={(e) => updateSpecification(spec.id, "key", e.target.value)}
                            className="w-full"
                        />
                        <Input
                            placeholder="eg. not included"
                            value={spec.value as string}
                            onChange={(e) => updateSpecification(spec.id, "value", e.target.value)}
                            className="w-full"
                        />
                        <Button
                            type="button"
                            onClick={() => removeSpecificationField(spec.id)}
                            variant="outline"
                        >
                            <TrashIcon className="text-red-700" />
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="outline" onClick={addNewSpecificationField}>
                    <PlusCircle /> Add another specification
                </Button>
            </div>
        </div>
    );
}

export default SpecificationsCard;
