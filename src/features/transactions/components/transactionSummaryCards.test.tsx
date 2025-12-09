import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { TransactionSummaryCards } from "./transactionSummaryCards";
import { useTransactionsStore } from "@/lib/state/transactionStore";

describe("TransactionSummaryCards", () => {
  beforeEach(() => {
    useTransactionsStore.setState({
      transactions: [],
      isLoading: false,
      errorMessage: null,
      hasLoaded: true,
      fetchTransactions: async () => {},
      addTransaction: async () => {},
    });
  });

  it("shows totals calculated from transactions", () => {
    useTransactionsStore.setState((state) => ({
      ...state,
      transactions: [
        {
          id: "1",
          description: "Sueldo",
          amount: 1000,
          type: "income",
          date: "2024-04-01",
        },
        {
          id: "2",
          description: "Alquiler",
          amount: 400,
          type: "expense",
          date: "2024-04-02",
        },
        {
          id: "3",
          description: "Ahorro",
          amount: 100,
          type: "savings",
          date: "2024-04-03",
        },
      ],
    }));

    render(<TransactionSummaryCards />);

    const incomeText = screen.getByText((content) => content.includes("1.000"));
    const expenseText = screen.getByText((content) => content.includes("400"));
    const savingsText = screen.getByText((content) => content.includes("100"));

    expect(incomeText).toBeInTheDocument();
    expect(expenseText).toBeInTheDocument();
    expect(savingsText).toBeInTheDocument();
  });
});
