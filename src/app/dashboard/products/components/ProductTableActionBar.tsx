import DataTableActionBar, {
  DataTableActionBarAction,
} from "@/components/DataTable/DataTableActionBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { CircleCheckBig, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  changeProductsPublishedStatus,
  deleteMultipleProducts,
} from "../lib/actions";
import { Product } from "../lib/types";
import ProductDeleteDialog from "./ProductDeleteDialog";

interface Props {
  table: Table<Product>;
}
export default function ProductTableActionBar({ table }: Props) {
  const router = useRouter();

  function deleteProducts() {
    const productIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);
    toast.promise(deleteMultipleProducts(productIds), {
      loading: "Deleting products...",
      success: () => {
        router.refresh();
        return "Products successfully deleted.";
      },
      error: ({ message }) => <div>{message}</div>,
    });
    console.log("Product Ids: ", productIds);
  }

  function changePublishedStatus(published: boolean) {
    const productIds = table
      .getFilteredSelectedRowModel()
      .rows.map((row) => row.original.id);

    toast.promise(changeProductsPublishedStatus(productIds, published), {
      loading: "Changing status...",
      success: () => {
        router.refresh();
        return "Successfully changed status.";
      },
      error: ({ message }) => <div>{message}</div>,
    });
  }
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
            <DropdownMenuItem onSelect={() => changePublishedStatus(true)}>
              Publish
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => changePublishedStatus(false)}>
              Save as draft
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProductDeleteDialog
        dialogTrigger={
          <DataTableActionBarAction tooltip="Delete All">
            <Trash />
          </DataTableActionBarAction>
        }
        onDelete={deleteProducts}
      />
    </DataTableActionBar>
  );
}
