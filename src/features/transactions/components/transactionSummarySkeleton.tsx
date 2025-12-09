"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TransactionSummarySkeleton() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {[0, 1, 2].map((index) => (
        <div key={index} className="rounded-lg bg-surface p-4 shadow-soft">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-4 h-7 w-32" />
        </div>
      ))}
    </section>
  );
}
