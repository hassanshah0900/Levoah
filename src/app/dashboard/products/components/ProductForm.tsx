"use client";

import ImageInput from "@/components/ImageInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { createProduct } from "../lib/actions";
import { productFormSchema, ProductFormSchemaType } from "../lib/validation";

export default function ProductForm() {
  const [isPublished, setIsPublished] = useState(true);
  const form = useForm({
    defaultValues: {
      image: undefined,
      title: "",
      description: "",
      price: "",
      sale_price: "",
    },
    resolver: zodResolver(productFormSchema),
  });

  async function onSubmit(product: ProductFormSchemaType) {
    toast.promise(createProduct(product, isPublished), {
      loading: "Creating Product...",
      success: "Successfully created product",
      error: (err) => err.message,
    });
    form.reset();

    setIsPublished(true);
  }
  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <FormField
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImageInput onChange={field.onChange} />
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
        <div className="flex gap-4">
          <Button type="submit">Publish</Button>
          <Button
            type="submit"
            variant={"secondary"}
            onClick={() => setIsPublished(false)}
          >
            Save as Draft
          </Button>
        </div>
      </Form>
    </form>
  );
}
