"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormContext } from "react-hook-form";
import { CollectionSchemaType } from "../lib/validation";

export default function ProductsSearchSection() {
  const {
    formState: { errors },
  } = useFormContext<CollectionSchemaType>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
      </CardHeader>
      <CardContent>
        {errors.products && (
          <p className="text-destructive text-sm">{errors.products.message}</p>
        )}
      </CardContent>
    </Card>
  );
}
