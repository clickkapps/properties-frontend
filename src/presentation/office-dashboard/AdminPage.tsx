import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.tsx";
import OfficeTotalAdminCard from "@/components/office-dashboard/OfficeTotalAdminCard";
import {ColumnDef} from "@tanstack/react-table";
import {ListingType} from "@/types/ui.types";
import {DataTable} from "@/components/ui/data-table.tsx";

import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {MoreHorizontal} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox.tsx";
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
            const payment = row.original

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
            )
        },
    },
]

function AdminPage() {
    return (
        <div className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Admin Details </h2>

      <div className="w-1/2 mb-10">
        <OfficeTotalAdminCard />
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-6">Add Admin</h3>

        <form className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-sm  mb-1">First Name</label>
              <Input
                placeholder="name"
                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">Last Name</label>
              <Input
                placeholder="name"
                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
              />
            </div>
          </div>

          {/* Email & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-sm  mb-1">Email</label>
              <Input
                placeholder="name"
                className="focus:outline-none focus:ring-0 focus:ring-offset-0"
              />
            </div>
            <div>
              <label className="block text-sm  mb-1">Contact</label>
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
            Add Admin
          </Button>
        </form>
      </div>

      <h3 className="text-xl font-semibold mb-4">Admin List</h3>
                  <DataTable columns={columns} data={payments}/>
      </div>
    )
}

export default AdminPage;