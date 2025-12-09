"use client";

import { useEffect } from "react";
import { useTransactionsStore } from "@/lib/state/transactionStore";

export function useTransactions() {
  const transactions = useTransactionsStore((state) => state.transactions);
  const isLoading = useTransactionsStore((state) => state.isLoading);
  const errorMessage = useTransactionsStore((state) => state.errorMessage);
  const fetchTransactions = useTransactionsStore(
    (state) => state.fetchTransactions
  );
  const addTransaction = useTransactionsStore((state) => state.addTransaction);
  const updateTransaction = useTransactionsStore(
    (state) => state.updateTransaction
  );

  useEffect(() => {
    void fetchTransactions();
  }, [fetchTransactions]);

  return {
    transactions,
    isLoading,
    errorMessage,
    addTransaction,
    updateTransaction,
  };
}
