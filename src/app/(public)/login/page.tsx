import Link from "next/link";
import { LoginForm } from "@/features/auth/components/loginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md rounded-lg bg-surface p-8 shadow-soft">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-dark">
          <span className="text-2xl font-semibold text-surface">▮▮▮</span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">FinTracker</h1>
          <p className="text-sm text-text-muted">
            Controla tus ingresos, gastos y ahorro en un solo lugar.
          </p>
        </div>
      </div>

      <LoginForm />

      <div className="mt-6 flex items-center justify-center gap-2 text-sm">
        <span className="h-px flex-1 bg-border-subtle" />
        <span className="text-xs text-text-muted">o</span>
        <span className="h-px flex-1 bg-border-subtle" />
      </div>

      <div className="mt-4 text-center text-sm">
        <Link href="#" className="font-medium text-brand-dark hover:underline">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}
