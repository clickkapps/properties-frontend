import {ColumnDef} from "@tanstack/react-table";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {LoaderCircle, MoreHorizontal} from "lucide-react";
import {DataTable} from "@/components/ui/data-table.tsx";
import {ModalHandle, ShowingModel, TableUpdateReq} from "@/lib/types";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {apiDeleteShowing, apiGetShowings, apiUpdateShowingStatus} from "@/api/showings.api.ts";
import {forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState} from "react";
import {quickFormatDateTime} from "@/lib/utils.ts";
import EditShowingFormModal from "@/components/office-dashboard/showings/EditShowingFormModal.tsx";
import {toast} from "@/hooks/use-toast.ts";
import {apiResendPaymentReminder} from "@/api/subscription.api.ts";
import {useConfirmDialog} from "@/hooks/use-confirm-dialog.ts";
import {Badge} from "@/components/ui/badge.tsx";


type Props = {
    status: "pending" | "completed"
}

const ShowingsTable = forwardRef(( { status = "pending"  } : Props, ref: Ref<TableUpdateReq<ShowingModel> | undefined>) => {

    const [selectedRow, setSelectedRow] = useState<(ShowingModel & { nextAction?: "edit" | "delete" | "view"}) | undefined>(undefined)
    const { showConfirmDialog } = useConfirmDialog()
    const editPropertyShowingModalRef = useRef<ModalHandle>()
    const queryClient = useQueryClient();
    const { data, isPending } = useQuery<ShowingModel[]>({ queryKey: ['fetch-showings', status ], queryFn: () => apiGetShowings( { status: status } ) });

    useEffect(() => {
        if(selectedRow?.nextAction === "edit") {
            editPropertyShowingModalRef.current?.open()
        }
        // if(selectedRow?.nextAction === "delete")
    }, [selectedRow]);

    // open edit modal for user to update
    const openEditModalHandler = useCallback( ( item: ShowingModel ) => {
        setSelectedRow(() => {
            return {
                ...item,
                nextAction: "edit"
            }
        })
    }, [])

    // external components can manipulate (add / update) this table using the methods here.
    useImperativeHandle(ref, () => {
        return {
            add: (row: ShowingModel) => {
                // Optimistically update the UI
                addNewRecordToTable(row)

            // ------Rollback if the API call fails
            // queryClient.setQueryData<ShowingModel[]>(['fetch-showings', type], (old) =>
            //  old?.filter((item) => item.id !== row.id) || []
            //  );
            },
            update: (row: ShowingModel) => {
                // Optimistically update the UI
                updateRecordOnTable(row)
            },
        }
    })

    const addNewRecordToTable = (row: ShowingModel) => {
        queryClient.setQueryData<ShowingModel[]>(['fetch-showings', status ], (old) => {
            return old ? [row,...old] : [row];
        });
    }

    const updateRecordOnTable = (row: ShowingModel) => {
        queryClient.setQueryData<ShowingModel[]>(['fetch-showings', status ], (old) =>
            old?.map((item) => (item.id === row.id ? { ...item, ...row } : item)) || []
        );
        refreshAndSyncRecordsWithServer()
    }

    const removeRecordFromTable = useCallback((id: number) => {
        queryClient.setQueryData<ShowingModel[]>(['fetch-showings', status ], (old) =>
            old?.filter((item) => item.id !== id) || []
        );
    }, [queryClient, status])

    const refreshAndSyncRecordsWithServer = useCallback(() => {
        queryClient.invalidateQueries({ queryKey: ['fetch-showings', status ] }).catch((error) => {
            console.log("error syncing records: ", error.message)
        });
    }, [queryClient, status]);

    const deleteRecordHandler = useCallback((item: ShowingModel) => {

        const id = item.id
        if(!id) {
            toast({ title: "invalid record selected"})
            return
        }

        showConfirmDialog({
            title: "Delete?",
            description: `Delete appointment with ${item.user?.firstName} ${item.user?.lastName} on ${quickFormatDateTime(item.appointmentDate)}?`,
            onConfirm: () => {
                // Optimistically update the UI
                removeRecordFromTable(id)

                // Make the API call
                apiDeleteShowing(id).then(() => {
                    toast({ title: "Deleted!"})
                }).catch((error) => {
                    console.error("Error deleting showing:", error);
                    // re-fetch the data if rollback is needed
                    refreshAndSyncRecordsWithServer()
                });
            },
        })


    }, [showConfirmDialog, removeRecordFromTable, refreshAndSyncRecordsWithServer])

    // Action taken when admin want's the send payment reminder
    const resendPaymentReminderHandler = useCallback((model?: ShowingModel) => {
        if(!model) {
            toast({ title: "Invalid parameters", variant: "destructive" })
            return;
        }
        showConfirmDialog({
            title: "Resend reminder",
            description: `Send payment reminder to ${model.user?.firstName} ${model.user?.lastName}`,
            onConfirm: () => {
                toast({ title: "Payment reminder sent" })
                apiResendPaymentReminder({ userId: model.user?.id, subscriptionId: model.subscription?.id }).catch((error) => {
                    toast({ title: "Oops! Something went wrong", variant: "destructive", description: error.message})
                })
            }
        })
    }, [showConfirmDialog])

    const changeToCompletedHandler = useCallback((model?: ShowingModel) => {
        if(!model || !model.id) {
            toast({ title: "Invalid parameters", variant: "destructive" })
            return;
        }
        showConfirmDialog({
            title: "Completed?",
            description: `Have you completed your appointment with ${model.user?.firstName} ${model.user?.lastName}?. Appointment date: ${quickFormatDateTime(model.appointmentDate)}. Property Location: ${model.property?.title} @ ${model.property?.address}`,
            onConfirm: () => {
                toast({ title: "Status changed to completed" })
                removeRecordFromTable(model.id!)
                apiUpdateShowingStatus({ id: model.id, status: "completed" }).catch((error) => {
                    toast({ title: "Oops! Something went wrong", variant: "destructive", description: error.message})
                })
            }
        })
    }, [showConfirmDialog])

    const changeToCancelledHandler = useCallback((model?: ShowingModel) => {
        if(!model || !model.id) {
            toast({ title: "Invalid parameters", variant: "destructive" })
            return;
        }
        showConfirmDialog({
            title: "Cancelled?",
            description: `Have you cancelled your appointment with ${model.user?.firstName} ${model.user?.lastName}?. Appointment date: ${quickFormatDateTime(model.appointmentDate)}. Property Location: ${model.property?.title} @ ${model.property?.address}`,
            onConfirm: () => {
                toast({ title: "Status changed to cancelled" })
                removeRecordFromTable(model.id!)
                apiUpdateShowingStatus({ id: model.id, status: "cancelled" }).catch((error) => {
                    toast({ title: "Oops! Something went wrong", variant: "destructive", description: error.message})
                })
            }
        })
    }, [showConfirmDialog])

    const changeToPendingHandler = useCallback((model?: ShowingModel) => {

        if(!model || !model.id) {
            toast({ title: "Invalid parameters", variant: "destructive" })
            return;
        }
        showConfirmDialog({
            title: "Back to pending?",
            description: `Change appointment status to pending. Customer: ${model.user?.firstName} ${model.user?.lastName}, Appointment date: ${quickFormatDateTime(model.appointmentDate)}. Property Location: ${model.property?.title} @ ${model.property?.address}`,
            onConfirm: () => {
                toast({ title: "Status changed to pending" })
                removeRecordFromTable(model.id!)
                apiUpdateShowingStatus({ id: model.id, status: "pending" }).catch((error) => {
                    toast({ title: "Oops! Something went wrong", variant: "destructive", description: error.message})
                })
            }
        })
    }, [showConfirmDialog])

    //  Columns here -------
    const columns: ColumnDef<ShowingModel>[] = useMemo(() => {
        return  [
            {
                accessorKey: "appointmentDate",
                header: "Appointment Date",
                cell: ({ cell }) => {
                    const appointmentDate = cell.getValue()
                    if(typeof appointmentDate === "string") {
                        return <span className="font-[Inter]">{ quickFormatDateTime(appointmentDate) }</span>
                    }
                    return  cell
                }
            },
            {
                id: "customerName",
                header: "Customer",
                cell: ({ row }) => {
                    const user = row.original.user
                    const firstName = user?.firstName
                    const lastName = user?.lastName
                    const fullName = `${firstName} ${lastName}`
                    return (
                        <span> { fullName } </span>
                    )
                }
            },
            {
                accessorKey: "address",
                header: "Location",
                cell: ({ row }) => {
                    const property = row.original.property
                    return <span className="font-[Inter]">{ property?.address ? `${property?.title} @ ${property?.address}` :  'N/A' }</span>
                }
            },
            {
                id: "phone",
                header: "Phone number",
                cell: ({ row }) => {
                    const user = row.original.user
                    return (
                        <span className="font-[Inter]"> {user?.contactPhone || 'N/A'} </span>
                    )
                }
            },
            {
                id: "email",
                header: "Email",
                cell: ({ row }) => {
                    const user = row.original.user
                    return (
                        <span className=""> { user?.contactEmail || 'N/A' } </span>
                    )
                }
            },
            {
                accessorKey: "status",
                header: "Payment Status",
                cell: ({ row }) => {
                    const subscription = row.original.subscription
                    let html = <span> {subscription?.status || 'N/A'} </span>
                    if(subscription?.status == 'pending') {
                        html = <Badge className=""> Not paid </Badge>
                    }
                    if(subscription?.status == 'success') {
                        html = <Badge className="bg-teal-500"> Paid </Badge>
                    }
                    return (
                        html
                    )
                }
            },
            {
                id: "actions",
                cell: ({ row }) => {
                    const model = row.original;

                    return (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => {
                                        openEditModalHandler(model)
                                    } }
                                >
                                    Edit Record
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => {
                                        deleteRecordHandler(model)
                                    } }
                                >
                                    Delete record
                                </DropdownMenuItem>
                                {
                                    model.status === "pending" && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                resendPaymentReminderHandler(model)
                                            }}
                                        >
                                            Resend payment notification
                                        </DropdownMenuItem>
                                    )
                                }

                                {
                                    model.status === "pending" && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                changeToCompletedHandler(model)
                                            }}
                                        >
                                            Change To Completed
                                        </DropdownMenuItem>
                                    )
                                }

                                {
                                    (model.status === "pending" || model.status === "completed") && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                changeToCancelledHandler(model)
                                            }}
                                        >
                                            Change To Cancelled
                                        </DropdownMenuItem>
                                    )
                                }

                                {
                                    (model.status === "completed" || model.status === "cancelled") && (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                changeToPendingHandler(model)
                                            }}
                                        >
                                           Change To Pending
                                        </DropdownMenuItem>
                                    )
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    );
                },
            },
        ]
    }, [deleteRecordHandler, openEditModalHandler, resendPaymentReminderHandler]);


    if (isPending) {
        return (
            <div className="flex flex-row justify-center py-8">
                <LoaderCircle className="animate-spin" />
            </div>
        )
    }


    return (
        <>
            {/* Table containing records */}
            {<DataTable columns={columns} data={data || []}/>}

            {/* Edit modal here */}
            { selectedRow && <EditShowingFormModal
                initialValue={selectedRow}
                key={selectedRow.id}
                onUpdate={updateRecordOnTable}
                ref={editPropertyShowingModalRef} />
            }
        </>
    )
})

export default ShowingsTable