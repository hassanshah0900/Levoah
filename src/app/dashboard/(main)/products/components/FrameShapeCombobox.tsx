import FormCombobox from "@/components/FormCombobox";
import React from "react";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

const frameShapes = [
  "Rectangle",
  "Round",
  "Square",
  "Cat-Eye",
  "Oval",
  "Aviator",
  "Browline",
];

export default function FrameShapeCombobox({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormCombobox
      placeholder="Select frame shape"
      searchInputPlaceholder="Search frame shape..."
      {...props}
      items={frameShapes.map((shape) => ({ label: shape, value: shape }))}
    />
  );
}
