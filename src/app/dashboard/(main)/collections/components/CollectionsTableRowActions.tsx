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
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCollection } from "../lib/actions";
import { Collection } from "../lib/types";

interface Props {
  row: Row<Collection>;
}
export default function CollectionsTableRowActions({ row }: Props) {
  const [openState, setOpenState] = useState<"DELETE" | "EDIT" | null>(null);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCollection,
    onSuccess() {
      toast.success("Successfully deleted collection.", {
        id: "delete collection",
      });
      queryClient.invalidateQueries({ queryKey: ["collections"] });
    },
    onError() {
      toast.error("An error occured while deleting collection.", {
        id: "delete collection",
      });
    },
  });

  function deleteProduct() {
    mutate(row.original);
    toast.loading("Deleting collection...", { id: "delete collection" });
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
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/collections/${row.original.slug}/edit`}>
                Edit
              </Link>
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
    </div>
  );
}
