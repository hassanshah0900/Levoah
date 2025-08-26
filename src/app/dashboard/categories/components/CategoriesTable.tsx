"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { Input } from "@/components/ui/input";
import { useDataTable } from "@/hooks/useDataTable";
import { columns } from "./columns";
import NewCategoryForm from "./NewCategoryForm";
import CategoriesTableActionBar from "./CategoriesTableActionBar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Category } from "../lib/types";

const categories = [{ id: "134", name: "Men", slug: "men" }];
interface Props {
  categories: Category[];
}
export default function CategoriesTable({ categories }: Props) {
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
