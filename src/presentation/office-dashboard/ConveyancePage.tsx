import OfficeTotalOrders from "@/components/office-dashboard/OfficeTotalOrders";
import OfficeTotalPendingOrders from "@/components/office-dashboard/OfficeTotalPendingOrders";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { ListingType } from "@/lib/ui.types";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

function ConveyancePage() {
    return (
        <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-6"> Conveyance and Subject Removal Assistance </h2>

      <div className=" grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-4 mb-10">
        <OfficeTotalOrders />
        <OfficeTotalPendingOrders/>
      </div>

      <div className="mb-10">
  <h3 className="text-xl font-semibold mb-6">Add Order</h3>

  <form className="space-y-6">
    {/* Client Name & Contact */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm  mb-1">Client Name</label>
        <Input placeholder="name" className="focus:outline-none focus:ring-0 focus:ring-offset-0"/>
      </div>
      <div>
        <label className="block text-sm  mb-1">Contact</label>
        <Input placeholder="name" className="focus:outline-none focus:ring-0 focus:ring-offset-0" />
      </div>
    </div>

    {/* From, To, Date */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label className="block text-sm  mb-1">From Location</label>
        <Input placeholder="name" />
      </div>
      <div>
        <label className="block text-sm  mb-1">To Location</label>
        <Input placeholder="name" />
      </div>
      <div>
        <label className="block text-sm  mb-1">Date</label>
        <Input placeholder="name" />
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm  mb-1">Description</label>
      <Textarea placeholder="name" className="min-h-[120px]" />
    </div>

    {/* Button */}
    <Button type="submit" className="bg-[#020050] hover:bg-[#0D0B66] rounded-md text-sm">
      Add Order
    </Button>
  </form>
</div>

      <Tabs defaultValue="orders" className="w-full">

        <TabsList className="flex justify-start border-b rounded-none bg-white p-0 m-0">
          <TabsTrigger value="orders" className="h-full md:pr-36 data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold flex justify-start">
            Payments
          </TabsTrigger>
          <TabsTrigger value="pending" className="h-full md:pr-36  data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-red-700 data-[state=active]:shadow-none data-[state=active]:rounded-none data-[state=active]:text-red-700 data-[state=active]:font-semibold  flex justify-start">Pending Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <DataTable columns={columns} data={payments} />
        </TabsContent>

        <TabsContent value="pending">
          <DataTable columns={columns} data={payments} />
        </TabsContent>
      </Tabs>

    </div>
    )
}

export default ConveyancePage;