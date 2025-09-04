import { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { ComponentProps, useMemo } from "react";
import { cn } from "@/lib/utils";

interface Props<TData> {
  table: Table<TData>;
  className?: string;
  align?: ComponentProps<typeof PopoverContent>["align"];
}
export default function DataTableColumnVisibilityToggler<TData>({
  table,
  className,
  align,
}: Props<TData>) {
  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanHide()),
    [table]
  );
  return (
    <div className={cn(className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} size={"sm"}>
            View <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-40" align={align}>
          <Command>
            <CommandInput placeholder={"Search columns..."} />
            <CommandList>
              <CommandEmpty>No columns found</CommandEmpty>
              <CommandGroup>
                {columns.map((column) => (
                  <CommandItem
                    key={column.id}
                    onSelect={() => {
                      column.toggleVisibility(!column.getIsVisible());
                    }}
                    className="capitalize"
                  >
                    <Check
                      className={
                        column.getIsVisible() ? "opacity-100" : "opacity-0"
                      }
                    />
                    {column.id}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
