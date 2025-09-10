"use client";

import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import React from "react";
import { Brand } from "../lib/types";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import DataTable from "@/components/DataTable/DataTable";
import NewBrandForm from "./NewBrandForm";

export default function BrandsTable() {
  const { table } = useDataTable<Brand>({
    columns,
    data: [],
    rowCount: 2,
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
          <NewBrandForm />
        </div>
      </div>
      <DataTable table={table}></DataTable>
      {/* <GlassesTableActionBar table={table} /> */}
    </div>
  );
}
