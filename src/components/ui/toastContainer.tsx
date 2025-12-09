"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useToastStore } from "@/lib/state/toastStore";
import { cn } from "@/lib/utils/cn";

export function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-60 flex justify-center md:justify-end md:pr-6">
      <div className="flex max-w-md flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              className={cn(
                "pointer-events-auto rounded-md px-4 py-3 text-sm text-surface shadow-soft",
                toast.type === "success" && "bg-income",
                toast.type === "error" && "bg-danger",
                toast.type === "info" && "bg-brand-dark"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span>{toast.message}</span>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="text-lg leading-none text-surface/80 hover:text-surface"
                  aria-label="Cerrar notificación"
                >
                  x
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
