import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CollectionSchemaType } from "../lib/validation";
import Condition from "./Condition";

export default function ConditionsSection() {
  const { fields, append, remove } = useFieldArray({ name: "conditions" });

  const {
    formState: { errors },
  } = useFormContext<CollectionSchemaType>();
  return (
    <Card>
      <CardHeader>
        {errors.conditions && (
          <p className="text-destructive text-sm">
            {errors.conditions.message}
          </p>
        )}
        <CardTitle>Conditions</CardTitle>
        <CardDescription className="flex gap-5">
          products must match:
          <FormField
            name={`matchType`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    className="flex"
                    defaultValue="and"
                  >
                    <div className="flex justify-start items-center gap-2">
                      <RadioGroupItem id="and" value="and" />
                      <Label htmlFor="and">all conditions</Label>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <RadioGroupItem id="or" value="or" />
                      <Label htmlFor="or">any conditions</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {fields.map((field, idx) => (
          <Condition
            key={field.id}
            id={idx}
            onConditionDelete={() => remove(idx)}
          />
        ))}

        <Button
          type="button"
          variant={"secondary"}
          onClick={() => append({ field: "title", relation: "eq", value: "" })}
        >
          <Plus />
          {fields.length ? "Add another condition" : "Add condition"}
        </Button>
      </CardContent>
    </Card>
  );
}
