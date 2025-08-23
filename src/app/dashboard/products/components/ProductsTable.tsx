"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/hooks/useDataTable";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Product } from "../lib/types";
import ProductTableActionBar from "./ProductTableActionBar";
import { columns } from "./columns";

const data: Product[] = [];

interface Props {
  products: Product[];
  rowCount: number;
}
export default function ProductsTable({ products, rowCount }: Props) {
  const { table } = useDataTable<Product>({
    columns,
    data: products,
    rowCount,
    initialState: {
      columnPinning: {
        left: ["select"],
        right: ["actions"],
      },
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <Input
          className="max-w-xs"
          placeholder="Search product titles..."
          onChange={(e) => {
            table.getColumn("title")?.setFilterValue(e.currentTarget.value);
          }}
        />
        <div className="flex justify-center items-center gap-2">
          <DataTableColumnVisibilityToggler table={table} />
          <Link href={"/dashboard/products/new"}>
            <Button size={"sm"}>
              <Plus /> New
            </Button>
          </Link>
        </div>
      </div>
      <DataTable table={table}></DataTable>
      <ProductTableActionBar table={table} />
    </div>
  );
}
