import FormSelect from "@/components/FormSelect";

import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export const bridgeAndNosepads = [
  "High Bridge Fit",
  "Low Bridge Fit",
  "Adjustable Nosepads",
] as const;
export default function BridgeAndNosepadsSelect({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormSelect
      items={bridgeAndNosepads.map((item) => ({ label: item, value: item }))}
      placeholder="Select Bridge & Nosepads"
      {...props}
    />
  );
}
