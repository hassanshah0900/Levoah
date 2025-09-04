import { createColumnHelper } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import Image from "next/image";
import { getProductImageUrl } from "../lib/utils";
import placeholderImage from "../../../../../public/images/image-placeholder.webp";
import { ProductVariant } from "@/types/products.types";
import ProductVariantTableRowActions from "./ProductVariantTableRowActions";

const columnHelper = createColumnHelper<ProductVariant>();

export const productVariantColumns = [
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
      <DataTableColumnHeader title="Image" column={column} />
    ),
    cell: ({ getValue }) => (
      <div className="relative w-10 aspect-square ml-4">
        <Image
          src={getProductImageUrl(getValue()) || placeholderImage}
          alt=""
          fill
          className="object-cover object-center"
        />
      </div>
    ),
    enableColumnFilter: false,
    enableSorting: false,
  }),
  columnHelper.accessor("price", {
    id: "price",
    header: ({ column }) => (
      <DataTableColumnHeader title="Price" column={column} />
    ),
    cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
  }),
  columnHelper.accessor("frame_color", {
    id: "frame_color",
    header: ({ column }) => (
      <DataTableColumnHeader title="Frame Color" column={column} />
    ),
    cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
  }),
  columnHelper.accessor("lense_color", {
    id: "lense_color",
    header: ({ column }) => (
      <DataTableColumnHeader title="Lense Color" column={column} />
    ),
    cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) => <ProductVariantTableRowActions row={row} />,
    enablePinning: true,
    enableHiding: false,
    minSize: 50,
    size: 50,
  }),
];
