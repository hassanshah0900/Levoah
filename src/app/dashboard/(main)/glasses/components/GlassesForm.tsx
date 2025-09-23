"use client";

import SlugInput from "@/components/SlugInput";
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
import CategorySelector from "../../categories/components/CategorySelector";
import { createGlasses } from "../lib/actions";
import { glassesFormSchema, GlassesFormSchemaType } from "../lib/validation";
import BridgeAndNosepadsSelect from "./BridgeAndNosepadsSelect";
import FrameMaterialCombobox from "./FrameMaterialCombobox";
import FrameShapeCombobox from "./FrameShapeCombobox";

export default function GlassesForm() {
  const [isPublished, setIsPublished] = useState(true);

  const { mutate } = useMutation({
    mutationFn: createGlasses,
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
      description: "",
      category: "",
    },
    resolver: zodResolver(glassesFormSchema),
  });

  function onSubmit(data: GlassesFormSchemaType) {
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
            name="attributes.frameShape"
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
            name="attributes.frameMaterial"
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
            name="attributes.bridgeAndNosepads"
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelector {...field} />
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
