"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionFormSchema,
  type TransactionFormValues,
} from "@/lib/validation/transactionSchemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type {
  NewTransactionInput,
  Transaction,
  TransactionType,
} from "@/domain/transactions/transactionTypes";
import { parseCurrencyInput } from "@/lib/utils/currency";
import { cn } from "@/lib/utils/cn";
import { useTransactions } from "../hooks/useTransactions";
import { useToastStore } from "@/lib/state/toastStore";

interface TransactionFormProps {
  onSubmitSuccess: () => void;
  initialTransaction?: Transaction;
  mode?: "create" | "edit";
}

const typeOptions: Array<{ value: TransactionType; label: string }> = [
  { value: "income", label: "Ingreso" },
  { value: "expense", label: "Gasto" },
  { value: "savings", label: "Ahorro" },
];

export function TransactionForm({
  onSubmitSuccess,
  initialTransaction,
  mode = "create",
}: TransactionFormProps) {
  const showToast = useToastStore((state) => state.showToast);
  const { addTransaction, updateTransaction } = useTransactions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      description: initialTransaction?.description ?? "",
      amount: initialTransaction ? initialTransaction.amount.toString() : "",
      type: initialTransaction?.type ?? "expense",
      date: initialTransaction?.date ?? new Date().toISOString().slice(0, 10),
    },
  });

  useEffect(() => {
    if (initialTransaction) {
      reset({
        description: initialTransaction.description,
        amount: initialTransaction.amount.toString(),
        type: initialTransaction.type,
        date: initialTransaction.date,
      });
    }
  }, [initialTransaction, reset]);

  const currentType = useWatch({
    control,
    name: "type",
  });

  const onSubmit = async (values: TransactionFormValues) => {
    setIsSubmitting(true);

    const payload: NewTransactionInput = {
      description: values.description,
      type: values.type,
      date: values.date,
      amount: parseCurrencyInput(values.amount),
    };

    try {
      if (mode === "edit" && initialTransaction) {
        await updateTransaction(initialTransaction.id, payload);
        showToast({
          type: "success",
          message: "Transacción actualizada correctamente.",
        });
      } else {
        await addTransaction(payload);
        showToast({
          type: "success",
          message: "Transacción creada correctamente.",
        });
        reset({
          description: "",
          amount: "",
          type: "expense",
          date: values.date,
        });
      }

      onSubmitSuccess();
    } catch {
      showToast({
        type: "error",
        message:
          mode === "edit"
            ? "No fue posible actualizar la transacción."
            : "No fue posible crear la transacción.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        {typeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              setValue("type", option.value, { shouldValidate: true })
            }
            className={cn(
              "flex-1 rounded-pill border px-3 py-1 text-xs font-medium transition-colors",
              currentType === option.value
                ? "border-transparent bg-brand-dark text-surface"
                : "border-border-subtle bg-bg text-text-muted hover:bg-surface"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-text-main"
        >
          Descripción
        </label>
        <Input
          id="description"
          placeholder="Alquiler, sueldo, cena..."
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-danger">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-text-main"
        >
          Monto
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-text-muted">
            $
          </span>
          <Input
            id="amount"
            placeholder="1.200.000"
            className="pl-7"
            {...register("amount")}
          />
        </div>
        {errors.amount && (
          <p className="mt-1 text-xs text-danger">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-text-main"
        >
          Fecha
        </label>
        <Input id="date" type="date" {...register("date")} />
        {errors.date && (
          <p className="mt-1 text-xs text-danger">{errors.date.message}</p>
        )}
      </div>

      <div className="mt-4 flex justify-end gap-3">
        <Button type="submit" className="px-6 py-2" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "edit"
              ? "Guardando cambios..."
              : "Guardando..."
            : mode === "edit"
            ? "Guardar cambios"
            : "Guardar"}
        </Button>
      </div>
    </form>
  );
}
