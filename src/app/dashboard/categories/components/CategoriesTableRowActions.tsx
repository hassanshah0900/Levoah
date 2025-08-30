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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSingleCategory } from "../lib/actions";
import { toast } from "sonner";

interface Props {
  row: Row<Category>;
}

export default function CategoriesTableRowAction({ row }: Props) {
  const [openState, setOpenState] = useState<"EDIT" | "DELETE" | null>(null);
  const categoryName = row.original.name;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteSingleCategory,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success(`Successfully deleted category ${categoryName}`, {
        id: "delete_category",
      });
    },
    onError(error) {
      toast.error(error.message, { id: "delete_category" });
    },
  });

  function deleteCategory() {
    mutate(row.original);
    toast.loading(`Deleting category ${categoryName}`, {
      id: "delete_category",
    });
  }

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
        onDelete={deleteCategory}
      />
    </div>
  );
}
