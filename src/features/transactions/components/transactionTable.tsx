"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/domain/transactions/transactionTypes";
import { formatCurrency } from "@/lib/utils/currency";

interface TransactionTableProps {
  transactions: Transaction[];
}

function getTypeLabel(type: Transaction["type"]) {
  if (type === "income") return "Ingreso";
  if (type === "expense") return "Gasto";
  return "Ahorro";
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <section className="overflow-hidden rounded-lg bg-surface shadow-soft">
        <div className="flex flex-col items-center justify-center px-6 py-10 text-center text-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-bg">
            <span className="text-lg">📊</span>
          </div>
          <p className="font-medium text-text-main">
            No tienes transacciones aún.
          </p>
          <p className="mt-1 text-xs text-text-muted">
            Crea tu primera transacción con el botón &quot;Nueva
            transacción&quot;.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-lg bg-surface shadow-soft">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border-subtle text-sm">
          <thead className="bg-bg">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-text-muted">
                Fecha
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">
                Descripción
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">
                Monto
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">
                Categoría
              </th>
              <th className="px-4 py-3 text-left font-medium text-text-muted">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle bg-surface">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-4 py-3">{transaction.date}</td>
                <td className="px-4 py-3">{transaction.description}</td>
                <td className="px-4 py-3">
                  {formatCurrency(transaction.amount)}
                </td>
                <td className="px-4 py-3">
                  <Badge type={transaction.type}>
                    {getTypeLabel(transaction.type)}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/dashboard/transactions/${transaction.id}/edit`}
                    className="text-xs font-medium text-brand-dark hover:underline"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center border-t border-border-subtle px-4 py-2 text-xs text-text-muted">
        1 - {transactions.length} of {transactions.length}
      </div>
    </section>
  );
}
