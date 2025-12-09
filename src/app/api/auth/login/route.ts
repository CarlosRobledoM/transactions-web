import { NextResponse } from "next/server";
import type { LoginPayload } from "@/domain/auth/authTypes";

const validEmail = "demo@fintracker.com";
const validPassword = "fintracker123";

export async function POST(request: Request) {
  const body = (await request.json()) as LoginPayload;

  if (body.email !== validEmail || body.password !== validPassword) {
    return NextResponse.json(
      { message: "Credenciales inválidas" },
      { status: 401 }
    );
  }

  const token = "mock-token-123";

  const response = NextResponse.json({
    user: {
      id: "1",
      email: validEmail,
      name: "Usuario Demo",
    },
    token,
  });

  response.cookies.set("fintracker-token", token, {
    path: "/",
    httpOnly: true,
  });

  return response;
}
