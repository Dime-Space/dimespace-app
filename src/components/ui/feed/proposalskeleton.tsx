// components/ui/feed/ProposalCardSkeleton.tsx

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProposalCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="w-40 h-4 rounded" />
              <Skeleton className="w-24 h-3 rounded" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-20 h-6 rounded" />
            <Skeleton className="w-28 h-8 rounded" />
          </div>
        </div>

        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
        <Skeleton className="h-4 w-4/6 rounded" />
      </CardContent>
    </Card>
  );
}
