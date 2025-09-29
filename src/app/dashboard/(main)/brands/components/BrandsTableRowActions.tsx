import DeleteDialog from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteSingleBrand } from "../lib/actions";
import { Brand } from "../lib/types";
import EditBrandForm from "./EditBrandForm";

interface Props {
  row: Row<Brand>;
}

export default function BrandsTableRowAction({ row }: Props) {
  const [openState, setOpenState] = useState<"EDIT" | "DELETE" | null>(null);
  const brandName = row.original.name;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteSingleBrand,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
      toast.success(`Successfully deleted brand ${brandName}`, {
        id: "delete_brand",
      });
    },
    onError(error) {
      toast.error(error.message, { id: "delete_brand" });
    },
  });

  function deleteCategory() {
    mutate(row.original);
    toast.loading(`Deleting brand ${brandName}`, {
      id: "delete_brand",
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

      <EditBrandForm
        brand={row.original}
        open={openState === "EDIT"}
        onOpenChange={() => setOpenState(null)}
      />
      <DeleteDialog
        open={openState === "DELETE"}
        onOpenChange={() => setOpenState(null)}
        onDelete={deleteCategory}
      />
    </div>
  );
}
