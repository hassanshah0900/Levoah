import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import ProductTableRowActions from "./ProductTableRowActions";
import { Product } from "@/types/products.types";

const columnHelper = createColumnHelper<Product>();

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
  columnHelper.accessor("published", {
    id: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Published" />
    ),
    cell: ({ getValue }) => (
      <Badge variant={getValue() ? "default" : "secondary"} className="ml-2">
        {getValue() ? "Published" : "Draft"}
      </Badge>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("category", {
    id: "Category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue().name}</div>,
  }),
  columnHelper.display({
    id: "variants_link",
    cell: ({ row }) => (
      <Link
        href={`/dashboard/products/${row.original.id}`}
        className={buttonVariants({ variant: "link" })}
      >
        Variants
      </Link>
    ),
    enableColumnFilter: false,
    enableHiding: false,
    enableSorting: false,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <ProductTableRowActions row={row} />,
    enablePinning: true,
    enableHiding: false,
    minSize: 50,
    size: 50,
  }),
];
