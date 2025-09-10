import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

const lenseWidths = Array.from({ length: 22 }).map((_, idx) => 40 + idx);

export default function LenseWidthCombobox({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormCombobox
      placeholder="Select lense width"
      searchInputPlaceholder="Search lense width..."
      {...props}
      items={lenseWidths.map((width) => ({
        label: width + " mm",
        value: width.toString(),
      }))}
    />
  );
}
