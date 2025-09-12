import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { use, useEffect, useState } from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { getChildCategories } from "../lib/queries";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useFormState } from "react-hook-form";
interface Props
  extends ControllerRenderProps,
    Pick<ControllerFieldState, "invalid"> {
  value: number[];
}

export default function CategoriesMultiselect({
  value,
  onChange,
  invalid,
}: Props) {
  const { isDirty } = useFormState({ name: "type" });
  const parentCategoryId = useWatch({
    name: "type",
  });

  const { data: categories, isPending } = useQuery({
    queryKey: ["categories", "children", parentCategoryId],
    queryFn: () => getChildCategories(parentCategoryId),
    enabled: !!parentCategoryId,
  });

  const [selectedIds, setSelectedIds] = useState<number[]>(value ?? []);

  const filteredCategories =
    categories?.filter((category) => !selectedIds.includes(category.id)) ?? [];

  function removeItem(value: number) {
    setSelectedIds(selectedIds.filter((v) => v !== value));
  }

  function getButtonText() {
    return selectedIds.length ? (
      <div className="flex flex-wrap gap-2">
        {selectedIds.map((id) => (
          <Badge
            variant={"secondary"}
            key={id}
            className="gap-2 text-base flex justify-center items-center flex-nowrap"
          >
            <button
              className="cursor-pointer"
              aria-label="remove item"
              onClick={(e) => {
                e.stopPropagation();
                removeItem(id);
              }}
            >
              <X />
            </button>
            {categories?.find((category) => category.id === id)?.name}
          </Badge>
        ))}
      </div>
    ) : (
      "Select Categories"
    );
  }

  function handleItemSelect(selectedId: number) {
    setSelectedIds([...selectedIds, selectedId]);
  }

  useEffect(() => {
    onChange(selectedIds);
  }, [selectedIds]);

  useEffect(() => {
    isDirty && setSelectedIds([]);
  }, [parentCategoryId]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            buttonVariants({ variant: "outline" }),
            "justify-start",
            selectedIds.length || "text-muted-foreground font-normal",
            invalid && "border-destructive"
          )}
        >
          {getButtonText()}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-2" align="start">
        <Command>
          <CommandInput placeholder={"Search categories..."} />
          <CommandList>
            <CommandEmpty>No categories found</CommandEmpty>
            <CommandGroup>
              {parentCategoryId ? (
                isPending ? (
                  <CommandItem>Loading...</CommandItem>
                ) : (
                  filteredCategories?.map((category) => (
                    <CommandItem
                      key={category.id}
                      onSelect={() => handleItemSelect(category.id)}
                    >
                      {category.name}
                    </CommandItem>
                  ))
                )
              ) : (
                <CommandItem>First Select a Type</CommandItem>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
