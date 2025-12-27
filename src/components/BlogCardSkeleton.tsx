import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogCardSkeletonProps {
  count?: number;
}

const BlogCardSkeleton = ({ count = 6 }: BlogCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden bg-card border-border">
          {/* Image skeleton */}
          <Skeleton className="h-48 w-full rounded-none" />
          
          <div className="p-6">
            {/* Category and meta */}
            <div className="flex items-center justify-between mb-3">
              <Skeleton className="h-6 w-20 rounded-full" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex gap-1 mb-3">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            
            {/* Title */}
            <Skeleton className="h-7 w-full mb-2" />
            <Skeleton className="h-7 w-3/4 mb-3" />
            
            {/* Excerpt */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            
            {/* Button */}
            <Skeleton className="h-10 w-32" />
          </div>
        </Card>
      ))}
    </>
  );
};

export default BlogCardSkeleton;
