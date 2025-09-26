import ProductImage from "@/components/ProductImage";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType, ProductVariant } from "@/types/products.types";
import { createColumnHelper } from "@tanstack/react-table";
import GlassesVariantTableRowActions from "./GlassesVariantTableRowActions";

const columnHelper = createColumnHelper<ProductVariant<"glasses">>();

export function createGlassesVariantColumns(productType: ProductType) {
  const columns = [
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
    columnHelper.accessor("imageUrl", {
      id: "image_url",
      header: ({ column }) => (
        <DataTableColumnHeader title="Image" column={column} />
      ),
      cell: ({ getValue }) => (
        <div className="w-16">
          <ProductImage src={getValue()} alt="" />
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
    columnHelper.accessor("quantityInStock", {
      id: "Stock",
      header: ({ column }) => (
        <DataTableColumnHeader title="Stock" column={column} />
      ),
      cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
    }),
    columnHelper.accessor("attributes.frameColor", {
      id: "Frame Color",
      header: ({ column }) => (
        <DataTableColumnHeader title="Frame Color" column={column} />
      ),
      cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
      enableSorting: false,
    }),
    columnHelper.accessor("attributes.lenseColor", {
      id: "Lense Color",
      header: ({ column }) => (
        <DataTableColumnHeader title="Lense Color" column={column} />
      ),
      cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
      enableSorting: false,
    }),
    columnHelper.accessor("attributes.templeLength", {
      id: "Temple Length",
      header: ({ column }) => (
        <DataTableColumnHeader title="Temple Length" column={column} />
      ),
      cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
      enableSorting: false,
    }),
    columnHelper.accessor("attributes.bridgeWidth", {
      id: "Bridge Width",
      header: ({ column }) => (
        <DataTableColumnHeader title="Bridge Width" column={column} />
      ),
      cell: ({ getValue }) => <div className="ml-4">{getValue()}</div>,
      enableSorting: false,
    }),

    columnHelper.display({
      id: "actions",
      cell: ({ row }) => <GlassesVariantTableRowActions row={row} />,
      enablePinning: true,
      enableHiding: false,
      minSize: 50,
      size: 50,
    }),
  ];

  return columns;
}
