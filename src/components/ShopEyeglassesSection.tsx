"use client";

import { getEyeglasses } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Carousel, Slide } from "./HomePageProductCarousel";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { buttonVariants } from "./ui/button";

export default function ShopEyeglassesSection() {
  const { data: products, status } = useQuery({
    queryKey: ["eyeglasses"],
    queryFn: getEyeglasses,
  });
  return (
    <div className="relative">
      <h2 className="text-2xl text-center xs:text-start md:text-3xl font-bold uppercase mb-5">
        Shop Eyeglasses
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
      <div className="flex justify-center mt-5 sm:mt-10">
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
