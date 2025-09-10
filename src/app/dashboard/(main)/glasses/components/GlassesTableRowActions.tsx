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
import { toast } from "sonner";
import { deleteSingleProduct } from "../lib/actions";
import { useRouter } from "next/navigation";
import { Product } from "@/types/products.types";
import GlassesEditForm from "./GlassesEditForm";
import DeleteDialog from "@/components/DeleteDialog";

interface Props {
  row: Row<Product>;
}
export default function GlassesTableRowActions({ row }: Props) {
  const [openState, setOpenState] = useState<"DELETE" | "EDIT" | null>(null);
  const router = useRouter();

  function deleteProduct() {
    toast.promise(deleteSingleProduct(row.original.id), {
      loading: "Deleting product...",
      success: () => {
        router.refresh();
        return "Successfully deleted product";
      },
      error: ({ message }) => <div>{message}</div>,
    });
    setOpenState(null);
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
        onDelete={deleteProduct}
        open={openState === "DELETE"}
        onOpenChange={() => setOpenState(null)}
      />
      <GlassesEditForm
        product={row.original as Product<"glasses">}
        open={openState === "EDIT"}
        onOpenChange={() => setOpenState(null)}
      />
    </div>
  );
}
