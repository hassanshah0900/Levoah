"use client";

import CategoryCarousel from "@/components/CategoryCarousel";
import Container from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import { getNextPageIndex } from "@/lib/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import { getCategoryBySlug, getProductsWithVariants } from "../lib/queries";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductsFilters from "./ProductsFilters";
import ProductsSorter from "./ProductsSorter";
import { InView } from "react-intersection-observer";
import { PAGE_SIZE } from "../lib/data";

interface Props {
  categorySlug?: string;
  productType?: string;
}
export default function ProductsGrid({ productType, categorySlug }: Props) {
  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["products with variants", categorySlug, productType],
    queryFn: ({ pageParam }) =>
      getProductsWithVariants({ pageIndex: pageParam, pageSize: PAGE_SIZE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      getNextPageIndex(lastPageParam, lastPage.count ?? 0, PAGE_SIZE),
  });

  const { data: category, status: categoryStatus } = useQuery({
    queryKey: ["categories", categorySlug],
    queryFn: () => getCategoryBySlug(categorySlug ?? ""),
  });

  if (status === "error" || categoryStatus === "error")
    return <div>An Error Occured.</div>;

  return (
    <Container>
      <div className="py-10 space-y-10">
        <CategoryCarousel />
        <div className="flex justify-between items-center">
          {categoryStatus === "pending" ? (
            <Skeleton className="h-8 w-1/4" />
          ) : (
            <h1 className="text-2xl md:text-4xl font-semibold">
              {category?.name ?? "Shop"}
            </h1>
          )}
          <div className="flex justify-center items-center gap-2">
            <ProductsFilters />
            <ProductsSorter />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-2.5 xs:gap-x-4 md:gap-x-5 gap-y-10">
          {status === "pending"
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))
            : data?.pages.map((page, idx) => (
                <Fragment key={idx}>
                  {page.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </Fragment>
              ))}
          {isFetchingNextPage &&
            Array.from({ length: 4 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))}
        </div>
      </div>
      <InView
        onChange={(inView) => {
          if (inView && !isFetchingNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      />
    </Container>
  );
}
