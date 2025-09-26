"use client";

import { getProductsByCollection } from "@/app/(app)/collections/lib/queries";
import { getNextPageIndex } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Fragment } from "react";
import { InView } from "react-intersection-observer";
import ProductCard from "../../[...categories]/components/ProductCard";
import ProductCardSkeleton from "../../[...categories]/components/ProductCardSkeleton";
import ProductsFilters from "../../[...categories]/components/ProductsFilters";
import ProductsSorter from "../../[...categories]/components/ProductsSorter";

const PAGE_SIZE = 10;
export default function CollectionProductGrid() {
  const { slug } = useParams<{ slug: string }>();

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["products with variants"],
      queryFn: () => getProductsByCollection(slug),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParams) => {
        return getNextPageIndex(lastPageParams, lastPage?.count, PAGE_SIZE);
      },
    });

  const numberOfVisibleProducts = data
    ? (data.pages.length - 1) * PAGE_SIZE +
      data?.pages[data.pages.length - 1].products.length
    : 0;

  function handleInView(inView: boolean) {
    if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center gap-3">
        <span className="text-muted-foreground text-sm xs:text-base">
          Showing {numberOfVisibleProducts} of {data?.pages[0].count}
        </span>
        <div className="flex justify-start items-center gap-1 xs:gap-3">
          <ProductsFilters />
          <ProductsSorter />
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-5 sm:gap-y-10">
        {status === "pending" ? (
          <ProductsLoadingSkeleton />
        ) : (
          data?.pages.map((page, idx) => (
            <Fragment key={idx}>
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {page.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
              {isFetchingNextPage && <ProductsLoadingSkeleton />}
              <InView onChange={handleInView} />
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}

function ProductsLoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </>
  );
}

function Filters() {}
