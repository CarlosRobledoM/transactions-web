import { create } from "zustand";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  showToast: (options: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

function createToastId() {
  return Math.random().toString(36).slice(2);
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: ({ message, type }) => {
    const id = createToastId();

    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
