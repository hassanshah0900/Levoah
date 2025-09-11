import FormSelect from "@/components/FormSelect";
import { useQuery } from "@tanstack/react-query";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import { getCategoriesByProductType } from "../lib/queries";

export default function GlassesTypeSelect({
  ...props
}: ControllerRenderProps & Pick<ControllerFieldState, "invalid">) {
  const { data: categories } = useQuery({
    queryKey: ["categories", "glasses"],
    queryFn: () => getCategoriesByProductType("glasses", true),
  });

  const items = categories
    ? categories.map(({ name, id }) => ({
        label: name,
        value: String(id),
      }))
    : [{ label: "Loading...", value: "loading" }];
  return (
    <FormSelect items={items} {...props} placeholder="Select Glasses Type" />
  );
}
