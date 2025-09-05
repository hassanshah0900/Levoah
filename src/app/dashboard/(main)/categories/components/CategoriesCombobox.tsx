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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getAllCategories } from "../lib/queries";
import { Category } from "../lib/types";
import { useForm, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type ParentCategory = Category["parent_category"];
interface Props {
  onChange: (id: ParentCategory) => void;
  name: string;
  value: ParentCategory;
  placeholder?: string;
}
export default function CategoriesCombobox({
  name,
  onChange,
  value,
  placeholder = "No Parent",
}: Props) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<ParentCategory>(value);

  const {
    formState: { errors },
  } = useFormContext();

  function handleSelect(categoryId: ParentCategory) {
    onChange(categoryId ?? null);
    setOpen(false);
    setCategoryId(categoryId);
  }

  function getButtonText() {
    if (!categoryId) return placeholder;
    return data?.categories.find((category) => category.id === categoryId)
      ?.name;
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant={"outline"}
          className={cn(errors[name] && "border-destructive")}
        >
          {getButtonText()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2" align="start">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            {isError ? (
              <CommandEmpty>
                An Error occured while fetching categories.
              </CommandEmpty>
            ) : isPending ? (
              <CommandEmpty>Loading...</CommandEmpty>
            ) : (
              <>
                <CommandEmpty>No categories found.</CommandEmpty>
                <CommandGroup>
                  {data?.categories.map((category) => (
                    <CommandItem
                      key={category.id}
                      onSelect={() => handleSelect(category.id)}
                    >
                      {category.name}
                    </CommandItem>
                  ))}
                  <CommandItem onSelect={() => handleSelect(null)}>
                    {placeholder}
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
