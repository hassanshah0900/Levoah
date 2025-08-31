"use client";

import { ProductWithVariants } from "@/types/products.types";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import ProductImage from "./ProductImage";

interface Props {
  product: ProductWithVariants;
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
    <Link href={`/products/${product.product_type.slug}/${product.slug}`}>
      <div className="rounded-xs">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {product.variants.map((variant) => (
              <EmblaSlide>
                <ProductImage
                  src={variant.image_url}
                  alt=""
                  className="rounded-xs"
                />
              </EmblaSlide>
            ))}
          </div>
          <div className="py-4 space-y-2 ">
            <div className="flex justify-between items-start gap-3">
              <h2 className="text-base leading-tight">
                {product.title} And many other details
              </h2>
              <span className="text-xl font-semibold text-nowrap">
                Rs {currentVariant.price}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-foreground/70">
              <span>{product.variants.length} Colors</span>
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
