import { ProductAttribute } from "@/types/products.types";

export function calculatePercentage(
  numerator: number,
  denominator: number
): string {
  return `${Math.ceil((numerator / denominator) * 100)}%`;
}

export function parseProductAttribute(attribute: string): ProductAttribute {
  const values = attribute.split("#");

  let parsedAttribute: ProductAttribute = {} as ProductAttribute;
  parsedAttribute.label = values[0] ?? "";
  parsedAttribute.value = values[1] ?? "";

  return parsedAttribute;
}
