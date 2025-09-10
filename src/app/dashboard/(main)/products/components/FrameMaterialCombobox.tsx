import FormCombobox from "@/components/FormCombobox";
import React from "react";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

const frameMaterials = ["Acetate", "Metal", "Titanium", "Plastic", "Mixed"];
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
