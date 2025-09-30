"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import DataTableLoadingSkeleton from "@/components/DataTable/DataTableLoadingSkeleton";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { getBaseCategories } from "../lib/queries";
import CategoriesTableActionBar from "./CategoriesTableActionBar";
import { columns } from "./columns";
import NewCategoryForm from "./NewCategoryForm";

export default function CategoriesTable() {
  const { data: categories, status } = useQuery({
    queryKey: ["categories", "base"],
    queryFn: getBaseCategories,
  });

  const { table } = useDataTable({
    data: categories ? categories : [],
    columns,
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
              <Input className="max-w-xs" placeholder="Search categories..." />
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
              <NewCategoryForm />
            </div>
          </div>
          <DataTable table={table}></DataTable>
        </>
      )}
      <CategoriesTableActionBar table={table} />
    </div>
  );
}
