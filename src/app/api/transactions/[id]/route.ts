import { NextResponse } from "next/server";
import type { Transaction } from "@/domain/transactions/transactionTypes";
import { findTransactionById, updateTransactionData } from "../data";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(_request: Request, { params }: RouteParams) {
  const transaction = findTransactionById(params.id);

  if (!transaction) {
    return NextResponse.json(
      { message: "Transacción no encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const body = (await request.json()) as Omit<Transaction, "id">;

  const updated = updateTransactionData(params.id, body);

  if (!updated) {
    return NextResponse.json(
      { message: "Transacción no encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}
