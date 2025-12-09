"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TransactionTableSkeleton() {
  const headers = ["Fecha", "Descripción", "Monto", "Categoría"];

  return (
    <section className="overflow-hidden rounded-lg bg-surface shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-subtle text-sm">
          <thead className="bg-bg">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-medium text-text-muted"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-surface">
            {[0, 1, 2].map((rowIndex) => (
              <tr key={rowIndex}>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-40" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-4 w-28" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border-subtle px-4 py-2">
        <Skeleton className="h-3 w-32" />
      </div>
    </section>
  );
}
