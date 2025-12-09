import { NextResponse } from "next/server";
import type {
  NewTransactionInput,
  Transaction,
} from "@/domain/transactions/transactionTypes";
import { randomUUID } from "crypto";
import { addTransactionData, getTransactionsData } from "./data";

export async function GET() {
  return NextResponse.json(getTransactionsData());
}

export async function POST(request: Request) {
  const body = (await request.json()) as NewTransactionInput;

  const newTransaction: Transaction = {
    id: randomUUID(),
    ...body,
  };

  addTransactionData(newTransaction);

  return NextResponse.json(newTransaction, { status: 201 });
}
