import React from "react";
import { Select, SelectContent, SelectItem } from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props
  extends ControllerRenderProps,
    Pick<ControllerFieldState, "invalid"> {
  placeholder?: string;
  items: { label: string; value: string }[];
}
export default function FormSelect({
  onChange,
  invalid,
  placeholder,
  items,
  ...props
}: Props) {
  console.log(props.value);

  return (
    <Select {...props} onValueChange={onChange}>
      <SelectTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start",
            props.value || "font-normal text-muted-foreground",
            invalid && "border-destructive"
          )}
        >
          {items.find(({ value }) => value === String(props.value))?.label ||
            placeholder ||
            "Select an item"}
        </Button>
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
