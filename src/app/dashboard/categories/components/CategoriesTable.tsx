"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/hooks/useDataTable";
import { columns } from "./columns";
import NewCategoryForm from "./NewCategoryForm";
import CategoriesTableActionBar from "./CategoriesTableActionBar";

const categories = [{ id: "134", name: "Men", slug: "men" }];
export default function CategoriesTable() {
  const { table } = useDataTable({
    data: categories,
    columns,
    initialState: {
      columnPinning: {
        left: ["select"],
        right: ["actions"],
      },
    },
  });
  return (
    <div>
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
