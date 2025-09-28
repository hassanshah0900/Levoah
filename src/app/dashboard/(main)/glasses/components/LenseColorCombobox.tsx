import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const lenseColors = [
  "grey",
  "green",
  "brown",
  "blue",
  "black",
  "violet",
  "pink",
  "silver",
  "clear",
  "orange",
  "gold",
  "red",
  "yellow",
] as const;

export default function LenseColorCombobox({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormCombobox
      placeholder="Select lense color"
      searchInputPlaceholder="Search lense color..."
      {...props}
      items={lenseColors.map((color) => ({ label: color, value: color }))}
    />
  );
}
