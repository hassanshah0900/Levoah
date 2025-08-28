"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { getAllProductVariants } from "../lib/queries";
import { productVariantColumns } from "./productVariantColumns";
import ProductVariantForm from "./ProductVariantForm";

interface Props {
  productId: number;
}
export default function ProductVariantsTable({ productId }: Props) {
  const { data } = useQuery({
    queryKey: ["product_variants"],
    queryFn: () => getAllProductVariants({ productId }),
  });

  const { table } = useDataTable({
    data: data ? data.productVariants : [],
    columns: productVariantColumns,
  });
  return (
    <div className="space-y-5 mt-5">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex justify-between items-center">
        <DataTableColumnVisibilityToggler table={table} />
        <ProductVariantForm productId={productId} />
      </div>
      <DataTable table={table}></DataTable>
    </div>
  );
}
