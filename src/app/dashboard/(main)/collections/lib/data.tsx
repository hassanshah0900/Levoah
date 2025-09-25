import DateInput from "@/components/DateInput";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";
import CategorySelector from "../../categories/components/CategorySelector";
import FrameShapeCombobox from "../../glasses/components/FrameShapeCombobox";

export const filters: FilterItem[] = [
  {
    variant: "text",
    field: { label: "Title", value: "title" },
    value: ({ field }) => <Input {...field} />,
  },
  {
    variant: "category",
    field: { label: "Category", value: "category.path" },
    value: ({ field }) => (
      <CategorySelector selectValueType="path" {...field} />
    ),
  },
  {
    variant: "select",
    field: { label: "Frame Shape", value: "attributes.frameShape" },
    value: ({ field, fieldState }) => (
      <FrameShapeCombobox {...field} {...fieldState} />
    ),
  },
  {
    variant: "date",
    field: { label: "Creation Date", value: "createdAt" },
    value: ({ field }) => <DateInput {...field} />,
  },
];
type Variant = "text" | "date" | "dateRange" | "number" | "select" | "category";

export const variantOperators: {
  [key: string]: { label: string; operator: string }[];
} = {
  text: [
    { label: "is", operator: "eq" },
    { label: "starts with", operator: "sw" },
    { label: "ends with", operator: "ew" },
    { label: "contains", operator: "c" },
    { label: "doesn't contains", operator: "nc" },
  ],
  date: [
    { label: "is", operator: "eq" },
    { label: "is before", operator: "lt" },
    { label: "is after", operator: "gt" },
    { label: "is on or before", operator: "lte" },
    { label: "is on or after", operator: "gte" },
  ],
  number: [
    { label: "is", operator: "eq" },
    { label: "is less than", operator: "lt" },
    { label: "is greator than", operator: "gt" },
    { label: "is less than or equal to", operator: "lte" },
    { label: "is greator than or equal to ", operator: "gte" },
  ],
  select: [
    { label: "is", operator: "eq" },
    { label: "is not", operator: "ne" },
  ],
  category: [
    { label: "is", operator: "c" },
    { label: "is not", operator: "nc" },
  ],
};

type FilterItem = {
  variant: Variant;
  field: { label: string; value: string };
  value: FC<{ field: ControllerRenderProps; fieldState: ControllerFieldState }>;
};
