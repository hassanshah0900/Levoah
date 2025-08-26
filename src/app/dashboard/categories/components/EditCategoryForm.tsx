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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Category } from "../lib/types";
import CategoriesCombobox from "./CategoriesCombobox";
import { categorySchema, CategorySchemaType } from "../lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { editCategory } from "../lib/actions";

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
      name: category.name,
      slug: category.slug,
      parent_category: category.parent_category,
    },
    resolver: zodResolver(categorySchema),
  });

  function onSubmit(editedCategory: CategorySchemaType) {
    toast.promise(editCategory({ ...editedCategory, id: category.id }), {
      loading: "Editing category...",
      success: "Success",
      error: ({ message }) => message,
    });
    onOpenChange(false);
  }

  return (
    <div>
      <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Category</DrawerTitle>
          </DrawerHeader>

          <form
            action=""
            className="p-4 space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Form {...form}>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
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
                    <FormMessage />
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
                    <FormMessage />
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
