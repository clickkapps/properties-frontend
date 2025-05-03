import { Button } from "@/components/ui/button"
import {LoaderCircle, LockKeyhole} from "lucide-react"
import {
    Dialog,
    DialogContent, DialogDescription, DialogFooter,
    // DialogDescription,
    // DialogFooter,
    DialogHeader, DialogTitle,
    // DialogTitle,
} from "@/components/ui/dialog"
import {useAppDispatch, useAppSelector} from "@/hooks";
import {toggleSubscriptionDialog} from "@/store/ui-slice.ts";
import {createPortal} from "react-dom";
import {useState} from "react";
import { PackageModel} from "@/lib/types";
import useFetchPackages from "@/hooks/use-fetch-packages.ts";
import {Badge} from "@/components/ui/badge.tsx";

function EntitlementSubscriptionDialog() {

    const [selectedPkg, setSelectedPkg] = useState<PackageModel|undefined>(undefined)
    const openSubscriptionDialog = useAppSelector(state => state.ui.openSubscriptionDialog)
    const dispatch = useAppDispatch()
    const { isFetchingPackages, packages } = useFetchPackages("entitlement")

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
        setSelectedPkg(undefined)
        dispatch(toggleSubscriptionDialog())
    }

    const continueWithPkgHandler = () => {
        // payment
    }

    const content = (
        <div className="max-w-4xl mx-auto mt-10 p-6 text-center space-y-6">
            <div className="space-y-2">
                <LockKeyhole className="mx-auto h-10 w-10 text-red-500" />
                <h1 className="text-2xl font-bold text-gray-800">
                    Subscription Required
                </h1>
                <p className="text-gray-600">
                    You need to subscribe to either the Basic or Standard package to continue.
                </p>
            </div>

            <div className="flex flex-col gap-2">
                {packages && packages.map((pkg, index) => (
                    <div key={pkg.slug} className={`p-4 rounded-lg border cursor-pointer hover:bg-slate-200 ${selectedPkg?.slug === pkg.slug && (`bg-slate-200`)}`} onClick={() => packageClickHandler(pkg)}>
                        <div className="flex items-start gap-4">
                            <div
                                className="flex w-10 h-8 rounded-full items-center justify-center  bg-black text-white text-primaryfont-semibold">
                                <span>{ index + 1}</span>
                            </div>
                            <div className="flex flex-col text-start w-full">
                                <h3 className=" font-medium flex justify-between gap-2 font-[Inter]"><span>{pkg.name}</span><Badge className="bg-teal-500/50 text-black shadow-none">{pkg.currency} { pkg.price }</Badge> </h3>
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
                    <Button variant={"default"} type="button" onClick={continueWithPkgHandler}>Continue</Button>
                </DialogFooter> }
            </DialogContent>
        </Dialog>
    ), document.getElementById('modal') as HTMLElement )
}


export default EntitlementSubscriptionDialog