"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import DataTableLoadingSkeleton from "@/components/DataTable/DataTableLoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getAllProducts } from "../lib/queries";
import GlassesTableActionBar from "./GlassesTableActionBar";
import { columns } from "./columns";

const DEFAULT_PAGE_SIZE = 10;
export default function GlassesTable() {
  const { data: glasses, status } = useQuery({
    queryKey: ["glasses"],
    queryFn: getAllProducts,
  });
  const { table } = useDataTable({
    columns,
    data: glasses ?? [],
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
      {status === "pending" ? (
        <DataTableLoadingSkeleton
          hasPagination
          hasSearch
          hasColumnVisibilityToggler
          shouldShrink={false}
        />
      ) : status === "error" ? (
        <div>An Error Occured</div>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <div className="space-y-2 @lg:space-y-0">
              <Input
                className="max-w-xs"
                placeholder="Search product titles..."
                onChange={(e) => {
                  table
                    .getColumn("title")
                    ?.setFilterValue(e.currentTarget.value);
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
              <Link href={"/dashboard/glasses/new"}>
                <Button size={"sm"}>
                  <Plus /> New
                </Button>
              </Link>
            </div>
          </div>
          <DataTable table={table}></DataTable>
        </>
      )}
      <GlassesTableActionBar table={table} />
    </div>
  );
}
