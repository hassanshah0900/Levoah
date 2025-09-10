import ImageInput from "@/components/ImageInput";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createCategory } from "../lib/actions";
import { categorySchema, CategorySchemaType } from "../lib/validation";
import CategoriesCombobox from "./CategoriesCombobox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { compressImage } from "@/lib/utils";

export default function NewCategoryForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      parent_category: null,
      description: "",
    },
    resolver: zodResolver(categorySchema),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createCategory,
    onSuccess() {
      toast.success("New category successfully created.", {
        id: "new_category",
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      form.reset();
    },
    onError(error) {
      toast.error(error.message, { id: "new_category" });
    },
  });

  const [open, setOpen] = useState(false);

  async function onSubmit(category: CategorySchemaType) {
    let image = category.image;
    if (image) {
      image = await compressImage(image);
    }
    mutate({ ...category, image });
    toast.loading("Creating new category...", { id: "new_category" });
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
        <DrawerContent className="h-screen overflow-y-auto overflow-x-hidden">
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
                name={`image`}
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInput onChange={onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
