import { ColumnDef } from "@tanstack/react-table";
import { ListingType } from "@/types/ui.types";
import { DataTable } from "@/components/ui/data-table.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { Search } from "lucide-react";
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

function OfficeAgentsPage() {
  return (
    <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
        Agent List </h2>

         {/* Search bar */}
         <div className="relative w-full mx-auto mb-8">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                        <Search className="w-5 h-5" />
                    </div>

                    <input 
                        type="text"
                        placeholder="Find an agent"
                        className="w-full border border-gray-300 rounded-full py-3 pl-12 pr-24 text-[#6A6A6A] focus:outline-none"
                    />

                    <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#e50005] hover:bg-red-700 rounded-full px-4 py-2 text-white flex items-center gap-2">
                        <Search className="w-5 h-5" />
                        Search
                    </Button>
                </div>
    
      <h3 className="text-xl font-semibold mb-2">All Agent List</h3>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}

export default OfficeAgentsPage;
