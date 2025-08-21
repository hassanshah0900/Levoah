import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Product } from "../lib/types";
import ProductDeleteDialog from "./ProductDeleteDialog";
import ProductEditForm from "./ProductEditForm";

interface Props {
  row: Row<Product>;
}
export default function ProductTableRowActions({ row }: Props) {
  const [openState, setOpenState] = useState<"DELETE" | "EDIT" | null>(null);
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
      <ProductDeleteDialog
        onDelete={() => null}
        open={openState === "DELETE"}
        onOpenChange={() => setOpenState(null)}
      />
      <ProductEditForm
        product={row.original}
        open={openState === "EDIT"}
        onOpenChange={() => setOpenState(null)}
      />
    </div>
  );
}
