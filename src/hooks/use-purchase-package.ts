import {useMutation} from "@tanstack/react-query";
import {apiPostInitiateSubscription, apiVerifySubscriptionStatus} from "@/api/subscription.api.ts";
import {AxiosError} from "axios";
import {customLog} from "@/lib/utils.ts";
import {toast} from "@/hooks/use-toast.ts";
import {PurchasePackageParams} from "@/lib/types";
import {useCallback} from "react";
import {usePaystackPayment} from "react-paystack";

// const paymentPublicKey = import.meta.env.VITE_PAYMENT_PUBLIC_KEY
function usePurchasePackage(onPurchaseSuccessFn: ({subId, extra}: {subId:number, extra?: {userId?:number, propertyId?: number}}) => void) {

    const initializePayment = usePaystackPayment({publicKey: ""});
    const processPaymentFn = useCallback((payload: { reference: string, currency: string, amount: number, email: string, pk: string }) => {
        const config = {
            reference: payload.reference,
            email: payload.email,
            amount: payload.amount,
            publicKey: payload.pk,
            currency: payload.currency,
        };

        initializePayment({
            config,
            onSuccess,
            onClose,
        })

    }, [initializePayment])

    // you can call this function anything
    const onSuccess = ({ reference }: { reference: string }) => {
        // Implementation for whatever you want to do with reference and after success call
        console.log("onPayStack success", );
        mutateVerifyTransaction(reference)

    };

    // you can call this function anything
    const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')

    }


    const { mutate: mutateVerifyTransaction, isPending: isPendingVerifyTransaction } = useMutation({
        mutationKey: ['verifyTransaction'],
        mutationFn: apiVerifySubscriptionStatus,
        onSuccess: ( { data }) => {
            const { status } = data
            if (status === "success") {
                onPurchaseSuccessFn(data)
            }
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            customLog("on error", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: axiosError.response?.data?.message || "Sorry! connection failed",
            })
        }
    })

    const { mutate, isPending } = useMutation({
        mutationKey: ['processPayment'],
        mutationFn: apiPostInitiateSubscription,
        onSuccess: (resp) => {
            const { reference,currency,  amount, email, pk } = resp.data
            processPaymentFn({
                reference,
                currency,
                amount,
                email,
                pk
            })
        },
        onError: (error) => {
            const axiosError = error as AxiosError<{ message: string }>;
            customLog("on error", error);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong",
                description: axiosError.response?.data?.message || "Sorry! connection failed",
            })
        }
    })


    const processPaymentHandler = useCallback((payload: PurchasePackageParams, ) => {
        mutate(payload)
    },[mutate])

    return {
        processPaymentFn: processPaymentHandler,
        isPurchasePackagePending: isPending || isPendingVerifyTransaction,
    }
}

export default usePurchasePackage;