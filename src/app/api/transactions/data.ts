import type { Transaction } from "@/domain/transactions/transactionTypes";

let transactions: Transaction[] = [
  {
    id: "1",
    description: "Freelance",
    amount: 1200000,
    type: "income",
    date: "2024-04-15",
  },
  {
    id: "2",
    description: "Alquiler",
    amount: 1200000,
    type: "expense",
    date: "2024-04-12",
  },
  {
    id: "3",
    description: "Cena",
    amount: 75000,
    type: "expense",
    date: "2024-04-10",
  },
  {
    id: "4",
    description: "Ahorro mensual",
    amount: 100000,
    type: "savings",
    date: "2024-04-08",
  },
  {
    id: "5",
    description: "Supermercado",
    amount: 150000,
    type: "expense",
    date: "2024-04-05",
  },
  {
    id: "6",
    description: "Sueldo",
    amount: 1300000,
    type: "income",
    date: "2024-04-02",
  },
  {
    id: "7",
    description: "Depósito ahorro",
    amount: 100000,
    type: "savings",
    date: "2024-04-01",
  },
];

export function getTransactionsData() {
  return transactions;
}

export function addTransactionData(newTransaction: Transaction) {
  transactions = [newTransaction, ...transactions];
}

export function findTransactionById(id: string) {
  return transactions.find((transaction) => transaction.id === id) ?? null;
}

export function updateTransactionData(
  id: string,
  payload: Omit<Transaction, "id">
) {
  let updated: Transaction | null = null;

  transactions = transactions.map((transaction) => {
    if (transaction.id === id) {
      updated = {
        ...transaction,
        ...payload,
      };
      return updated;
    }
    return transaction;
  });

  return updated;
}
