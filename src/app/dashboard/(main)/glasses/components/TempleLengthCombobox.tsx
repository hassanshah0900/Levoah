import FormCombobox from "@/components/FormCombobox";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

const templeLengths = [120, 125, 130, 135, 140, 145, 150];

export default function TempleLengthCombobox({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  return (
    <FormCombobox
      placeholder="Select temple length"
      searchInputPlaceholder="Search temple length..."
      {...props}
      items={templeLengths.map((length) => ({
        label: length + " mm",
        value: length.toString(),
      }))}
    />
  );
}
