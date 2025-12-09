import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

// interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({
  className,
  ...restProps
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "mt-1 w-full rounded-md border border-border-subtle bg-surface px-3 py-2 text-sm outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand/40",
        className
      )}
      {...restProps}
    />
  );
}
