"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
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

  const { addCartItem, setIsOpen, isInCart } = useShoppingCart();

  const isItemInCart = isInCart(product.id, currentVariant.id);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 py-10">
      <ProductImage
        src={currentVariant.image_url}
        alt=""
        className="shadow-highlight shadow-[0_0_5px] sm:shadow-[0_0_10px] rounded-xs overflow-hidden"
      />
      <div className="space-y-4 sm:space-y-5">
        <div>
          <h1 className="text-xl sm:text-3xl font-semibold uppercase leading-tight sm:leading-normal">
            {product.title}
          </h1>
          <p className="text-xl sm:text-2xl leading-tight sm:leading-normal">
            Rs {currentVariant.price}
          </p>
        </div>
        <Separator />
        <Variants
          currentVariant={currentVariant}
          variants={product.variants}
          onVariantSelect={(variant) => setCurrentVariant(variant)}
        />

        <div>
          <p className="font-semibold sm:text-lg">
            Frame{"   "}
            <span className="text-sm sm:text-base text-muted-foreground font-normal normal-case ms-1 sm:ms-2">
              {currentVariant.frame_color}
            </span>
          </p>
          <p className="font-semibold sm:text-lg">
            Lense{"   "}
            <span className="text-sm sm:text-base text-muted-foreground font-normal normal-case ms-1 sm:ms-2">
              {currentVariant.lense_color}
            </span>
          </p>
        </div>
        <p className="text-sm sm:text-base">
          {product.description} Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Harum molestiae quod cumque nobis dolor maxime, sit
          magni quas, placeat architecto nulla autem ipsam, assumenda nesciunt
          perspiciatis modi labore a rerum!
        </p>
        <Separator />
        <Button
          onClick={() => {
            addCartItem({
              product_id: product.id,
              variant_id: currentVariant.id,
              image_url: currentVariant.image_url,
              title: product.title,
              price: currentVariant.price,
              quantity: 1,
              frame_color: currentVariant.frame_color,
              lense_color: currentVariant.lense_color,
            });
            setIsOpen(true);
          }}
          className={"w-full"}
          disabled={isItemInCart}
        >
          {!isItemInCart ? "Add to Cart" : "Already in cart"}
        </Button>
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
      <p className="font-semibold text-xs sm:text-sm text-muted-foreground">
        {variants.length} Colors
      </p>
      <div className="grid grid-cols-5 sm:grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-1 sm:gap-3">
        {variants.map((variant) => (
          <button
            key={variant.id}
            className={cn(
              "w-full rounded-xs overflow-hidden",
              variant.id === currentVariant.id &&
                "shadow-[0_0_4px] sm:shadow-[0_0_10px] shadow-highlight"
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
