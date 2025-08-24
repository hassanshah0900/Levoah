import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import CategoriesTableRowActions from "./CategoriesTableRowActions";
import { Category } from "../lib/types";

const columnHelper = createColumnHelper<Category>();

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
    enableSorting: false,
    enableColumnFilter: false,
    enableHiding: false,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
  }),
  columnHelper.accessor("slug", {
    id: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <CategoriesTableRowActions row={row} />,
    size: 50,
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
  }),
];
