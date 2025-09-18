import ImageInput from "@/components/ImageInput";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { getImagePublicUrl } from "@/lib/utils";
import { editCategory } from "../lib/actions";
import { Category } from "../lib/types";
import { categorySchema, CategorySchemaType } from "../lib/validation";
import CategoriesCombobox from "./CategoriesCombobox";
import { compressImage } from "@/lib/utils";

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
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editCategory,
    onSuccess(data, variables) {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
      toast.success(`Successfully edited category ${variables.name}`, {
        id: "edit_category",
      });
    },
    onError(error) {
      toast.error(error.message, { id: "edit_category" });
    },
  });

  const form = useForm({
    defaultValues: {
      name: category.name,
      slug: category.slug,
      description: category.description,
    },
    resolver: zodResolver(categorySchema),
  });

  async function onSubmit(data: CategorySchemaType) {
    let image = data.image;

    if (image) {
      image = await compressImage(image);
    }

    mutate({ ...category, ...categorySchema, image });
    toast.loading("Editing category...", { id: "edit_category" });
    onOpenChange(false);
  }

  return (
    <div>
      <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-screen overflow-y-auto overflow-x-hidden">
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
                name={`image`}
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormControl>
                      <ImageInput
                        onChange={onChange}
                        shouldReset={false}
                        imgUrl={
                          category.image_url &&
                          getImagePublicUrl(category.image_url)
                        }
                      />
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
              {/* <FormField
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
              /> */}
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
              <Button className="w-full mt-4">Edit</Button>
            </Form>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
