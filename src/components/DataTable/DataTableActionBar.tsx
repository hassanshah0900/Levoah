import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props<TData> {
  table: Table<TData>;
  children?: ReactNode;
}

export default function DataTableActionBar<TData>({
  table,
  children,
}: Props<TData>) {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 border border-border shadow-md p-1.5 rounded-sm text-sm flex justify-center items-center transition-all duration-300 gap-2 bg-background w-max h-11",
        table.getFilteredSelectedRowModel().rows.length > 0
          ? "-translate-y-5"
          : "translate-y-[200%]"
      )}
    >
      <DataTableActionBarSelection table={table} />
      <Separator orientation="vertical" className="bg-border" />
      <div className="flex justify-center items-center gap-1">{children}</div>
    </div>
  );
}

interface DataTableActionBarSelectionProps<TData> {
  table: Table<TData>;
}

function DataTableActionBarSelection<TData>({
  table,
}: DataTableActionBarSelectionProps<TData>) {
  return (
    <div className="flex justify-between items-center border border-border py-1.5 px-2 rounded-xs bg-background gap-1 h-8">
      <span>{table.getFilteredSelectedRowModel().rows.length} selected</span>
      <Separator orientation="vertical" className="bg-border min-w-[2px]" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="size-5 rounded-xs"
            onClick={() => table.resetRowSelection()}
          >
            <X className="size-3.5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Clear Selection</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

interface DataTableActionBarActionProps extends ComponentProps<typeof Button> {
  tooltip?: string;
}

export function DataTableActionBarAction({
  tooltip,
  size = "sm",
  children,
  ...props
}: DataTableActionBarActionProps) {
  const trigger = (
    <Button
      variant={"secondary"}
      size={size}
      {...props}
      className={`${size === "icon" && "size-7"}`}
    >
      {children}
    </Button>
  );

  if (!tooltip) return trigger;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
