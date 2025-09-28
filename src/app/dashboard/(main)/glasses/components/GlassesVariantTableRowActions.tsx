import DeleteDialog from "@/components/DeleteDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductVariant } from "@/types/products.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { deleteSingleGlassesVariant } from "../lib/actions";
import GlassesVariantEditForm from "./GlassesVariantEditForm";

interface Props {
  row: Row<ProductVariant<"glasses">>;
}
export default function GlassesVariantTableRowActions({ row }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteSingleGlassesVariant,
    onSuccess: () => {
      toast.success("Successfully delete product variant", {
        id: "delete_variant",
      });
      queryClient.invalidateQueries({
        queryKey: ["product_variants", row.original.productId],
      });
    },
    onError: () => {
      toast.error("Couldn't delete product variant for some reason", {
        id: "delete_variant",
      });
    },
  });

  const [openState, setOpenState] = useState<"EDIT" | "DELETE" | null>(null);

  function handleDelete() {
    mutate(row.original);
    toast.loading("Deleting product variant", { id: "delete_variant" });
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"sm"}>
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
      <DeleteDialog
        open={openState === "DELETE"}
        onOpenChange={() => setOpenState(null)}
        onDelete={handleDelete}
      />
      <GlassesVariantEditForm
        open={openState === "EDIT"}
        onOpenChange={() => setOpenState(null)}
        productVariant={row.original as ProductVariant<"glasses">}
      />
    </div>
  );
}
