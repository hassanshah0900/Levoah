import ImageInput from "@/components/ImageInput";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  productVariantSchema,
  ProductVariantSchemaType,
} from "../lib/validation";
import { toast } from "sonner";
import { addProductVariant } from "../lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { compressImage } from "@/lib/utils";
import BridgeWidthCombobox from "./BridgeWidthCombobox";
import LenseWidthCombobox from "./LenseWidthCombobox";
import TempleLengthCombobox from "./TempleLengthCombobox";
import LenseColorCombobox from "./LenseColorCombobox";
import FrameColorCombobox from "./FrameColorCombobox";

interface Props {
  productId: number;
}

export default function GlassesVariantForm({ productId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: addProductVariant,
    onSuccess() {
      toast.success("Success", { id: "new_variant" });
      queryClient.invalidateQueries({
        queryKey: ["product_variants", productId],
      });
      form.reset();
    },
    onError(error) {
      toast.error(error.message, { id: "new_variant" });
    },
  });

  const form = useForm({
    defaultValues: {
      price: "",
      quantity_in_stock: "",
      frame_color: "",
      lense_color: "",
      lense_width: "",
      bridge_width: "",
      temple_length: "",
    },
    resolver: zodResolver(productVariantSchema),
  });

  async function onSubmit(data: ProductVariantSchemaType) {
    const image = await compressImage(data.image);
    if (!image) return;

    const productVariant = { ...data, product_id: productId, image };
    mutate(productVariant);
    toast.loading("Creating variant...", { id: "new_variant" });
    setIsOpen(false);
    console.log(data);
  }

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button size={"sm"}>
          <Plus /> New{" "}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="overflow-hidden overflow-y-auto max-h-screen">
        <DrawerHeader>
          <DrawerTitle>Create Variant</DrawerTitle>
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
                    <ImageInput onChange={onChange} />
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
              name={`lense_color`}
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
              name={`frame_color`}
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
              name={`lense_width`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Lense Width</FormLabel>
                  <FormControl>
                    <LenseWidthCombobox {...field} {...fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`bridge_width`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Bridge Width</FormLabel>
                  <FormControl>
                    <BridgeWidthCombobox {...field} {...fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`temple_length`}
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Temple Length</FormLabel>
                  <FormControl>
                    <TempleLengthCombobox {...field} {...fieldState} />
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
