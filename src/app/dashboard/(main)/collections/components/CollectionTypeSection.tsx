"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useWatch } from "react-hook-form";
import ConditionsSection from "./ConditionsSection";
import ProductsSearchSection from "./ProductsSearchSection";

export default function CollectionTypeSection() {
  const type = useWatch({ name: "type" });
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Collection Type</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
                    className="space-y-2"
                  >
                    <div className="flex justify-start items-center gap-2">
                      <RadioGroupItem value="manual" id="manual" />
                      <Label htmlFor="manual">Manual</Label>
                    </div>
                    <div className="flex justify-start items-center gap-2">
                      <RadioGroupItem value="automatic" id="automatic" />
                      <Label htmlFor="automatic">Smart</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      {type === "manual" ? <ProductsSearchSection /> : <ConditionsSection />}
    </>
  );
}
