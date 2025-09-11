"use client";

import { cn } from "@/lib/utils";
import { ComponentProps, useState } from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
          className={cn(
            "justify-start",
            valueState || "text-muted-foreground font-normal",
            invalid && "border-destructive"
          )}
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
