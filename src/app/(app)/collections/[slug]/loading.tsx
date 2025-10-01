import Container from "@/components/Container";
import ProductsGridLoadingSkeleton from "@/components/ProductsGridLoadingSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionsPageSkeleton() {
  return (
    <Container>
      <div className="py-10">
        <Skeleton className="w-full aspect-video mb-10 sm:mb-16" />
        <ProductsGridLoadingSkeleton />
        <div className="space-y-3 mt-20">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-3/4 h-5" />
        </div>
      </div>
    </Container>
  );
}
