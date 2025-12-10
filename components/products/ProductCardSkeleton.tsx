import { Card, Skeleton } from '@/components/ui';

export function ProductCardSkeleton() {
  return (
    <Card className="p-4 flex flex-col h-full">
      {/* Image skeleton */}
      <Skeleton className="aspect-square w-full mb-4" />
      
      {/* Title skeleton */}
      <Skeleton className="h-6 w-3/4 mb-2" />
      
      {/* Price skeleton */}
      <Skeleton className="h-8 w-1/2 mb-4" />
      
      {/* Button skeleton */}
      <Skeleton className="h-10 w-full mt-auto" />
    </Card>
  );
}