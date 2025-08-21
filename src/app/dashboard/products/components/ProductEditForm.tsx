"use client";

import ImageInput from "@/components/ImageInput";
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
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Product } from "../lib/types";
import {
  productEditFormSchema,
  ProductEditFormSchemaType,
  ProductFormSchemaType,
} from "../lib/validation";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProductImageUrl } from "../lib/utils";

interface Props {
  product: Product;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export default function ProductEditForm({
  product,
  open,
  onOpenChange,
}: Props) {
  const form = useForm({
    defaultValues: {
      title: product.title,
      description: product.description ?? "",
      price: product.price,
      sale_price: product.sale_price || "",
      published: product.published,
    },
    resolver: zodResolver(productEditFormSchema),
  });

  async function onSubmit(product: ProductEditFormSchemaType) {
    console.log(product);
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageInput
                      onChange={field.onChange}
                      imgUrl={getProductImageUrl(product.image_url)}
                      shouldReset={false}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              name="price"
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
              name="sale_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
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
