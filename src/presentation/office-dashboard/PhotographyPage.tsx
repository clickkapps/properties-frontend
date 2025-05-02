import {ColumnDef} from "@tanstack/react-table";
import { ListingType } from "@/lib/types";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import OfficeTotalOrders from "@/components/office-dashboard/OfficeTotalOrders.tsx";
import OfficeTotalPendingOrders from "@/components/office-dashboard/OfficeTotalPendingOrders.tsx";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {DataTable} from "@/components/ui/data-table.tsx";
import {payments} from "@/constants/ui.constants.ts";

const columns: ColumnDef<ListingType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Property",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const payment = row.original;

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
                            onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

function PhotographyPage() {
    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Photography Services </h2>

            <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-4 mb-10">
                <OfficeTotalOrders/>
                <OfficeTotalPendingOrders/>
            </div>

            <Tabs defaultValue="orders" className="w-full">

                <TabsList className="flex justify-start border-b rounded-none bg-white p-0 m-0">
                    <TabsTrigger value="orders"
                                 className="h-full md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold flex justify-start">
                        Completed Orders
                    </TabsTrigger>
                    <TabsTrigger value="pending"
                                 className="h-full md:pr-36  data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold  flex justify-start">Pending
                        Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="orders">
                    <DataTable columns={columns} data={payments}/>
                </TabsContent>

                <TabsContent value="pending">
                    <DataTable columns={columns} data={payments}/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default PhotographyPage;