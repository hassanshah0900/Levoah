"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { getAllProductVariants } from "../lib/queries";
import { createProductVariantColumns } from "./productVariantColumns";
import GlassesVariantForm from "./GlassesVariantForm";
import { useMemo } from "react";

interface Props {
  productId: number;
}
export default function GlassesVariantsTable({ productId }: Props) {
  const columns = useMemo(
    () => createProductVariantColumns("glasses"),
    [productId]
  );

  const { data } = useQuery({
    queryKey: ["product_variants", productId],
    queryFn: () => getAllProductVariants({ productId }),
  });

  const { table } = useDataTable({
    data: data ? data.productVariants : [],
    columns: columns,
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
  });
  return (
    <div className="space-y-5 mt-5">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex justify-between items-center">
        <DataTableColumnVisibilityToggler table={table} />
        <GlassesVariantForm productId={productId} />
      </div>
      <DataTable table={table}></DataTable>
    </div>
  );
}
