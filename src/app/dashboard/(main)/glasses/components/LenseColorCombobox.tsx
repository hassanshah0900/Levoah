import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const lenseColors = [
  "Clear",
  "Gray",
  "Brown",
  "Green",
  "Blue",
  "Amber",
  "Yellow",
  "Pink",
  "Purple",
  "Gradient Gray",
  "Gradient Brown",
  "Gradient Green",
  "Gradient Blue",
  "Mirror Silver",
  "Mirror Gold",
  "Mirror Blue",
  "Mirror Green",
  "Polarized Gray",
  "Polarized Brown",
  "Photochromic",
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
