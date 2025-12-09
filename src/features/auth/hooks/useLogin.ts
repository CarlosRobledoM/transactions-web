"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginRequest } from "../services/authService";
import { useAuthStore } from "@/lib/state/authStore";
import type { LoginFormValues } from "@/lib/validation/authSchemas";
import { useToastStore } from "@/lib/state/toastStore";

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const showToast = useToastStore((state) => state.showToast);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const response = await loginRequest(values);
      setSession(response.user, response.token);

      showToast({
        type: "success",
        message: "Bienvenido a FinTracker.",
      });

      router.push("/dashboard");
    } catch {
      setErrorMessage("Credenciales inválidas. Intenta nuevamente.");
      showToast({
        type: "error",
        message: "No fue posible iniciar sesión.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    errorMessage,
    handleLogin,
  };
}
