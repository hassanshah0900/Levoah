import FormSelect from "@/components/FormSelect";
import { ControllerRenderProps, useFormContext } from "react-hook-form";

export const genders = ["men", "women", "children", "unisex"] as const;
export default function GenderSelect(props: ControllerRenderProps) {
  const {
    formState: { errors },
  } = useFormContext();
  const invalid = !!errors[props.name];
  return (
    <FormSelect
      {...props}
      invalid={invalid}
      placeholder="Select a gender"
      items={genders.map((g) => ({ label: g, value: g }))}
    />
  );
}
