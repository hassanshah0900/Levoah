import ProductCardSkeleton from "@/app/(app)/[...categories]/components/ProductCardSkeleton";
import React from "react";
import { Skeleton } from "./ui/skeleton";

export default function ProductsGridLoadingSkeleton() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center gap-5">
        <Skeleton className="h-8 md:h-10 w-24 xs:w-40" />
        <div className="flex justify-start items-center gap-3 md:gap-5">
          <Skeleton className="h-8 md:h-10 aspect-square" />
          <Skeleton className="h-8 md:h-10 w-24 xs:w-40" />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-x-5 gap-y-10">
        {Array.from({ length: 8 }).map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
