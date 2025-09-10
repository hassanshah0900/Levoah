"use client";

import SlugInput from "@/components/SlugInput";
import { ThemeToggler } from "@/components/ThemeToggler";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
} from "../../../../../components/ui/form";
import { Input } from "../../../../../components/ui/input";
import CategoriesCombobox from "../../categories/components/CategoriesCombobox";
import { createProduct } from "../lib/actions";
import { productFormSchema, ProductFormSchemaType } from "../lib/validation";
import FrameMaterialCombobox from "./FrameMaterialCombobox";
import FrameShapeCombobox from "./FrameShapeCombobox";
import BridgeAndNosepadsSelect from "./BridgeAndNosepadsSelect";

export default function GlassesForm() {
  const [isPublished, setIsPublished] = useState(true);

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess() {
      toast.success("Successfully created Product", { id: "new_product" });
      form.reset();
    },
    onError(error) {
      toast.error(error.message, { id: "new_product" });
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      category_id: "",
      description: "",
    },
    resolver: zodResolver(productFormSchema),
  });

  function onSubmit(data: ProductFormSchemaType) {
    const product = { ...data, published: isPublished };
    mutate(product);
    toast.loading("Creating product...", { id: "new_product" });
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
                <FormLabel>Frame Material</FormLabel>
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
        </Form>
      </div>
    </form>
  );
}
