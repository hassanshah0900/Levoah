import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropsWithChildren } from "react";
import { Button } from "./ui/button";

export function Carousel({ children }: PropsWithChildren) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  return (
    <div className="overflow-hidden w-full">
      <div ref={emblaRef}>
        <div className="flex w-full">{children}</div>
      </div>
      <Button
        variant={"outline"}
        size={"icon"}
        className="absolute top-0 right-0 -translate-x-[220%] hidden sm:flex"
        onClick={() => emblaApi?.scrollPrev()}
      >
        <ChevronLeft className="size-5" />
      </Button>
      <Button
        variant={"outline"}
        size={"icon"}
        className="absolute top-0 right-0 -translate-x-[100%] hidden sm:flex"
        onClick={() => emblaApi?.scrollNext()}
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  );
}

export function Slide({ children }: PropsWithChildren) {
  return (
    <div className="shrink-0 grow-0 basis-full xs:basis-1/2 sm:basis-1/3 md:basis-1/4 min-w-0 px-1">
      {children}
    </div>
  );
}
