import { create } from "zustand";
import type {
  NewTransactionInput,
  Transaction,
} from "@/domain/transactions/transactionTypes";
import {
  getTransactions,
  createTransaction,
  updateTransaction as updateTransactionRequest,
} from "@/features/transactions/services/transactionService";

interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  errorMessage: string | null;
  hasLoaded: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (input: NewTransactionInput) => Promise<void>;
  updateTransaction: (id: string, input: NewTransactionInput) => Promise<void>;
}

export const useTransactionsStore = create<TransactionsState>((set, get) => ({
  transactions: [],
  isLoading: false,
  errorMessage: null,
  hasLoaded: false,
  async fetchTransactions() {
    const { hasLoaded } = get();
    if (hasLoaded) {
      return;
    }

    try {
      set({ isLoading: true, errorMessage: null });
      const data = await getTransactions();
      set({
        transactions: data,
        hasLoaded: true,
      });
    } catch {
      set({
        errorMessage: "No fue posible cargar las transacciones.",
      });
    } finally {
      set({ isLoading: false });
    }
  },
  async addTransaction(input) {
    try {
      set({ errorMessage: null });
      const created = await createTransaction(input);
      set((state) => ({
        transactions: [created, ...state.transactions],
      }));
    } catch (error) {
      set({
        errorMessage: "No fue posible crear la transacción.",
      });
      throw error;
    }
  },
  async updateTransaction(id, input) {
    try {
      set({ errorMessage: null });
      const updated = await updateTransactionRequest(id, input);
      set((state) => ({
        transactions: state.transactions.map((transaction) =>
          transaction.id === id ? updated : transaction
        ),
      }));
    } catch (error) {
      set({
        errorMessage: "No fue posible actualizar la transacción.",
      });
      throw error;
    }
  },
}));
