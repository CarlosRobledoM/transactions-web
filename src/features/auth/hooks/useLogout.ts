"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutRequest } from "../services/authService";
import { useAuthStore } from "@/lib/state/authStore";
import { useToastStore } from "@/lib/state/toastStore";

export function useLogout() {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);
  const showToast = useToastStore((state) => state.showToast);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutRequest();
      clearSession();
      showToast({
        type: "info",
        message: "Sesión cerrada correctamente.",
      });
      router.push("/login");
    } catch {
      showToast({
        type: "error",
        message: "No fue posible cerrar sesión.",
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    handleLogout,
    isLoggingOut,
  };
}
