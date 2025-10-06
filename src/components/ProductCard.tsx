"use client";

import { Product } from "@/types/products.types";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import ProductImage from "./ProductImage";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
  });
  const [currentVariant, setCurrentVariant] = useState(product.variants[0]);

  const updateCurrentVariant = useCallback(() => {
    if (!emblaApi) return;

    setCurrentVariant(product.variants[emblaApi.slidesInView()[0]]);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", updateCurrentVariant);
  });

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="@container/product">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {product.variants.map((variant) => (
              <EmblaSlide key={variant.id}>
                <ProductImage
                  src={variant.imageUrl}
                  alt=""
                  className="rounded-sm"
                />
              </EmblaSlide>
            ))}
          </div>
          <div className="py-4 space-y-1 @md/product:space-y-2">
            <div className="flex flex-col @md/product:flex-row justify-between items-start gap-2 @md/product:gap-3">
              <h2 className="leading-tight">{product.title}</h2>
              <span className="text-base @md/product:text-lg @3xl/product:text-xl font-semibold text-nowrap">
                Rs {currentVariant.price}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs @md/product:text-sm text-foreground/70">
              {product.variants.length} Colors
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmblaSlide({ children }: PropsWithChildren) {
  return <div className="shrink-0 grow-0 basis-full min-w-0">{children}</div>;
}
