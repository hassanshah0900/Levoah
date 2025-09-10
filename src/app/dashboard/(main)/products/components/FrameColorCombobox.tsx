import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const frameColors = [
  "Black",
  "Matte Black",
  "Shiny Black",
  "Brown",
  "Dark Brown",
  "Light Brown",
  "Tortoise",
  "Transparent",
  "Clear",
  "Gray",
  "Matte Gray",
  "Gunmetal",
  "Silver",
  "Gold",
  "Rose Gold",
  "Blue",
  "Navy Blue",
  "Matte Blue",
  "Green",
  "Olive",
  "Red",
  "Burgundy",
  "Pink",
  "Purple",
  "White",
  "Beige",
  "Champagne",
  "Bronze",
  "Copper",
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
