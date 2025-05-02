import {useState, useCallback, ReactNode} from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog.tsx";
import {ConfirmDialogOptions} from "@/lib/types";
import { ConfirmDialogContext } from "./AppContexts.ts"


export default function ConfirmDialogProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmDialogOptions>({});

    const showConfirmDialogHandler = useCallback((opts: ConfirmDialogOptions) => {
        setOptions(opts);
        setIsOpen(true);
    }, []);


    const handleConfirm = () => {
        options.onConfirm?.();
        setIsOpen(false);
    };

    const ctxValue = {
        showConfirmDialog: showConfirmDialogHandler
    }

    return (
        <ConfirmDialogContext.Provider value={ ctxValue }>
            {children}
            <ConfirmDialog
                open={isOpen}
                title={options.title}
                description={options.description}
                onCancel={() => setIsOpen(false)}
                onConfirm={handleConfirm}
                showOnCancel={options.showOnCancel}
            />
        </ConfirmDialogContext.Provider>
    );
}

