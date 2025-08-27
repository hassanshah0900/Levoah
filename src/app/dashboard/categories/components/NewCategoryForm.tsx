import SlugInput from "@/components/SlugInput";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import CategoriesCombobox from "./CategoriesCombobox";
import { Category } from "../lib/types";
import { toast } from "sonner";
import { createCategory } from "../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategorySchemaType } from "../lib/validation";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function NewCategoryForm() {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      parent_category: "",
    },
    resolver: zodResolver(categorySchema),
  });
  async function onSubmit(category: CategorySchemaType) {
    console.log(category);

    toast.promise(createCategory(category), {
      loading: "Creating new category...",
      success: "Success",
      error: ({ message }) => message,
    });
    setOpen(false);
  }
  return (
    <div>
      <Drawer direction="right" open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size={"sm"}>
            <Plus /> New
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Category</DrawerTitle>
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
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4">Create</Button>
            </Form>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
