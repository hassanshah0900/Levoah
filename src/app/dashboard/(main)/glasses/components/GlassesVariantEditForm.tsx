import ImageInput from "@/components/ImageInput";
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
import { compressImage, getImagePublicUrl } from "@/lib/utils";
import { ProductVariant } from "@/types/products.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { editGlassesVariant } from "../lib/actions";
import {
  glassesVariantEditSchema,
  GlassesVariantEditSchemaType,
} from "../lib/validation";
import FrameColorCombobox from "./FrameColorCombobox";
import LenseColorCombobox from "./LenseColorCombobox";
import LenseTypeSelect from "./LenseTypeSelect";

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  productVariant: ProductVariant<"glasses">;
}

export default function GlassesVariantEditForm({
  open,
  onOpenChange,
  productVariant,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editGlassesVariant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["product_variants", productVariant.productId],
      });
      toast.success("Success", { id: "edit_variant" });
    },
    onError(err) {
      toast.error(err.message, { id: "edit_variant" });
    },
  });
  console.log(productVariant);

  const form = useForm({
    defaultValues: { ...productVariant },
    resolver: zodResolver(glassesVariantEditSchema),
  });

  async function onSubmit(data: GlassesVariantEditSchemaType) {
    let image = data.image;
    if (image) image = await compressImage(image);
    const editedProductVariant = {
      ...productVariant,
      ...data,
      image,
    };

    mutate(editedProductVariant);
    toast.loading("Editing Variant...", { id: "edit_variant" });
    onOpenChange?.(false);
    console.log(editedProductVariant);
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="overflow-hidden overflow-y-auto max-h-screen">
        <DrawerHeader>
          <DrawerTitle>Edit Variant</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form
            action=""
            className="space-y-5 p-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name={`image`}
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormControl>
                    <ImageInput
                      onChange={onChange}
                      imgUrl={
                        productVariant.imageUrl &&
                        getImagePublicUrl(productVariant.imageUrl)
                      }
                      shouldReset={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`quantityInStock`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity In Stock</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`attributes.lenseColor`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Lense Color</FormLabel>
                  <FormControl>
                    <LenseColorCombobox {...field} {...fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`attributes.frameColorDisplay`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Lense Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`attributes.frameColor`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Frame Color</FormLabel>
                  <FormControl>
                    <FrameColorCombobox {...field} {...fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`attributes.lenseColorDisplay`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Frame Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`attributes.lenseType`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lense type</FormLabel>
                  <FormControl>
                    <LenseTypeSelect {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Edit Variant</Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
