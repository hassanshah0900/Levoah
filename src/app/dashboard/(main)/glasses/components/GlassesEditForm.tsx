"use client";

import BrandsCombobox from "@/components/BrandsCombobox";
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
import CategorySelector from "../../categories/components/CategorySelector";
import { editGlasses } from "../lib/actions";
import {
  glassesEditFormSchema,
  GlassesEditFormSchemaType,
} from "../lib/validation";
import BridgeAndNosepadsSelect from "./BridgeAndNosepadsSelect";
import BridgeWidthCombobox from "./BridgeWidthCombobox";
import FrameMaterialCombobox from "./FrameMaterialCombobox";
import FrameShapeCombobox from "./FrameShapeCombobox";
import LenseWidthCombobox from "./LenseWidthCombobox";
import TempleLengthCombobox from "./TempleLengthCombobox";

interface Props {
  glasses: Product<"glasses">;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
export default function GlassesEditForm({
  glasses,
  open,
  onOpenChange,
}: Props) {
  const form = useForm({
    defaultValues: {
      title: glasses.title,
      slug: glasses.slug,
      description: glasses.description ?? "",
      published: glasses.published,
      attributes: glasses.attributes,
      category: glasses.category?.id ?? "",
    },
    resolver: zodResolver(glassesEditFormSchema),
  });
  const router = useRouter();
  async function onSubmit(edittedGlasses: GlassesEditFormSchemaType) {
    toast.promise(editGlasses({ ...glasses, ...edittedGlasses }), {
      loading: "Editing glasses...",
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
            Edit Glasses{" "}
            <DrawerClose>
              <X className="text-xl" />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription>
            This is the glasses editing area
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
                      value={(field.value as string)?.toUpperCase()}
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
              Edit Glasses
            </Button>
          </Form>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
