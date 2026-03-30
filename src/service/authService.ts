import type { AuthUser, LoginRequest, RegisterRequest } from "../types/auth";

type LoginResponse = {
  token?: string;
  access_token?: string;
  jwt?: string;
};

function extractToken(data: LoginResponse): string {
  const token = data.token ?? data.access_token ?? data.jwt;

  if (!token) {
    throw new Error("La API no devolvió token.");
  }

  return token;
}

export function saveToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function clearToken(): void {
  localStorage.removeItem("auth_token");
}

export async function loginRequest(payload: LoginRequest): Promise<string> {
  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Credenciales incorrectas.");
  }

  const data = (await response.json()) as LoginResponse;
  return extractToken(data);
}

export async function registerRequest(payload: RegisterRequest): Promise<string> {
  const response = await fetch("http://localhost:8000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar el usuario.");
  }

  const data = (await response.json()) as LoginResponse;
  return extractToken(data);
}

export async function meRequest(token: string): Promise<AuthUser> {
  const response = await fetch("http://localhost:8000/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Token inválido o caducado.");
  }

  return (await response.json()) as AuthUser;
}