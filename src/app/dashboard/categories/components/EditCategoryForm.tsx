import SlugInput from "@/components/SlugInput";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Category } from "../lib/types";

interface Props {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function EditCategoryForm({
  category,
  open,
  onOpenChange,
}: Props) {
  const form = useForm();
  return (
    <div>
      <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit Category</DrawerTitle>
          </DrawerHeader>

          <form action="" className="p-4 space-y-4">
            <Form {...form}>
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <SlugInput {...field} slugSourceFieldName="name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4">Edit</Button>
            </Form>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
