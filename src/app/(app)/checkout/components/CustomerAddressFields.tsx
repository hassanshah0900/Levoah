import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SelectTrigger } from "@radix-ui/react-select";
import { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { provinces } from "../lib/data";

interface FormField {
  name: string;
  title: string;
  component: FC<{ field: ControllerRenderProps }>;
  isFullWidth?: boolean;
}

const formFields: FormField[] = [
  {
    name: "full_name",
    title: "Name",
    component: ({ field }) => <Input {...field} />,
  },
  {
    name: "country",
    title: "Country",
    component: ({ field }) => (
      <Select {...field} onValueChange={field.onChange} defaultValue="Pakistan">
        <SelectTrigger asChild>
          <Button variant={"outline"} className="justify-start">
            {field.value || "Select Country"}
          </Button>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Pakistan">Pakistan</SelectItem>
        </SelectContent>
      </Select>
    ),
  },
  {
    name: "province",
    title: "Province",
    component: ({ field }) => (
      <Select {...field} onValueChange={field.onChange}>
        <SelectTrigger asChild>
          <Button variant={"outline"} className="justify-start">
            {field.value || "Select Province"}
          </Button>
        </SelectTrigger>
        <SelectContent>
          {provinces.map((province) => (
            <SelectItem key={province} value={province}>
              {province}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    name: "city",
    title: "City",
    component: ({ field }) => <Input {...field} />,
  },
  {
    name: "phone",
    title: "Phone",
    component: ({ field }) => <Input {...field} type="tel" />,
  },
  {
    name: "address",
    title: "Address",
    component: ({ field }) => <Input {...field} />,
  },
  {
    name: "postal_code",
    title: "Postal Code",
    component: ({ field }) => <Input {...field} />,
  },
  {
    name: "email",
    title: "Email Address",
    component: ({ field }) => <Input {...field} />,
  },
  {
    name: "order_note",
    title: "Order note",
    component: ({ field }) => <Textarea {...field} />,
    isFullWidth: true,
  },
];

export default function CustomerAddressFields() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <h2 className="text-xl">2. Delivery Address</h2>
      {formFields.map((formField) => (
        <FormField
          key={formField.name}
          name={`shipping_address.${formField.name}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formField.title}</FormLabel>
              <FormControl>
                <formField.component field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
