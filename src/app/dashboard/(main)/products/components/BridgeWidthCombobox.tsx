import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

const bridgeWidths = Array.from({ length: 11 }).map((_, idx) => 14 + idx);

export default function BridgeWidthCombobox({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormCombobox
      placeholder="Select bridge width"
      searchInputPlaceholder="Search bridge width..."
      {...props}
      items={bridgeWidths.map((width) => ({
        label: width + " mm",
        value: width.toString(),
      }))}
    />
  );
}
