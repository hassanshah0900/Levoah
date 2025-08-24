import DeleteDialog from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import EditCategoryForm from "./EditCategoryForm";
import { Row } from "@tanstack/react-table";
import { Category } from "../lib/types";

interface Props {
  row: Row<Category>;
}

export default function CategoriesTableRowAction({ row }: Props) {
  const [openState, setOpenState] = useState<"EDIT" | "DELETE" | null>(null);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setOpenState("EDIT")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenState("DELETE")}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCategoryForm
        category={row.original}
        open={openState === "EDIT"}
        onOpenChange={() => setOpenState(null)}
      />
      <DeleteDialog
        dialogTitle="Something funny"
        dialogDescription="lorme ipsum"
        open={openState === "DELETE"}
        onOpenChange={() => setOpenState(null)}
        onDelete={() => null}
      />
    </div>
  );
}
