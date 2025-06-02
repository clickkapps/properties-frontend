import { Button } from "@/components/ui/button"
import {LoaderCircle, Sparkle} from "lucide-react"
import {
    Dialog,
    DialogContent, DialogDescription, DialogFooter,
    // DialogDescription,
    // DialogFooter,
    DialogHeader, DialogTitle,
    // DialogTitle,
} from "@/components/ui/dialog"
import {useAppDispatch, useAppSelector} from "@/hooks";
import {
    onCloseSubscriptionDialog,
    onOpenSubscriptionDialog,
    toggleSubscriptionDialog
} from "@/store/ui-slice.ts";
import {createPortal} from "react-dom";
import {useCallback, useState} from "react";
import { PackageModel} from "@/lib/types";
import useFetchPackages from "@/hooks/use-fetch-packages.ts";
import {Badge} from "@/components/ui/badge.tsx";
import usePurchasePackage from "@/hooks/use-purchase-package.ts";
import {addYears} from "date-fns";
import {useMutation} from "@tanstack/react-query";
import {apiUpdateUserEntitlement} from "@/api/users.api.ts";
import {toast} from "@/hooks/use-toast.ts";
import {updateAuthUser} from "@/store/auth-slice.ts";
import {axiosErrorHandler} from "@/lib/utils.ts";

function EntitlementSubscriptionModal() {

    const { open: openSubscriptionDialog, option: subSubscriptionDialogOption } = useAppSelector(state => state.ui.subscriptionDialogState)
    const dispatch = useAppDispatch()
    const [selectedPkg, setSelectedPkg] = useState<PackageModel|undefined>(undefined)
    const { mutate: mutateUpdateUserEntitlement, isPending: isPendingUpdateUserEntitlement  } = useMutation({
        mutationKey: ["updateUserEntitlement"],
        mutationFn: apiUpdateUserEntitlement,
        onSuccess: (res) => {
            const userInfo = res.data;
            dispatch(updateAuthUser({ userInfo: userInfo }))
            setSelectedPkg(undefined)
            toast({
                variant: "default",
                title: "You did it! 🚀🔥🔥",
                description: "Your membership status has been updated!",
            });
            dispatch(onCloseSubscriptionDialog({ option: null }));
        },
        onError: axiosErrorHandler
    })

    const onPurchaseSuccessFn = useCallback(({ subId }: { subId: number, extra?: { userId?: number} } ) => {

        dispatch(onOpenSubscriptionDialog({ option: null }))

        if(!selectedPkg){
            console.log("No package selected!");
            return
        }

        let entitlement: string|undefined = undefined
        if(selectedPkg.slug === "basic") {
            entitlement = "basic"
        }
        else if(selectedPkg.slug === "standard") {
            entitlement = "standard"
        } else {
            return
        }

        mutateUpdateUserEntitlement({ entitlement: entitlement, subscriptionId: subId})

    }, [dispatch, mutateUpdateUserEntitlement, selectedPkg])


    const { isFetchingPackages, packages } = useFetchPackages("entitlement")
    const {  processPaymentFn, isPurchasePackagePending } = usePurchasePackage(onPurchaseSuccessFn)

    if(isFetchingPackages) {
        return (
            <div className="max-w-4xl mx-auto mt-10 p-6">
                <LoaderCircle />
            </div>
        )
    }

    const packageClickHandler = (pkg: PackageModel) => {
        setSelectedPkg(pkg)
    }

    const dialogVisibilityChangeHandler = () => {
        dispatch(toggleSubscriptionDialog({option: null}))
    }

    const continueWithPkgHandler = () => {
        let packageSlug: undefined | "basic_package" | "standard_package" = undefined
        if(selectedPkg?.slug === "basic") {
            packageSlug = "basic_package"
        }
        else if(selectedPkg?.slug === "standard") {
            packageSlug = "standard_package"
        } else {
            return
        }

        // hide this dialog to reveal the payment modal
        dispatch(onCloseSubscriptionDialog({ option: null}))
        // payment
        processPaymentFn({
            packageSlug: packageSlug,
            startDate: new Date().toISOString(),
            endDate: addYears(new Date(), 70).toISOString(),
        })
    }

    const content = (
        <div className="max-w-4xl mt-10 p-6 text-center space-y-6">
            <div className="space-y-2 w-full">
                <Sparkle className="mx-auto h-10 w-10 text-red-500"/>
                <h1 className="text-2xl font-bold text-gray-800">
                    Subscription
                </h1>
                <p className="text-gray-600">
                    Activate a package from the list below
                </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
                {packages && packages.filter(item => {
                    if(subSubscriptionDialogOption === "all"){
                        return true
                    }
                    return item.slug === subSubscriptionDialogOption
                }).map((pkg, index) => (
                    <div key={pkg.slug}
                         className={`p-4 rounded-lg border cursor-pointer hover:bg-slate-200 w-full ${selectedPkg?.slug === pkg.slug && (`bg-slate-200`)}`}
                         onClick={() => packageClickHandler(pkg)}>
                        <div className="flex items-start gap-4">
                            <div
                                className="flex w-10 h-8 rounded-full items-center justify-center  bg-black text-white text-primaryfont-semibold">
                                <span>{index + 1}</span>
                            </div>
                            <div className="flex flex-col text-start w-full">
                                <h3 className=" font-medium flex justify-between gap-2 font-[Inter]">
                                    <span>{pkg.name}</span><Badge
                                    className="bg-teal-500/50 text-black shadow-none">{pkg.currency} {pkg.price}</Badge>
                                </h3>
                                <p className="text-sm mt-1">Continue with {pkg.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


    return createPortal((
        <Dialog open={openSubscriptionDialog} onOpenChange={() => {
            dialogVisibilityChangeHandler()
        }}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Hold on!</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                {content}
                { selectedPkg && <DialogFooter>
                    <Button variant={"default"} type="button" onClick={continueWithPkgHandler}
                            disabled={(isPurchasePackagePending || isPendingUpdateUserEntitlement)}
                    >
                        { (isPurchasePackagePending || isPendingUpdateUserEntitlement) ?  (<LoaderCircle className="animate-spin" />) : (
                            <span>Continue</span>)}
                    </Button>
                </DialogFooter> }
            </DialogContent>
        </Dialog>
    ), document.getElementById('modal') as HTMLElement )
}


export default EntitlementSubscriptionModal