import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import type { TransactionType } from "@/domain/transactions/transactionTypes";

interface BadgeProps {
  type: TransactionType;
  children: ReactNode;
}

export function Badge({ type, children }: BadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-pill px-3 py-1 text-xs font-medium";

  const colorClassesByType: Record<TransactionType, string> = {
    income: "bg-income/10 text-income",
    expense: "bg-expense/10 text-expense",
    savings: "bg-savings/10 text-savings",
  };

  return (
    <span className={cn(baseClasses, colorClassesByType[type])}>
      {children}
    </span>
  );
}
