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

interface Props {
  row: Row<ProductVariant>;
}
export default function ProductVariantTableRowActions({ row }: Props) {
  const [openState, setOpenState] = useState<"EDIT" | "DELETE" | null>(null);

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
        onDelete={() => null}
      />
      <ProductVariantEditForm
        open={openState === "EDIT"}
        onOpenChange={() => setOpenState(null)}
        productVariant={row.original}
      />
    </div>
  );
}
