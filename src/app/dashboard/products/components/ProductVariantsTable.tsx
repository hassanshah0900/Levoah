"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import { productVariantColumns } from "./productVariantColumns";
import ProductVariantForm from "./ProductVariantForm";
import { ProductVariant } from "@/types/products.types";

interface Props {
  product_id: number;
  variants: ProductVariant[];
}
export default function ProductVariantsTable({ product_id, variants }: Props) {
  const { table } = useDataTable({
    data: variants,
    columns: productVariantColumns,
  });
  return (
    <div className="space-y-5 mt-5">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex justify-between items-center">
        <DataTableColumnVisibilityToggler table={table} />
        <ProductVariantForm product_id={product_id} />
      </div>
      <DataTable table={table}></DataTable>
    </div>
  );
}
