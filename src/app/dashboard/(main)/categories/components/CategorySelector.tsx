"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { categories } from "@/db/drizzle/schema";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { ComponentProps, MouseEvent, useState } from "react";
import { ControllerRenderProps, useFormContext } from "react-hook-form";
import { getAllCategories } from "../lib/queries";

type Category = typeof categories.$inferSelect;

export default function CategorySelector({
  value,
  name,
  onChange,
  ref,
  selectValueType = "id",
}: ControllerRenderProps & { selectValueType?: "id" | "path" }) {
  const [open, setOpen] = useState(false);
  const { data: categories, status } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    () => getSelectedCategory()
  );

  const [openedCategory, setOpenedCategory] = useState<Category | null>(null);

  const categoriesToShow =
    categories?.filter((c) =>
      openedCategory
        ? c.parentCategory === openedCategory.id
        : !c.parentCategory
    ) ?? [];

  const {
    formState: { errors },
  } = useFormContext();
  const invalid = !!errors[name];

  function hideSubcategories() {
    if (!openedCategory || !categories) return;
    const parentCategory = categories.find(
      (c) => c.id === openedCategory.parentCategory
    );
    setOpenedCategory(parentCategory ?? null);
  }
  function hasSubcategories(category: Category) {
    if (!categories) return false;
    return categories.some((c) => c.parentCategory === category.id);
  }
  function handleCategorySelect(e: MouseEvent, category: Category) {
    e.stopPropagation();
    setSelectedCategory(category);
    switch (selectValueType) {
      case "id":
        onChange(category.id);
        break;
      case "path":
        onChange(category.path);
        break;
    }
    setOpen(false);
  }
  function getSelectedCategory() {
    if (!categories || !value) return null;
    categories.find((c) => {
      switch (selectValueType) {
        case "id":
          return c.id === value;
        case "path":
          return c.path === value;
      }
    });

    return categories.find((c) => c.id === value) ?? null;
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start",
              invalid && "border-destructive"
            )}
            ref={ref}
          >
            {selectedCategory ? selectedCategory.name : "Select Category"}
          </Button>
        }
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-sm" align="start">
        <div className="flex flex-col space-y-1 p-2">
          {status === "pending" ? (
            <CategoriesSkeleton />
          ) : status === "error" ? (
            <div className="text-sm">
              Sorry, couldn't fetch categories. Try reloading the page
            </div>
          ) : (
            <>
              {openedCategory && (
                <Button
                  key={openedCategory.id}
                  variant={"ghost"}
                  onClick={hideSubcategories}
                  className="justify-start
                "
                >
                  <ArrowLeft /> {openedCategory.name}
                </Button>
              )}
              {categoriesToShow.map((c) =>
                hasSubcategories(c) ? (
                  <div
                    key={c.id}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "hover:bg-accent/50 ps-0 justify-between"
                    )}
                    onClick={() => setOpenedCategory(c)}
                  >
                    <CategoryButton onClick={(e) => handleCategorySelect(e, c)}>
                      {c.name}
                    </CategoryButton>
                    <ChevronRight />
                  </div>
                ) : (
                  <CategoryButton
                    key={c.id}
                    onClick={(e) => handleCategorySelect(e, c)}
                  >
                    {c.name}
                  </CategoryButton>
                )
              )}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CategoryButton({
  ...props
}: Omit<ComponentProps<typeof Button>, "variant">) {
  return (
    <Button
      {...props}
      variant={"ghost"}
      className={cn("justify-between", props.className)}
    ></Button>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="space-y-2 p-2">
      <Skeleton className="h-6 w-full rounded-md" />
      <Skeleton className="h-6 w-full rounded-md" />
      <Skeleton className="h-6 w-full rounded-md" />
    </div>
  );
}
