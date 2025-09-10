import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const frameMaterials = [
  "Acetate",
  "Metal",
  "Titanium",
  "Plastic",
  "Mixed",
] as const;
export default function FrameMaterialCombobox({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormCombobox
      placeholder="Select frame material"
      searchInputPlaceholder="Search frame material..."
      {...props}
      items={frameMaterials.map((material) => ({
        label: material,
        value: material,
      }))}
    />
  );
}
