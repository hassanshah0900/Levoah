import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ProductCardSkeleton from "../../../../components/ProductCardSkeleton";

export default function RelatedProductsSectionSkeleton() {
  return (
    <div className="mt-20 space-y-10">
      <div className="flex justify-center items-center">
        <Skeleton className="h-10 w-1/4" />
      </div>
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
