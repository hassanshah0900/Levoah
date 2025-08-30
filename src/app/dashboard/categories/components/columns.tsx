import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import CategoriesTableRowActions from "./CategoriesTableRowActions";
import { Category } from "../lib/types";
import ProductImage from "@/app/(app)/products/components/ProductImage";

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
  columnHelper.accessor("image_url", {
    id: "Image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
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
  }),
  columnHelper.accessor("slug", {
    id: "Slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
  }),
  columnHelper.accessor("parent_category", {
    id: "Parent Category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Parent Category" />
    ),
    cell: ({ getValue, table }) => {
      const parent_category = table
        .getCoreRowModel()
        .rows.map((row) => row.original)
        .find((category) => category.id === getValue());
      return (
        <div className="ml-3">
          {parent_category ? parent_category.name : "No Parent"}
        </div>
      );
    },
  }),
  columnHelper.accessor("description", {
    id: "Description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
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
