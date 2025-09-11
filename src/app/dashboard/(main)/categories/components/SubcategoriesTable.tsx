"use client";

import DataTable from "@/components/DataTable/DataTable";
import DataTableColumnVisibilityToggler from "@/components/DataTable/DataTableColumnVisibilityToggler";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDataTable } from "@/hooks/useDataTable";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { createSubcategory } from "../lib/actions";
import { getSubcategories } from "../lib/queries";
import { CategorySchemaType } from "../lib/validation";
import CategoriesTableActionBar from "./CategoriesTableActionBar";
import NewCategoryForm from "./NewCategoryForm";
import { subcategoriesColumns } from "./subcategoriesColumns";

export default function SubcategoriesTable() {
  const { slug } = useParams<{ slug: string }>();

  const queryClient = useQueryClient();

  const { data: categories, status } = useQuery({
    queryKey: ["subcategories", slug],
    queryFn: () => getSubcategories(slug),
  });

  const { mutate } = useMutation({
    mutationFn: createSubcategory,
    onSuccess() {
      toast.success("New category successfully created.", {
        id: "new_subcategory",
      });
      queryClient.invalidateQueries({ queryKey: ["subcategories", slug] });
    },
    onError(error) {
      toast.error(error.message, { id: "new_subcategory" });
    },
  });

  const { table } = useDataTable({
    data: categories ? categories : [],
    columns: subcategoriesColumns,
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
  });

  function handleCreate(category: CategorySchemaType) {
    mutate({ slug, category });
    toast.loading("Creating new category...", { id: "new_subcategory" });
  }

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
          <NewCategoryForm onCreate={handleCreate} />
        </div>
      </div>
      <DataTable table={table}></DataTable>
      <CategoriesTableActionBar table={table} />
    </div>
  );
}
