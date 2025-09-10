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
import { compressImage } from "@/lib/utils";
import { Brand } from "../lib/types";
import { editBrand } from "../lib/actions";
import { brandSchema, BrandSchemaType } from "../lib/validation";

interface Props {
  brand: Brand;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function EditBrandForm({ brand, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editBrand,
    onSuccess(data, variables) {
      queryClient.invalidateQueries({
        queryKey: ["brands"],
      });
      toast.success(`Successfully edited brand ${variables.name}`, {
        id: "edit_brand",
      });
    },
    onError(error) {
      toast.error(error.message, { id: "edit_brand" });
    },
  });

  const form = useForm({
    defaultValues: {
      name: brand.name,
      slug: brand.slug,
    },
    resolver: zodResolver(brandSchema),
  });

  async function onSubmit(data: BrandSchemaType) {
    let image = data.image;

    if (image) {
      image = await compressImage(image);
    }

    mutate({ ...brand, ...data, image });
    toast.loading("Editing brand...", { id: "edit_brand" });
    onOpenChange(false);
  }

  return (
    <div>
      <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-screen overflow-y-auto overflow-x-hidden">
          <DrawerHeader>
            <DrawerTitle>Edit Brand</DrawerTitle>
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
                        imgUrl={brand.logo && getImagePublicUrl(brand.logo)}
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
              <Button className="w-full mt-4">Edit</Button>
            </Form>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
