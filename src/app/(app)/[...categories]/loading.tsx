import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./components/ProductCardSkeleton";
import Container from "@/components/Container";

export default function loading() {
  return (
    <Container>
      <div className="py-10 space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <Skeleton className="h-8 w-1/4" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-2.5 xs:gap-x-4 md:gap-x-5 gap-y-10">
          {Array.from({ length: 4 }).map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </Container>
  );
}
