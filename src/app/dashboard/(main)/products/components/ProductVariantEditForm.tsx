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
import { ProductVariant } from "@/types/products.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getProductImageUrl, parseProductAttribute } from "../lib/utils";
import {
  productVariantEditSchema,
  ProductVariantEditSchemaType,
} from "../lib/validation";
import { editProductVariant } from "../lib/actions";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { compressImage } from "@/lib/utils";

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  productVariant: ProductVariant<"glasses">;
}

export default function ProductVariantEditForm({
  open,
  onOpenChange,
  productVariant,
}: Props) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: editProductVariant,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["product_variants", productVariant.product_id],
      });
      toast.success("Success", { id: "edit_variant" });
    },
    onError(err) {
      toast.error(err.message, { id: "edit_variant" });
    },
  });

  const form = useForm({
    defaultValues: {
      price: productVariant.price,
      quantity_in_stock: productVariant.quantity_in_stock,
      frame_color: parseProductAttribute(productVariant.attributes.frame_color)
        .value,
      lense_color: parseProductAttribute(productVariant.attributes.lense_color)
        .value,
    },
    resolver: zodResolver(productVariantEditSchema),
  });

  async function onSubmit(data: ProductVariantEditSchemaType) {
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
                      imgUrl={getProductImageUrl(productVariant.image_url)}
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
              name={`quantity_in_stock`}
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
              name={`frame_color`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frame Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`lense_color`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lense Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Submit</Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
