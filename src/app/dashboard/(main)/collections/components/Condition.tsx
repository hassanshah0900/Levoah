import FormCombobox from "@/components/FormCombobox";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { filters, variantOperators } from "../lib/data";

interface Props {
  id: number;
  onConditionDelete: () => void;
}
export default function Condition({ id, onConditionDelete }: Props) {
  const initialRender = useRef<boolean>(true);
  const fieldValue = useWatch({
    name: `conditions.${id}.field`,
  });
  const { resetField, setValue } = useFormContext();

  const filterItem = filters.find(
    (filter) => filter.field.value === fieldValue
  );
  const variant = filterItem?.variant ?? "text";

  const ValueComponent = filterItem?.value;

  useEffect(() => {
    if (!initialRender.current)
      resetField(`conditions.${id}.value`, { defaultValue: "" });
    setValue(`conditions.${id}.variant`, variant);
  }, [fieldValue]);

  return (
    <div className="flex justify-between items-center gap-3">
      <FormField
        name={`conditions.${id}.field`}
        render={({ field, fieldState }) => (
          <FormItem className="w-full">
            <FormControl>
              <FormCombobox
                items={filters.map(({ field }) => ({
                  label: field.label,
                  value: field.value,
                }))}
                {...field}
                {...fieldState}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name={`conditions.${id}.relation`}
        render={({ field, fieldState }) => (
          <FormItem className="w-full">
            <FormControl>
              <FormCombobox
                placeholder="Selector operator"
                items={variantOperators[variant].map(({ label, operator }) => ({
                  label: label,
                  value: operator,
                }))}
                {...field}
                {...fieldState}
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        name={`conditions.${id}.value`}
        render={({ field, fieldState }) => {
          return (
            <FormItem className="w-full">
              <FormControl>
                {ValueComponent ? (
                  <ValueComponent field={field} fieldState={fieldState} />
                ) : (
                  <Input {...field} />
                )}
              </FormControl>
            </FormItem>
          );
        }}
      />

      <Button
        onClick={onConditionDelete}
        type="button"
        variant={"destructive"}
        size={"icon"}
        aria-label="delete condition"
      >
        <Trash />
      </Button>
    </div>
  );
}
