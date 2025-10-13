"use client";

import BrandsCombobox from "@/components/BrandsCombobox";
import SlugInput from "@/components/SlugInput";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
import BridgeWidthCombobox from "./BridgeWidthCombobox";
import FrameMaterialCombobox from "./FrameMaterialCombobox";
import FrameShapeCombobox from "./FrameShapeCombobox";
import GenderSelect from "./GenderSelect";
import LenseWidthCombobox from "./LenseWidthCombobox";
import TempleLengthCombobox from "./TempleLengthCombobox";

export default function GlassesForm() {
  const [isPublished, setIsPublished] = useState(true);
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: createGlasses,
    onSuccess() {
      toast.success("Successfully created Product", { id: "new_product" });
      form.reset();
      router.replace("/dashboard/glasses");
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
      attributes: {
        bridgeWidth: "",
        lenseWidth: "",
        templeLength: "",
        modelCode: "",
      },
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
            name="brandId"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <BrandsCombobox {...field} {...fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="attributes.modelCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Code</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={(field.value as string).toUpperCase()}
                  />
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
          <FormField
            name={`attributes.gender`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <GenderSelect {...field} />
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
