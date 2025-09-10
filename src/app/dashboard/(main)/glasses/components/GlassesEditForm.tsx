"use client";

import SlugInput from "@/components/SlugInput";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/products.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import CategoriesCombobox from "../../categories/components/CategoriesCombobox";
import { editProduct } from "../lib/actions";
import {
  productEditFormSchema,
  ProductEditFormSchemaType,
} from "../lib/validation";
import FrameMaterialCombobox from "./FrameMaterialCombobox";
import FrameShapeCombobox from "./FrameShapeCombobox";
import BridgeAndNosepadsSelect from "./BridgeAndNosepadsSelect";

interface Props {
  product: Product<"glasses">;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export default function GlassesEditForm({
  product,
  open,
  onOpenChange,
}: Props) {
  const form = useForm({
    defaultValues: {
      title: product.title,
      slug: product.slug,
      description: product.description ?? "",
      published: product.published,
      category_id: product.category.id,
      bridge_and_nosepads: product.bridge_and_nosepads,
      frame_material: product.frame_material,
      frame_shape: product.frame_shape,
    },
    resolver: zodResolver(productEditFormSchema),
  });

  const router = useRouter();

  async function onSubmit(edittedProduct: ProductEditFormSchemaType) {
    toast.promise(editProduct({ ...product, ...edittedProduct }), {
      loading: "Editing product...",
      success: () => {
        router.refresh();
        return "Successfully edited.";
      },
      error: ({ message }) => <div>{message}</div>,
    });
    onOpenChange?.(false);
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right" modal>
      <DrawerContent className="max-h-screen overflow-y-auto overflow-x-hidden">
        <DrawerHeader>
          <DrawerTitle className="flex justify-between items-center">
            Edit Product{" "}
            <DrawerClose>
              <X className="text-xl" />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>
            This is the product editing area
          </DrawerDescription>
        </DrawerHeader>
        <form
          className="space-y-5 p-4 pb-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Form {...form}>
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                    <SlugInput {...field} slugSourceFieldName="title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <CategoriesCombobox {...field} placeholder="No Category" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="frame_shape"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Frame Shape</FormLabel>
                  <FormControl>
                    <FrameShapeCombobox {...field} {...fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="frame_material"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Frame Material</FormLabel>
                  <FormControl>
                    <FrameMaterialCombobox {...field} {...fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="bridge_and_nosepads"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Bridge & Nosepads</FormLabel>
                  <FormControl>
                    <BridgeAndNosepadsSelect {...field} {...fieldState} />
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

            <Button type="submit" className="w-full">
              Edit
            </Button>
          </Form>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
