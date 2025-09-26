"use client";

import Container from "@/components/Container";
import { getNextPageIndex } from "@/lib/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";
import { PAGE_SIZE } from "../lib/data";
import { getCategoryBySlug, getProductsWithVariants } from "../lib/queries";
import ProductCard from "../../../../components/ProductCard";
import ProductCardSkeleton from "../../../../components/ProductCardSkeleton";
import ProductsFilters from "../../../../components/ProductsFilters";
import ProductsSorter from "./ProductsSorter";

export default function ProductsGrid() {
  const { categories } = useParams<{
    categories: string[];
  }>();

  const categorySlug = categories ? categories[categories.length - 1] : null;
  const categoryPath = usePathname();

  const {
    data,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["products with variants", categoryPath],
    queryFn: ({ pageParam }) =>
      getProductsWithVariants({
        pageIndex: pageParam,
        pageSize: PAGE_SIZE,
        categoryPath,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) =>
      getNextPageIndex(lastPageParam, lastPage.count ?? 0, PAGE_SIZE),
  });

  const { data: category, status: categoryStatus } = useQuery({
    queryKey: ["categories", categorySlug],
    queryFn: () => getCategoryBySlug(categorySlug ?? ""),
  });

  console.log(data?.pages);

  return (
    <Container>
      <div className="py-10 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <h1 className="text-2xl md:text-4xl font-semibold">
            {category?.name ?? "Shop"}
          </h1>
          <div className="flex justify-between items-center gap-2">
            <ProductsFilters />
            <ProductsSorter />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-2.5 xs:gap-x-4 md:gap-x-5 gap-y-10">
          {data?.pages.map((page, idx) => (
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
          if (hasNextPage && inView && !isFetchingNextPage && !isFetching) {
            fetchNextPage();
          }
        }}
      />
    </Container>
  );
}
