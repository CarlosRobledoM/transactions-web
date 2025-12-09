import { httpClient } from "@/lib/api/httpClient";
import type { AuthUser, LoginPayload } from "@/domain/auth/authTypes";

interface LoginResponse {
  user: AuthUser;
  token: string;
}

export function loginRequest(payload: LoginPayload) {
  return httpClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function logoutRequest() {
  return httpClient<{ success: boolean }>("/api/auth/logout", {
    method: "POST",
  });
}
