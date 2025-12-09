"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTransactions } from "../hooks/useTransactions";
import { TransactionForm } from "./transactionForm";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useAuthStore } from "@/lib/state/authStore";
import { RxExit } from "react-icons/rx";

interface EditTransactionClientProps {
  id: string;
}

export function EditTransactionClient({ id }: EditTransactionClientProps) {
  const router = useRouter();
  const { transactions, isLoading, errorMessage } = useTransactions();
  const { handleLogout, isLoggingOut } = useLogout();
  const user = useAuthStore((state) => state.user);

  const transaction = useMemo(
    () => transactions.find((item) => item.id === id),
    [transactions, id]
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-text-muted">Cargando transacción...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-danger">{errorMessage}</p>
        <Button type="button" onClick={() => router.push("/dashboard")}>
          Volver al dashboard
        </Button>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-danger">
          No se encontró la transacción solicitada.
        </p>
        <Button type="button" onClick={() => router.push("/dashboard")}>
          Volver al dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Editar transacción</h1>
          <p className="text-sm text-text-muted">
            Actualiza la información y guarda los cambios.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-brand/20 px-3 py-1 text-xs font-medium text-text-muted">
            {user?.name ?? "Usuario Demo"}
          </span>
          <Button
            type="button"
            variant="ghost"
            className="px-3 py-1 text-xs gap-2  "
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Cerrando..." : "Cerrar sesión"}
            <RxExit className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <section className="rounded-lg bg-surface p-6 shadow-soft">
        <TransactionForm
          mode="edit"
          initialTransaction={transaction}
          onSubmitSuccess={() => router.push("/dashboard")}
        />
      </section>

      <Button
        type="button"
        variant="ghost"
        onClick={() => router.push("/dashboard")}
      >
        Volver
      </Button>
    </div>
  );
}
