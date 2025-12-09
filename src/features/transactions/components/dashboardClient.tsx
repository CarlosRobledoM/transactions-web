"use client";

import { useMemo } from "react";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionSummaryCards } from "./transactionSummaryCards";
import { TransactionTable } from "./transactionTable";
import { TransactionSummarySkeleton } from "./transactionSummarySkeleton";
import { TransactionTableSkeleton } from "./transactionTableSkeleton";
import { TransactionModal } from "./transactionModal";
import { TransactionFilters } from "./transactionFilters";
import { Button } from "@/components/ui/button";
import { useUiStore } from "@/lib/state/uiStore";
import { useAuthStore } from "@/lib/state/authStore";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { RxExit } from "react-icons/rx";
import Image from "next/image";
import logo from "../../../app/icon.png";

export function DashboardClient() {
  const { transactions, isLoading, errorMessage } = useTransactions();
  const openNewTransactionModal = useUiStore(
    (state) => state.openNewTransactionModal
  );
  const transactionFilter = useUiStore((state) => state.transactionFilter);
  const user = useAuthStore((state) => state.user);
  const { handleLogout, isLoggingOut } = useLogout();

  const filteredTransactions = useMemo(() => {
    if (transactionFilter === "all") {
      return transactions;
    }
    return transactions.filter(
      (transaction) => transaction.type === transactionFilter
    );
  }, [transactions, transactionFilter]);

  return (
    <>
      <div className="space-y-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center">
              <Image
                className="rounded-full"
                src={logo.src}
                alt="FinTracker Logo"
                width={34}
                height={34}
              />
            </div>
            <span className="text-xl font-semibold">FinTracker</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-medium text-text-muted">
              {user?.name ?? "Usuario Demo"}
            </span>
            <Button
              type="button"
              variant="ghost"
              className="px-3 py-1 gap-2 text-xs"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
              <RxExit className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {isLoading && (
          <>
            <TransactionSummarySkeleton />
            <section className="flex items-center justify-between">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                <h2 className="text-xl font-semibold">Transacciones</h2>
              </div>
              <Button
                type="button"
                className="bg-expense px-4 py-2 text-surface"
                disabled
              >
                Nueva transacción
              </Button>
            </section>
            <TransactionTableSkeleton />
          </>
        )}

        {!isLoading && errorMessage && (
          <p className="text-sm text-danger">{errorMessage}</p>
        )}

        {!isLoading && !errorMessage && (
          <>
            <TransactionSummaryCards />

            <section className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                <h2 className="text-xl font-semibold text-center md:text-start">
                  Transacciones
                </h2>
                <TransactionFilters />
              </div>
              <Button
                type="button"
                className="bg-expense px-4 py-2 text-surface hover:scale-[1.01] active:scale-[0.98] mt-3 md:mt-0"
                onClick={openNewTransactionModal}
              >
                Nueva transacción
              </Button>
            </section>

            <TransactionTable transactions={filteredTransactions} />
          </>
        )}
      </div>

      <TransactionModal />
    </>
  );
}
