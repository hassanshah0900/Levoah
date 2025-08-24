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
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

export default function NewCategoryForm() {
  const form = useForm();
  return (
    <div>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button size={"sm"}>
            <Plus /> New
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Category</DrawerTitle>
          </DrawerHeader>

          <form action="" className="p-4 space-y-4">
            <Form {...form}>
              <FormField
                name="Name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4">Create</Button>
            </Form>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
