"use client";

import { useUiStore } from "@/lib/state/uiStore";
import type { TransactionType } from "@/domain/transactions/transactionTypes";
import { cn } from "@/lib/utils/cn";

type FilterValue = "all" | TransactionType;

const filterOptions: Array<{ value: FilterValue; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "income", label: "Ingresos" },
  { value: "expense", label: "Gastos" },
  { value: "savings", label: "Ahorros" },
];

export function TransactionFilters() {
  const transactionFilter = useUiStore((state) => state.transactionFilter);
  const setTransactionFilter = useUiStore(
    (state) => state.setTransactionFilter
  );

  return (
    <div className="inline-flex items-center gap-2 rounded-pill bg-bg p-1 text-xs">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setTransactionFilter(option.value)}
          className={cn(
            "rounded-pill px-3 py-1 font-medium transition-colors",
            transactionFilter === option.value
              ? "bg-brand-dark text-surface"
              : "text-text-muted hover:bg-surface"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
