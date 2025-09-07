import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-10 py-10">
      <Skeleton className="w-full aspect-square" />
      <div className="space-y-4 sm:space-y-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 sm:h-10 w-3/4" />
          <Skeleton className="h-8 sm:h-10 w-1/4" />
        </div>
        <Separator />
        <div>
          <Skeleton className="h-3 w-20 mb-2" />
          <div className="grid grid-cols-5 sm:grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-1 sm:gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <Skeleton key={idx} className="w-full aspect-square" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-4/5 h-5 " />
        </div>
        <Separator />
        <Skeleton className="w-full h-10" />
      </div>
    </div>
  );
}
