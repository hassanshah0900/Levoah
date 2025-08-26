"use client";

import SlugInput from "@/components/SlugInput";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
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
import CategoriesCombobox from "../../categories/components/CategoriesCombobox";
import { createProduct } from "../lib/actions";
import { productFormSchema, ProductFormSchemaType } from "../lib/validation";

export default function ProductForm() {
  const [isPublished, setIsPublished] = useState(true);

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      category: undefined,
      description: "",
    },
    resolver: zodResolver(productFormSchema),
  });

  function onSubmit(data: ProductFormSchemaType) {
    const product = { ...data, published: isPublished };
    toast.promise(createProduct(product), {
      loading: "Creating product...",
      success: "Successfully created Product",
      error: ({ message }) => message,
    });
  }

  return (
    <form className="mb-10" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="sticky top-0 mb-10 z-10">
        <div className="flex justify-between items-center bg-background p-1.5">
          <div className="space-x-4">
            <SidebarTrigger />
            <ThemeToggler />
          </div>
          <div className="space-x-4">
            <Button
              type="submit"
              variant={"secondary"}
              onClick={() => setIsPublished(false)}
            >
              Save as Draft
            </Button>
            <Button type="submit">Publish</Button>
          </div>
        </div>
        <Separator />
      </div>
      <div className="space-y-4">
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
                  <SlugInput {...field} slugSourceFieldName={"title"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategoriesCombobox {...field} />
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
        </Form>
      </div>
    </form>
  );
}
