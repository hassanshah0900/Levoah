import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { Check, CheckCircle, PlusCircle, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useCallback, useMemo } from "react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface Props<TData> {
  column: Column<TData>;
  title?: string;
}
export default function DataTableFacetedFilter<TData>({
  column,
  title,
}: Props<TData>) {
  const columnFilterValue = column.getFilterValue();

  const selectedValues = new Set(
    Array.isArray(columnFilterValue) ? columnFilterValue : []
  );

  const onItemSelect = (value: string, isSelected: boolean) => {
    if (isSelected) {
      selectedValues.delete(value);
    } else {
      selectedValues.add(value);
    }

    column.setFilterValue(
      selectedValues.size > 0 ? Array.from(selectedValues) : undefined
    );
  };

  const onResetFilters = () => {
    column.setFilterValue(undefined);
  };

  const options = column.columnDef.meta?.options;
  const label = title || column.columnDef.meta?.label;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"sm"} className="border-dashed">
          {selectedValues.size ? (
            <div
              role="button"
              aria-label={`Clear ${label} filters`}
              tabIndex={0}
              className="opacity-60 hover:opacity-100"
              onClick={onResetFilters}
            >
              <XCircle />
            </div>
          ) : (
            <PlusCircle />
          )}
          {label}
          {selectedValues.size > 0 && (
            <Separator orientation="vertical" className="max-h-4" />
          )}
          {selectedValues.size > 2 ? (
            <Badge>{selectedValues.size} selected</Badge>
          ) : (
            options
              ?.filter((option) => selectedValues.has(option.value))
              .map((option) => <Badge key={option.value}>{option.label}</Badge>)
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0 w-40">
        <Command>
          <CommandInput placeholder={label} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options &&
                options.map((option) => {
                  const isSelected = selectedValues.has(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={(value) => onItemSelect(value, isSelected)}
                    >
                      <div className="border border-border rounded-sm">
                        <Check
                          className={cn(
                            isSelected ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </div>
                      {option.icon && <option.icon />}
                      {option.label}
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={onResetFilters}
                    className="flex justify-center items-center"
                  >
                    Clear Filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
