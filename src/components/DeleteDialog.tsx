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
  dialogTitle?: string;
  dialogDescription?: string;
}
export default function DeleteDialog({
  open,
  onOpenChange,
  onDelete,
  dialogTrigger,
  dialogTitle,
  dialogDescription,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle || "Are you Sure?"}</DialogTitle>
          <DialogDescription>
            {dialogDescription || "This action can't be undone."}
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
