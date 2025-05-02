import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {DataTable} from "@/components/ui/data-table.tsx";
import {payments} from "@/constants/ui.constants.ts";
import {ColumnDef} from "@tanstack/react-table";
import { ListingType } from "@/lib/types";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {MoreHorizontal} from "lucide-react";
import PropertiesViewedCard from "@/components/office-dashboard/PropertiesViewedCard.tsx";
import PendingViewsCard from "@/components/office-dashboard/PendingViewsCard.tsx";
import PendingViewsTodayCard from "@/components/office-dashboard/PendingViewsTodayCard.tsx";

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

function ViewingsPage() {
    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Property viewings </h2>

            <div className=" grid grid-cols-1 md:grid-cols-3 md:gap-16 gap-4 mb-10">
                <PropertiesViewedCard/>
                <PendingViewsCard/>
                <PendingViewsTodayCard/>
            </div>

            <div className="mb-10">
                <h3 className="text-lg font-medium mb-6">Add Property to be viewed</h3>

                <form className="space-y-6">
                    {/* Client Name & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label className="block text-sm  mb-1">Property Name</label>
                            <Input
                                placeholder="name"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm  mb-1">Customer Name</label>
                            <Input
                                placeholder="name"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>
                    </div>

                    {/* Contact & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <label className="block text-sm  mb-1">Contact</label>
                            <Input
                                placeholder="name"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>
                        <div>
                            <label className="block text-sm  mb-1">Date</label>
                            <Input
                                placeholder="name"
                                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
                            />
                        </div>
                    </div>

                    {/* Button */}
                    <Button
                        type="submit"
                        className="bg-[#020050] hover:bg-[#0D0B66] rounded-md text-sm"
                    >
                        Add Order
                    </Button>
                </form>
            </div>

            <Tabs defaultValue="pending" className="w-full">

                <TabsList className="flex justify-start border-b rounded-none bg-white p-0 m-0">

                    <TabsTrigger value="pending"
                                 className="h-full md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold  flex justify-start">

                        Pending
                    </TabsTrigger>
                    <TabsTrigger value="orders"
                                 className="h-full md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold flex justify-start">
                        Viewed
                    </TabsTrigger>

                </TabsList>

                <TabsContent value="pending">
                    <DataTable columns={columns} data={payments}/>
                </TabsContent>

                <TabsContent value="orders">
                    <DataTable columns={columns} data={payments}/>
                </TabsContent>


            </Tabs>
        </div>
    )
}

export default ViewingsPage;