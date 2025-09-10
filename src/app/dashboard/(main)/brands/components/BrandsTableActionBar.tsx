import DataTableActionBar, {
  DataTableActionBarAction,
} from "@/components/DataTable/DataTableActionBar";
import DeleteDialog from "@/components/DeleteDialog";
import { Table } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { Brand } from "../lib/types";

export default function BrandsTableActionBar({
  table,
}: {
  table: Table<Brand>;
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
