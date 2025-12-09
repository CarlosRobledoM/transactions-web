"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormValues,
} from "@/lib/validation/authSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const { handleLogin, isSubmitting, errorMessage } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    void handleLogin(values);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-text-main"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-danger">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-text-main"
        >
          Password
        </label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && (
          <p className="mt-1 text-xs text-danger">{errors.password.message}</p>
        )}
        <div className="mt-1 flex justify-end">
          <button
            type="button"
            className="text-xs font-medium text-brand-dark hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>

      {errorMessage && <p className="text-sm text-danger">{errorMessage}</p>}

      <Button
        type="submit"
        className="mt-4 w-full py-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Ingresando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
