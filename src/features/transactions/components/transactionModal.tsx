"use client";

import { Modal } from "@/components/ui/modal";
import { useUiStore } from "@/lib/state/uiStore";
import { TransactionForm } from "./transactionForm";

export function TransactionModal() {
  const isOpen = useUiStore((state) => state.isNewTransactionModalOpen);
  const closeModal = useUiStore((state) => state.closeNewTransactionModal);

  return (
    <Modal isOpen={isOpen} title="Nueva transacción" onClose={closeModal}>
      <TransactionForm mode="create" onSubmitSuccess={closeModal} />
    </Modal>
  );
}
