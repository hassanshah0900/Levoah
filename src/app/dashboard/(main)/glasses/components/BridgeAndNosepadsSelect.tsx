import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectTrigger } from "@radix-ui/react-select";

import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const bridgeAndNosepads = [
  "High Bridge Fit",
  "Low Bridge Fit",
  "Adjustable Nosepads",
] as const;
export default function BridgeAndNosepadsSelect({
  onChange,
  invalid,
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <Select onValueChange={onChange} {...props}>
      <SelectTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(invalid && "border-destructive")}
        >
          {props.value || "Select Bridge & Nosepads"}
        </Button>
      </SelectTrigger>
      <SelectContent>
        {bridgeAndNosepads.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
