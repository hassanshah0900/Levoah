import { cn } from "@/lib/utils";
import { SelectTrigger } from "@radix-ui/react-select";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem } from "./ui/select";

const productTypes = [
  { label: "Glasses", value: "glasses" },
  { label: "Accessories", value: "accessories" },
  { label: "Lenses", value: "lenses" },
];

export default function ProductTypeSelect({
  invalid,
  onChange,
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <Select {...props} onValueChange={onChange}>
      <SelectTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(invalid && "border-destructive")}
        >
          {productTypes.find(({ value }) => value === props.value)?.label ||
            "Select Product Type"}
        </Button>
      </SelectTrigger>
      <SelectContent>
        {productTypes.map((productType) => (
          <SelectItem key={productType.value} value={productType.value}>
            {productType.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
