"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/hooks/useDataTable";
import { Plus } from "lucide-react";
import Link from "next/link";
import GlassesTableActionBar from "./GlassesTableActionBar";
import { columns } from "./columns";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Product } from "@/types/products.types";

interface Props {
  products: Product[];
  rowCount: number;
}
export default function GlassesTable({ products, rowCount }: Props) {
  const { table } = useDataTable<Product>({
    columns,
    data: products,
    rowCount,
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
  });

  return (
    <div className="space-y-5 mt-5 @container">
      <div>
        <SidebarTrigger />
      </div>
      <div className="flex justify-between items-start">
        <div className="space-y-2 @lg:space-y-0">
          <Input
            className="max-w-xs"
            placeholder="Search product titles..."
            onChange={(e) => {
              table.getColumn("title")?.setFilterValue(e.currentTarget.value);
            }}
          />
          <DataTableColumnVisibilityToggler
            table={table}
            className="@lg:hidden"
            align="start"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <DataTableColumnVisibilityToggler
            table={table}
            className="hidden @lg:flex"
            align="end"
          />
          <Link href={"/dashboard/products/new"}>
            <Button size={"sm"}>
              <Plus /> New
            </Button>
          </Link>
        </div>
      </div>
      <DataTable table={table}></DataTable>
      <GlassesTableActionBar table={table} />
    </div>
  );
}
