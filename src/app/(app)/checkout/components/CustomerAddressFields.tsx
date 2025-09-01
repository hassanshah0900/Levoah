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
import { SelectTrigger } from "@radix-ui/react-select";
import { ControllerRenderProps } from "react-hook-form";
import { provinces } from "../lib/data";

interface ComponentFunctionProps {
  field: ControllerRenderProps;
}

interface FormField {
  name: string;
  title: string;
  component: Function;
  colspan?: number;
}

const formFields: FormField[] = [
  {
    name: "full_name",
    title: "Name",
    component: ({ field }: ComponentFunctionProps) => <Input {...field} />,
  },
  {
    name: "country",
    title: "Country",
    component: ({ field }: ComponentFunctionProps) => (
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
    component: ({ field }: ComponentFunctionProps) => (
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
    component: ({ field }: ComponentFunctionProps) => (
      <Input {...field} required />
    ),
  },
  {
    name: "phone",
    title: "Phone",
    component: ({ field }: ComponentFunctionProps) => (
      <Input {...field} type="tel" />
    ),
  },
  {
    name: "address",
    title: "Address",
    component: ({ field }: ComponentFunctionProps) => <Input {...field} />,
  },
  {
    name: "postal_code",
    title: "Postal Code",
    component: ({ field }: ComponentFunctionProps) => <Input {...field} />,
  },
  {
    name: "email",
    title: "Email Address",
    component: ({ field }: ComponentFunctionProps) => <Input {...field} />,
  },
];

export default function CustomerAddressFields() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {formFields.map((formField) => (
        <FormField
          key={formField.name}
          name={`shipping_address.${formField.name}`}
          render={({ field }) => (
            <FormItem
              className={`${
                formField.colspan && `col-span-${formField.colspan}`
              }`}
            >
              <FormLabel>{formField.title}</FormLabel>
              <FormControl>{formField.component({ field })}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
