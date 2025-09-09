import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  ComponentProps,
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface CarouselContextType {
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  canScroll: boolean;
}

const CarouselContext = createContext<CarouselContextType>(
  {} as CarouselContextType
);

function useCarousel() {
  return useContext<CarouselContextType>(CarouselContext);
}

type CarouselState = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  canScroll: boolean;
};

interface Props {
  children?: ReactNode;
  className?: string;
}
export default function Carousel({ children, className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "end" });
  const [carouselState, setCarouselState] = useState<CarouselState>(
    {} as CarouselState
  );

  useEffect(() => {
    if (!emblaApi) return;

    const updateCarouselState = () => {
      const canScrollPrev = emblaApi.canScrollPrev();
      const canScrollNext = emblaApi.canScrollNext();
      setCarouselState(() => {
        return {
          canScrollPrev,
          canScrollNext,
          canScroll: canScrollPrev || canScrollNext,
        };
      });
    };

    updateCarouselState();
    emblaApi.on("select", updateCarouselState);

    return () => {
      emblaApi.off("select", updateCarouselState);
    };
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;

    emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <CarouselContext.Provider
      value={{
        scrollPrev,
        scrollNext,
        canScrollPrev: carouselState.canScrollPrev,
        canScrollNext: carouselState.canScrollNext,
        canScroll: carouselState.canScroll,
      }}
    >
      <div className={cn("relative group/carousel", className)}>
        <CarouselNavigationButton buttonType="prev" />
        <CarouselNavigationButton buttonType="next" />
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">{children}</div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
}

interface CarouselNavigationButtonProps extends ComponentProps<"button"> {
  buttonType: "prev" | "next";
}

function CarouselNavigationButton({
  children,
  buttonType,
  ...props
}: CarouselNavigationButtonProps) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext, canScroll } =
    useCarousel();

  return (
    <button
      {...props}
      className={cn(
        "absolute top-1/2 -translate-y-1/2 z-10 bg-primary/50 hover:bg-primary/80 focus:bg-primary/80 outline-none focus-visible:shadow-[0_0_10px] shadow-highlight text-primary-foreground opacity-0 group-hover/carousel:opacity-100 rounded-full p-1 duration-200 transition-all justify-center items-center cursor-pointer",
        buttonType === "prev" ? "left-4" : "right-4",
        buttonType === "prev" && !canScrollPrev && "hidden",
        buttonType === "next" && !canScrollNext && "hidden",
        !canScroll && "hidden"
      )}
      onClick={() => (buttonType === "prev" ? scrollPrev() : scrollNext())}
    >
      {buttonType === "prev" ? <ChevronLeft /> : <ChevronRight />}
    </button>
  );
}

export function CarouselSlide({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        "basis-[calc(100%/var(--slides))] px-[calc(var(--gap)/2)]"
      )}
    >
      {children}
    </div>
  );
}
