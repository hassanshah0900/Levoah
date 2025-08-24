import DataTableActionBar, {
  DataTableActionBarAction,
} from "@/components/DataTable/DataTableActionBar";
import DeleteDialog from "@/components/DeleteDialog";
import { Trash } from "lucide-react";
import React from "react";
import { Category } from "../lib/types";
import { Table } from "@tanstack/react-table";

export default function CategoriesTableActionBar({
  table,
}: {
  table: Table<Category>;
}) {
  return (
    <DataTableActionBar table={table}>
      <DeleteDialog
        onDelete={() => null}
        dialogTrigger={
          <DataTableActionBarAction tooltip="Delete all">
            <Trash />
          </DataTableActionBarAction>
        }
      />
    </DataTableActionBar>
  );
}
