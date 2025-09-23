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
  glassesVariantSchema,
  GlassesVariantSchemaType,
} from "../lib/validation";
import { toast } from "sonner";
import { createGlassesVariant } from "../lib/actions";
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
    mutationFn: createGlassesVariant,
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
      quantityInStock: "",
      attributes: {
        lenseColor: "",
        frameColor: "",
        lenseWidth: "",
        bridgeWidth: "",
        templeLength: "",
      },
    },
    resolver: zodResolver(glassesVariantSchema),
  });

  async function onSubmit(data: GlassesVariantSchemaType) {
    const image = await compressImage(data.image);
    if (!image) return;

    const productVariant = { ...data, productId: productId, image };
    mutate(productVariant);
    toast.loading("Creating variant...", { id: "new_variant" });
    setIsOpen(false);
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
              name={`attributes.lenseWidth`}
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
              name={`attributes.bridgeWidth`}
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
              name={`attributes.templeLength`}
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
            <Button className="w-full">Create Variant</Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
