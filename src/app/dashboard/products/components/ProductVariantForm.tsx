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
  productVariantSchema,
  ProductVariantSchemaType,
} from "../lib/validation";
import { toast } from "sonner";
import { addProductVariant } from "../lib/actions";

interface Props {
  product_id: number;
}

export default function ProductVariantForm({ product_id }: Props) {
  const form = useForm({
    defaultValues: {
      price: "",
      quantity_in_stock: "",
      frame_color: "",
      lense_color: "",
    },
    resolver: zodResolver(productVariantSchema),
  });

  function onSubmit(data: ProductVariantSchemaType) {
    const productVariant = { ...data, product_id, image_url: "" };
    toast.promise(addProductVariant(productVariant), {
      loading: "Creating variant...",
      success: "Sucess",
      error: ({ message }) => message,
    });
    console.log(data);
  }

  return (
    <Drawer direction="right">
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
              name={`quantity_in_stock`}
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
              name={`frame_color`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frame Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={`lense_color`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lense Color</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Submit</Button>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
}
