import ProductImage from "@/app/(app)/products/components/ProductImage";
import DataTableColumnHeader from "@/components/DataTable/DataTableColumnHeader";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductType, ProductVariant } from "@/types/products.types";
import { createColumnHelper } from "@tanstack/react-table";
import { AttributeColumnType, glassesColumns } from "../lib/data";
import { parseProductAttribute } from "../lib/utils";
import GlassesVariantTableRowActions from "./GlassesVariantTableRowActions";

const columnHelper = createColumnHelper<ProductVariant>();

const productTypeAttributeMap = {
  glasses: glassesColumns,
  accessories: [],
};

function makeAttributesColumns(keys: AttributeColumnType[]) {
  return keys.map((key) => {
    return columnHelper.accessor(`attributes.${key.propertyName}`, {
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={key.label} />
      ),
      cell: ({ getValue }) => (
        <div className="ml-3">
          {parseProductAttribute(getValue() as string).value}
        </div>
      ),
    });
  });
}

export function createProductVariantColumns(productType: ProductType) {
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
    columnHelper.accessor("image_url", {
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
    ...makeAttributesColumns(productTypeAttributeMap[productType]),
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
