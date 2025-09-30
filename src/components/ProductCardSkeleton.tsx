import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="w-full aspect-square rounded-xs" />
      <div className="py-4 flex flex-col gap-2">
        <div className="flex justify-between items-center mb-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}
