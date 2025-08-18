"use client";

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
import ImageInput from "@/components/ImageInput";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { productFormSchema, ProductFormSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export default function ProductForm() {
  const [isDraft, setIsDraft] = useState(false);
  const form = useForm({
    defaultValues: {
      imageUrl: "",
      title: "",
      description: "",
      price: "",
      salePrice: "",
    },
    resolver: zodResolver(productFormSchema),
  });

  function onSubmit(product: ProductFormSchemaType) {
    console.log("Fields: ", { ...product, isDraft });
    setIsDraft(false);
  }
  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      <Form {...form}>
        <ImageInput />
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
          name="salePrice"
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
            onClick={() => setIsDraft(true)}
          >
            Save as Draft
          </Button>
        </div>
      </Form>
    </form>
  );
}
