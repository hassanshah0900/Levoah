"use client";

import { getSunglasses } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Carousel, Slide } from "./HomePageProductCarousel";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { buttonVariants } from "./ui/button";

export default function ShopSunglassesSection() {
  const { data: products, status } = useQuery({
    queryKey: ["sunglasses"],
    queryFn: getSunglasses,
  });
  return (
    <div className="relative">
      <h2 className="text-2xl text-center xs:text-start md:text-3xl font-bold uppercase mb-5">
        Shop Sunglasses
      </h2>
      <div>
        <Carousel>
          {status === "pending"
            ? Array.from({ length: 5 }).map((_, idx) => (
                <Slide key={idx}>
                  <ProductCardSkeleton />
                </Slide>
              ))
            : products?.map((product) => (
                <Slide key={product.id}>
                  <ProductCard key={product.id} product={product} />
                </Slide>
              ))}
        </Carousel>
      </div>
      <div className="flex justify-center mt-5s sm:mt-10">
        <Link
          href={"/collections/sunglasses"}
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          See More
        </Link>
      </div>
    </div>
  );
}
