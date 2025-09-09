import ProductImage from "@/app/(app)/products/components/ProductImage";
import { getOtherCategories } from "@/app/dashboard/(main)/categories/lib/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import Carousel, { CarouselSlide } from "./Carousel/Carousel";

export default function CategoryCarousel() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const { data, isPending } = useQuery({
    queryKey: ["other categories", categorySlug],
    queryFn: () => getOtherCategories(categorySlug ?? "all"),
  });

  return (
    <Carousel className="[--slides:3] [--gap:6px] xs:[--slides:4] md:[--slides:6] md:[--gap:8px]">
      {isPending ? (
        <CategoryCarouselSkeleton />
      ) : (
        data?.categories.map((category) => (
          <CarouselSlide key={category.id}>
            <Link
              href={`/products/glasses/category/${category.slug}`}
              className="xs:flex flex flex-col justify-center items-center gap-2 group/category outline-none"
            >
              <ProductImage
                src={category.image_url}
                alt=""
                className="rounded-xs overflow-hidden"
              />
              <p className="underline-offset-3 font-semibold group-hover/category:underline group-focus/category:underline text-xs xs:text-sm md:text-base">
                {category.name}
              </p>
            </Link>
          </CarouselSlide>
        ))
      )}
    </Carousel>
  );
}

function CategoryCarouselSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <CarouselSlide key={idx}>
          <Skeleton className="w-full aspect-square rounded-xs" key={idx} />
        </CarouselSlide>
      ))}
    </>
  );
}
