import DataTableActionBar, {
  DataTableActionBarAction,
} from "@/components/DataTable/DataTableActionBar";
import { table } from "console";
import { CircleCheckBig, Trash } from "lucide-react";
import ProductDeleteDialog from "./ProductDeleteDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Product } from "../lib/types";

interface Props {
  table: Table<Product>;
}
export default function ProductTableActionBar({ table }: Props) {
  return (
    <DataTableActionBar table={table}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DataTableActionBarAction tooltip="Status">
            <CircleCheckBig />
          </DataTableActionBarAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={10}>
          <DropdownMenuGroup>
            <DropdownMenuItem>Publish</DropdownMenuItem>
            <DropdownMenuItem>Save as draft</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductDeleteDialog
        dialogTrigger={
          <DataTableActionBarAction tooltip="Delete All">
            <Trash />
          </DataTableActionBarAction>
        }
        onDelete={() => null}
      />
    </DataTableActionBar>
  );
}
