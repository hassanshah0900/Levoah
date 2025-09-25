import { createColumnHelper } from "@tanstack/react-table";
import { Collection } from "../lib/types";

import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import CollectionsTableRowActions from "./CollectionsTableRowActions";

const columnHelper = createColumnHelper<Collection>();

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
  columnHelper.accessor("title", {
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("slug", {
    header: ({ column }) => (
      <DataTableColumnHeader title="Slug" column={column} />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
  }),
  columnHelper.accessor("description", {
    id: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ getValue }) => (
      <div className="ml-3 line-clamp-3">{getValue()}</div>
    ),
    size: 250,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <CollectionsTableRowActions row={row} />,
    enablePinning: true,
    enableHiding: false,
    minSize: 50,
    size: 50,
  }),
];
