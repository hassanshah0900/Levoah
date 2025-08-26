import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import placeholder from "../../../../../public/images/image-placeholder.webp";
import { Product } from "../lib/types";
import { calculatePercentage, getProductImageUrl } from "../lib/utils";
import ProductTableRowActions from "./ProductTableRowActions";
import Link from "next/link";

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

  columnHelper.accessor("description", {
    id: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
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
  columnHelper.display({
    id: "link",
    cell: ({ row }) => (
      <Link href={`/dashboard/products/${row.original.id}`}>Click Me</Link>
    ),
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
