import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { createColumnHelper } from "@tanstack/react-table";
import Image from "next/image";
import placeholder from "../../../../../public/images/image-placeholder.webp";
import { Product } from "../lib/types";
import { calculatePercentage, getProductImageUrl } from "../lib/utils";
import ProductTableRowActions from "./ProductTableRowActions";

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
  columnHelper.accessor("image_url", {
    id: "image_url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Pic" />
    ),
    cell: ({ getValue }) => (
      <div className="relative h-10 aspect-square ml-2">
        <Image
          src={getProductImageUrl(getValue()!) || placeholder}
          alt=""
          fill
          className="object-center object-cover"
        />
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  }),
  columnHelper.accessor("title", {
    id: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ getValue }) => <div className="ml-3">{getValue()}</div>,
    enableColumnFilter: true,
  }),
  columnHelper.accessor("price", {
    id: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ getValue }) => <div className="ml-3">Rs {getValue()}</div>,
  }),
  columnHelper.accessor("sale_price", {
    id: "sale_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sale Price" />
    ),
    cell: ({ row }) => (
      <div className="ml-3">
        Rs {row.original.sale_price || row.original.price}
      </div>
    ),
  }),
  columnHelper.display({
    id: "discount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Discount" />
    ),
    cell: ({ row: { original } }) => (
      <div className="ml-5">
        {calculatePercentage(original.sale_price, original.price)}
      </div>
    ),
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
    id: "actions",
    cell: ({ row }) => <ProductTableRowActions row={row} />,
    enablePinning: true,
    enableHiding: false,
    minSize: 50,
    size: 50,
  }),
];
