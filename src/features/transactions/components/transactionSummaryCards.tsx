"use client";

import { useMemo } from "react";
import { useTransactionsStore } from "@/lib/state/transactionStore";
import { formatCurrency } from "@/lib/utils/currency";

export function TransactionSummaryCards() {
  const transactions = useTransactionsStore((state) => state.transactions);

  const { incomeTotal, expenseTotal, savingsTotal } = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income")
          acc.incomeTotal += transaction.amount;
        if (transaction.type === "expense")
          acc.expenseTotal += transaction.amount;
        if (transaction.type === "savings")
          acc.savingsTotal += transaction.amount;
        return acc;
      },
      { incomeTotal: 0, expenseTotal: 0, savingsTotal: 0 }
    );
  }, [transactions]);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-lg bg-income text-surface p-4 shadow-soft">
        <p className="text-sm">Ingresos</p>
        <p className="mt-2 text-2xl font-semibold">
          {formatCurrency(incomeTotal)}
        </p>
      </div>
      <div className="rounded-lg bg-expense text-surface p-4 shadow-soft">
        <p className="text-sm">Gastos</p>
        <p className="mt-2 text-2xl font-semibold">
          {formatCurrency(expenseTotal)}
        </p>
      </div>
      <div className="rounded-lg bg-savings text-surface p-4 shadow-soft">
        <p className="text-sm">Ahorros</p>
        <p className="mt-2 text-2xl font-semibold">
          {formatCurrency(savingsTotal)}
        </p>
      </div>
    </section>
  );
}
