"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
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
    queryKey: ["base categories"],
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

  if (status === "error") return <div>An Error Occured.</div>;

  if (status === "pending") return <div>Loading...</div>;

  return (
    <div className="space-y-5 mt-5 @container">
      <div>
        <SidebarTrigger />
      </div>
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
      <CategoriesTableActionBar table={table} />
    </div>
  );
}
