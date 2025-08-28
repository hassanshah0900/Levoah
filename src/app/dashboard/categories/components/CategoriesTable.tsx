"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../lib/queries";
import CategoriesTableActionBar from "./CategoriesTableActionBar";
import { columns } from "./columns";
import NewCategoryForm from "./NewCategoryForm";

export default function CategoriesTable() {
  const { data, status } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const { table } = useDataTable({
    data: data ? data.categories : [],
    columns,
    initialState: {
      columnPinning: {
        left: ["select"],
        right: ["actions"],
      },
    },
  });

  if (status === "error") return <div>An Error Occured.</div>;

  if (status === "pending") return <div>Loading...</div>;

  return (
    <div>
      <div className="my-4">
        <SidebarTrigger />
      </div>
      <div className="flex justify-between items-center mb-5">
        <Input className="max-w-2xs" />
        <div className="flex justify-center items-center gap-2">
          <DataTableColumnVisibilityToggler table={table} />
          <NewCategoryForm />
        </div>
      </div>
      <DataTable table={table}></DataTable>
      <CategoriesTableActionBar table={table} />
    </div>
  );
}
