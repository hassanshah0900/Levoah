import SlugInput from "@/components/SlugInput";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Category } from "../lib/types";
import CategoriesCombobox from "./CategoriesCombobox";
import { categorySchema, CategorySchemaType } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function EditCategoryForm({
  category,
  open,
  onOpenChange,
}: Props) {
  const form = useForm<CategorySchemaType>({
    defaultValues: {
      ...category,
      parent_category: category.parent_category || "",
    },
    resolver: zodResolver(categorySchema),
  });

  return (
    <div>
      <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Category</DrawerTitle>
          </DrawerHeader>

          <form action="" className="p-4 space-y-4">
            <Form {...form}>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <SlugInput {...field} slugSourceFieldName="name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="parent_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Category</FormLabel>
                    <FormControl>
                      <CategoriesCombobox {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4">Edit</Button>
            </Form>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
