import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";

type Props = {
    open: boolean;
    title?: string;
    description?: string;
    onCancel?: () => void;
    onConfirm: () => void;
    showOnCancel?: boolean;
};

export default function ConfirmDialog({ open, title, description, onCancel, onConfirm, showOnCancel = true }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onCancel}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title || "Are you sure?"}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    { showOnCancel && (<AlertDialogCancel onClick={onCancel}>Cancel</AlertDialogCancel>) }
                    <AlertDialogAction onClick={onConfirm}>{!showOnCancel ? (<span>Okay</span>) : (<span>Continue</span>)}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
