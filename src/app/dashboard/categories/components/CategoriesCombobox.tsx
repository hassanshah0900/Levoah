"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState, useTransition } from "react";
import { getAllCategories } from "../lib/queries";
import { Category } from "../lib/types";

interface Props {
  onChange: (id: string) => void;
}
export default function CategoriesCombobox({ onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    startTransition(async () => {
      setCategories((await getAllCategories()).data);
    });
  }, []);

  function handleSelect(value: string) {
    onChange(value);
    setOpen(false);
    setValue(value);
  }

  function getButtonText() {
    if (!value || value === "no_parent") return "No Parent";
    return categories.find((category) => category.id === value)?.name;
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button role="combobox" variant={"outline"}>
          {getButtonText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            {isPending ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : (
              <>
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup>
                  {categories.map((category) => (
                    <CommandItem
                      key={category.id}
                      onSelect={() => handleSelect(category.id)}
                    >
                      {category.name}
                    </CommandItem>
                  ))}
                  <CommandItem onSelect={handleSelect} value="no_parent">
                    No Parent
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
