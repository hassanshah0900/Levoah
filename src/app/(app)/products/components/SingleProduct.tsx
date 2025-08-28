"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@/types/products.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductWithVariants } from "../lib/queries";
import ProductImage from "./ProductImage";

export default function SingleProduct({ slug }: { slug: string }) {
  const { data, isError } = useQuery({
    queryKey: ["single product with variants", { slug }],
    queryFn: () => getProductWithVariants(slug),
  });

  if (!data) return;

  const { product } = data;
  const [currentVariant, setCurrentVariant] = useState(product.variants[0]);

  return (
    <div className="grid grid-cols-2 gap-10 py-10">
      <ProductImage
        src={currentVariant.image_url}
        alt=""
        className="shadow-highlight shadow-[0_0_10px]"
      />
      <div className="space-y-5">
        <div className="">
          <h1 className="text-3xl font-semibold uppercase">{product.title}</h1>
          <p className="text-2xl">Rs {currentVariant.price}</p>
        </div>
        <Separator />
        <Variants
          currentVariant={currentVariant}
          variants={product.variants}
          onVariantSelect={(variant) => setCurrentVariant(variant)}
        />

        <div className="mt-5">
          <p className="font-semibold text-lg ">
            Frame{"   "}
            <span className="text-base text-muted-foreground font-normal normal-case ms-2">
              {currentVariant.frame_color}
            </span>
          </p>
          <p className="font-semibold text-lg">
            Lense{"   "}
            <span className="text-base text-muted-foreground font-normal normal-case ms-2">
              {currentVariant.lense_color}
            </span>
          </p>
        </div>
        <p>{product.description}</p>
        <Separator />
        <Button className="w-full mt-5">Add to Cart</Button>
      </div>
    </div>
  );
}

function Variants({
  variants,
  onVariantSelect,
  currentVariant,
}: {
  variants: ProductVariant[];
  onVariantSelect: (variant: ProductVariant) => void;
  currentVariant: ProductVariant;
}) {
  return (
    <div className="space-y-2">
      <p className="font-semibold text-sm">{variants.length} Colors</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            className={cn(
              "w-full rounded-xs overflow-hidden",
              variant.id === currentVariant.id &&
                "shadow-[0_0_10px] shadow-highlight"
            )}
            onClick={() => onVariantSelect(variant)}
          >
            <ProductImage src={variant.image_url} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
