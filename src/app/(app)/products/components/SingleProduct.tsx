"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { cn } from "@/lib/utils";
import { Product, ProductVariant } from "@/types/products.types";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import ProductImage from "../../../../components/ProductImage";
import { getProductWithVariants } from "../../[...categories]/lib/queries";
import SingleProductSkeleton from "./SingleProductSkeleton";

interface Props {
  slug: string;
}
export default function SingleProduct({ slug }: Props) {
  const { data: product, status } = useQuery({
    queryKey: ["glasses", slug],
    queryFn: () => getProductWithVariants(slug),
  });

  const { addCartItem, setIsOpen, isInCart } = useShoppingCart();

  const [currentVariant, setCurrentVariant] = useState<
    ProductVariant | undefined
  >(undefined);

  useEffect(() => {
    if (status === "success" && product && product.variants.length > 0)
      setCurrentVariant(product.variants[0]);
  }, [status, product]);

  if (status === "pending") return <SingleProductSkeleton />;
  if (status === "error") return <div>An unexpected error has occured</div>;

  if (product === null) notFound();

  const isItemInCart = currentVariant
    ? isInCart(product.id, currentVariant.id)
    : false;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 py-10">
      <ProductImage
        src={currentVariant?.imageUrl}
        alt=""
        className="shadow-highlight shadow-[0_0_5px] sm:shadow-[0_0_10px] rounded-xs overflow-hidden"
      />
      <div className="space-y-4 sm:space-y-5">
        <div>
          <h1 className="text-xl sm:text-3xl font-semibold uppercase leading-tight sm:leading-normal">
            {product.title}
          </h1>
          <p className="text-xl sm:text-2xl leading-tight sm:leading-normal">
            Rs {currentVariant?.price}
          </p>
        </div>
        <Separator />
        <Variants
          currentVariant={currentVariant}
          variants={product.variants as ProductVariant<"glasses">[]}
          onVariantSelect={(variant) => setCurrentVariant(variant)}
        />

        <div>
          {product.productType === "glasses" && currentVariant && (
            <GlassesRelatedDetails
              product={product}
              variant={currentVariant as ProductVariant<"glasses">}
            />
          )}
        </div>

        <p className="text-sm sm:text-base">{product?.description}</p>
        <Separator />
        <Button
          onClick={() => {
            addCartItem({
              product: product,
              variant: currentVariant!,
              quantity: 1,
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
  currentVariant: ProductVariant | undefined;
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
              "w-full rounded-sm overflow-hidden",
              variant.id === currentVariant?.id &&
                "shadow-[0_0_4px] sm:shadow-[0_0_10px] shadow-highlight"
            )}
            onClick={() => onVariantSelect(variant)}
          >
            <ProductImage src={variant.imageUrl} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}

function GlassesRelatedDetails({
  variant,
  product,
}: {
  variant: ProductVariant<"glasses">;
  product: Product<"glasses">;
}) {
  return (
    <div>
      <p className="sm:text-lg">
        Frame
        <span className="text-sm sm:text-base text-muted-foreground font-normal ms-2 normal-case sm:ms-2">
          {variant.attributes.frameColor}
        </span>
      </p>
      <p className="sm:text-lg">
        Lense
        <span className="text-sm sm:text-base text-muted-foreground font-normal ms-2 normal-case sm:ms-2">
          {variant.attributes.lenseColor}
        </span>
      </p>
      <p className="sm:text-lg">
        Size
        <span className="text-sm sm:text-base text-muted-foreground font-normal ms-2 normal-case sm:ms-2">
          {product.attributes.lenseWidth} {product.attributes.bridgeWidth}
        </span>
      </p>
    </div>
  );
}
