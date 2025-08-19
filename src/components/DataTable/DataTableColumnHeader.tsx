import {
  ChevronDown,
  ChevronDownIcon,
  ChevronsUpDown,
  ChevronUp,
  EyeClosed,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Column } from "@tanstack/react-table";
import { Button } from "../ui/button";

interface Props<TData> {
  column: Column<TData>;
  title: string;
}
export default function DataTableColumnHeader<TData>({
  column,
  title,
}: Props<TData>) {
  if (!column.getCanHide() && !column.getCanSort()) return <div>{title}</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"}>
          {title}{" "}
          {column.getCanSort() &&
            (column.getIsSorted() ? (
              column.getIsSorted() === "asc" ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )
            ) : (
              <ChevronsUpDown />
            ))}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="p-0">
        {column.getCanSort() && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex justify-between items-center"
              onSelect={() => column.toggleSorting(false)}
            >
              Asc
              <ChevronUp />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-between items-center"
              onSelect={() => column.toggleSorting(true)}
            >
              Des <ChevronDownIcon />
            </DropdownMenuItem>

            {column.getIsSorted() && (
              <DropdownMenuItem
                className="flex justify-between items-center"
                onSelect={() => column.clearSorting()}
              >
                Reset <X />
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        )}
        {column.getCanHide() && column.getCanSort() && (
          <DropdownMenuSeparator />
        )}
        {column.getCanHide() && (
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="flex justify-between items-center"
              onSelect={() => column.toggleVisibility(false)}
            >
              Hide <EyeClosed />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
