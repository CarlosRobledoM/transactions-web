export type TransactionType = 'income' | 'expense' | 'savings';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export type NewTransactionInput = Omit<Transaction, 'id'>;
