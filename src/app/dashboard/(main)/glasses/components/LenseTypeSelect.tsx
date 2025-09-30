import FormSelect from "@/components/FormSelect";
import { ControllerRenderProps } from "react-hook-form";

const items = [
  { label: "Polarized", value: "polarized" },
  { label: "Transition", value: "transition" },
  { label: "Normal", value: "normal" },
];
export default function LenseTypeSelect({ ...props }: ControllerRenderProps) {
  return (
    <FormSelect
      items={items}
      {...props}
      invalid={false}
      placeholder="Select lens type"
    />
  );
}
