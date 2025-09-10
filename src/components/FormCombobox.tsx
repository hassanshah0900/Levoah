import React, { ComponentProps, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface Props {
  align?: ComponentProps<typeof PopoverContent>["align"];
  notFoundMessage?: string;
  placeholder?: string;
  searchInputPlaceholder?: string;
  items: { label: string; value: string }[];
  onChange: (value: string) => void;
  value: string;
  invalid: boolean;
}
export default function FormCombobox({
  align,
  notFoundMessage,
  searchInputPlaceholder,
  placeholder,
  items,
  onChange,
  value,
  invalid,
}: Props) {
  const [open, setOpen] = useState(false);
  const [valueState, setValueState] = useState(value);

  function getButtonText() {
    const selectedItem = items.find(({ value }) => value === valueState);
    return selectedItem ? selectedItem.label : placeholder ?? "Select an item";
  }

  function handleItemSelect(value: string) {
    setOpen(false);
    onChange(value);
    setValueState(value);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("justify-center", invalid && "border-destructive")}
        >
          {getButtonText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="p-2">
        <Command>
          <CommandInput placeholder={searchInputPlaceholder ?? "Search..."} />
          <CommandList>
            <CommandEmpty>{notFoundMessage ?? "No result found."}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={handleItemSelect}
                >
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
