import { z } from "zod";
import type { TransactionType } from "@/domain/transactions/transactionTypes";
import { parseCurrencyInput } from "@/lib/utils/currency";

const transactionTypeValues: readonly TransactionType[] = [
  "income",
  "expense",
  "savings",
] as const;

export const transactionFormSchema = z.object({
  description: z
    .string()
    .min(1, "La descripción es obligatoria")
    .max(80, "Máximo 80 caracteres"),
  amount: z
    .string()
    .min(1, "El monto es obligatorio")
    .refine(
      (value) => parseCurrencyInput(value) > 0,
      "Ingresa un monto válido"
    ),
  type: z.enum(transactionTypeValues),
  date: z.string().min(1, "La fecha es obligatoria"),
});

export type TransactionFormValues = z.infer<typeof transactionFormSchema>;
