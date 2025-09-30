import ProductImage from "@/components/ProductImage";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import { Brand } from "../lib/types";
import BrandsTableRowActions from "./BrandsTableRowActions";

const columnHelper = createColumnHelper<Brand>();

export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(checked) =>
          table.toggleAllPageRowsSelected(!!checked)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="mr-2"
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => row.toggleSelected(!!checked)}
        aria-label="Select row"
      />
    ),
    enableHiding: false,
  }),
  columnHelper.accessor("logo", {
    id: "Logo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Logo" />
    ),
    cell: ({ getValue }) => (
      <ProductImage src={getValue()} alt="" className="w-20" />
    ),
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("name", {
    id: "Name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("slug", {
    id: "Slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
    enableColumnFilter: true,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <BrandsTableRowActions row={row} />,
    size: 50,
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
  }),
];
