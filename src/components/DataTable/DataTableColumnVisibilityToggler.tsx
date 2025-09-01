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
import { useMemo } from "react";

interface Props<TData> {
  table: Table<TData>;
}
export default function DataTableColumnVisibilityToggler<TData>({
  table,
}: Props<TData>) {
  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanHide()),
    [table]
  );
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"sm"}>
          View <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-40">
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
  );
}
