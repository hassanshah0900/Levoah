import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const frameShapes = [
  "Rectangle",
  "Round",
  "Square",
  "Cat-Eye",
  "Oval",
  "Aviator",
  "Browline",
] as const;

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
