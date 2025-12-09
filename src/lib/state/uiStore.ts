import { create } from "zustand";
import type { TransactionType } from "@/domain/transactions/transactionTypes";

type TransactionFilter = "all" | TransactionType;

interface UiState {
  isNewTransactionModalOpen: boolean;
  openNewTransactionModal: () => void;
  closeNewTransactionModal: () => void;
  transactionFilter: TransactionFilter;
  setTransactionFilter: (filter: TransactionFilter) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isNewTransactionModalOpen: false,
  openNewTransactionModal: () => set({ isNewTransactionModalOpen: true }),
  closeNewTransactionModal: () => set({ isNewTransactionModalOpen: false }),
  transactionFilter: "all",
  setTransactionFilter: (filter) => set({ transactionFilter: filter }),
}));
