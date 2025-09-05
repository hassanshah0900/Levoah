import ProductImage from "@/app/(app)/products/components/ProductImage";
import { getOtherCategories } from "@/app/dashboard/(main)/categories/lib/queries";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ComponentProps,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Skeleton } from "./ui/skeleton";

export default function CategoryCarousel() {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const { data, isPending } = useQuery({
    queryKey: ["other categories", categorySlug],
    queryFn: () => getOtherCategories(categorySlug ?? "all"),
  });

  const [isActive, setIsActive] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    active: isActive,
    align: "start",
  });

  useEffect(() => {
    if (!emblaApi) return;

    const checkActivity = () => {
      const canScroll = emblaApi.canScrollPrev() || emblaApi.canScrollNext();
      console.log(canScroll);

      setIsActive(canScroll);
    };

    emblaApi.on("resize", checkActivity);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="overflow-hidden group/carousel">
      <div ref={emblaRef} className={cn("relative")}>
        <div className="flex">
          {isPending ? (
            <CategoryCarouselSkeleton />
          ) : (
            data?.categories.map((category) => (
              <EmblaCategorySlide key={category.id}>
                <Link
                  href={`/products/glasses/category/${category.slug}`}
                  className="flex flex-col justify-center items-center gap-2 group/category outline-none"
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
              </EmblaCategorySlide>
            ))
          )}
        </div>

        <NavigationButton
          isActive={isActive}
          buttonType="PREVIOUS"
          onClick={scrollPrev}
        />
        <NavigationButton
          isActive={isActive}
          buttonType="NEXT"
          onClick={scrollNext}
        />
      </div>
    </div>
  );
}

function EmblaCategorySlide({ children }: PropsWithChildren) {
  return (
    <div className="shrink-0 grow-0 md:basis-1/8 sm:basis-1/6 xs:basis-1/5 basis-1/4 px-1">
      {children}
    </div>
  );
}

interface NavigationButtonProps extends ComponentProps<"button"> {
  buttonType: "PREVIOUS" | "NEXT";
  isActive: boolean;
}
function NavigationButton({
  className,
  children,
  buttonType,
  isActive,
  ...props
}: NavigationButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 bg-primary/50 hover:bg-primary/80 focus:bg-primary/80 outline-none focus-visible:shadow-[0_0_10px] shadow-highlight text-primary-foreground opacity-0 group-hover/carousel:opacity-100 rounded-full p-1 duration-200 transition-all justify-center items-center hidden md:flex",
        buttonType === "PREVIOUS" ? "left-2" : "right-2",
        className
      )}
      style={{ display: `${!isActive ? "none" : "block"}` }}
    >
      {buttonType === "PREVIOUS" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

function CategoryCarouselSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, idx) => (
        <EmblaCategorySlide key={idx}>
          <Skeleton className="w-full aspect-square rounded-xs" key={idx} />
        </EmblaCategorySlide>
      ))}
    </>
  );
}
