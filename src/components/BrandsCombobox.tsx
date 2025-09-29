import { getAllBrands } from "@/app/dashboard/(main)/brands/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import FormCombobox from "./FormCombobox";

export default function BrandsCombobox(
  props: ControllerRenderProps & ControllerFieldState
) {
  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });

  const items = brands
    ? brands.map((brand) => ({ label: brand.name, value: String(brand.id) }))
    : [{ label: "Loading...", value: "" }];
  return (
    <FormCombobox
      items={items}
      {...props}
      placeholder="Select a brand"
      searchInputPlaceholder="Search brands..."
    />
  );
}
