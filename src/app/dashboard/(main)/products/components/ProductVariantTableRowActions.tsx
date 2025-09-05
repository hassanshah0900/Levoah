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
import React, { useState } from "react";
import ProductVariantEditForm from "./ProductVariantEditForm";
import { Row } from "@tanstack/react-table";
import { ProductVariant } from "@/types/products.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSingleProductVariant } from "../lib/actions";
import { toast } from "sonner";

interface Props {
  row: Row<ProductVariant>;
}
export default function ProductVariantTableRowActions({ row }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteSingleProductVariant,
    onSuccess: () => {
      toast.success("Successfully delete product variant", {
        id: "delete_variant",
      });
      queryClient.invalidateQueries({
        queryKey: ["product_variants", row.original.product_id],
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
        <DropdownMenuContent>
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
      <ProductVariantEditForm
        open={openState === "EDIT"}
        onOpenChange={() => setOpenState(null)}
        productVariant={row.original}
      />
    </div>
  );
}
