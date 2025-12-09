import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...restProps
}: ButtonProps) {
  const baseClasses =
    "px-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 disabled:cursor-not-allowed disabled:opacity-60";
  const variantClasses =
    variant === "primary"
      ? "bg-brand-dark text-surface hover:scale-[1.01] hover:shadow-soft active:scale-[0.98]"
      : "bg-transparent text-brand-dark hover:bg-brand/10";

  return (
    <button
      className={cn(baseClasses, variantClasses, className)}
      {...restProps}
    >
      {children}
    </button>
  );
}
