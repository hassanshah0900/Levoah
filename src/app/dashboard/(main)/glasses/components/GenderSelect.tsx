import FormSelect from "@/components/FormSelect";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const genders = ["men", "women", "children", "unisex"] as const;
export default function GenderSelect(
  props: ControllerRenderProps & ControllerFieldState
) {
  return (
    <FormSelect
      {...props}
      placeholder="Select a gender"
      items={genders.map((g) => ({ label: g, value: g }))}
    />
  );
}
