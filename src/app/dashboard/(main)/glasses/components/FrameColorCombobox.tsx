import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const frameColors = [
  "black",
  "tortoise",
  "gold",
  "blue",
  "grey",
  "pink",
  "brown",
  "green",
  "red",
  "silver",
  "violet",
  "white",
  "clear",
  "orange",
  "yellow",
  "beige",
  "multicolor",
  "copper",
] as const;

export default function FrameColorCombobox({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormCombobox
      placeholder="Select frame color"
      searchInputPlaceholder="Search frame color..."
      {...props}
      items={frameColors.map((color) => ({ label: color, value: color }))}
    />
  );
}
