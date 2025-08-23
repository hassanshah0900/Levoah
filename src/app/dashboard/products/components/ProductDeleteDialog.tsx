"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface Props {
  onDelete: () => void;
  dialogTrigger?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export default function ProductDeleteDialog({
  open,
  onOpenChange,
  onDelete,
  dialogTrigger,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you Sure?</DialogTitle>
          <DialogDescription>
            This action can't be undone. It will permanently delete the
            product(s).
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-2">
          <DialogClose asChild>
            <Button variant={"destructive"} onClick={onDelete}>
              Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
