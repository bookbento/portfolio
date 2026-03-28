import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 py-12 animate-pulse">
      <Skeleton className="h-12 w-1/3 rounded-xl mx-auto" />
      <Skeleton className="h-6 w-1/2 rounded-xl mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-72 w-full rounded-2xl" />
        ))}
      </div>
    </div>
  );
}