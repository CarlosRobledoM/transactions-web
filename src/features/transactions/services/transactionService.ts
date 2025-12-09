import { httpClient } from "@/lib/api/httpClient";
import type {
  NewTransactionInput,
  Transaction,
} from "@/domain/transactions/transactionTypes";

const baseUrl = "/api/transactions";

export function getTransactions() {
  return httpClient<Transaction[]>(baseUrl);
}

export function createTransaction(payload: NewTransactionInput) {
  return httpClient<Transaction>(baseUrl, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTransaction(id: string, payload: NewTransactionInput) {
  return httpClient<Transaction>(`${baseUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}
