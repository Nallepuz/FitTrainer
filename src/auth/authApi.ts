import type { AuthUser, LoginRequest, RegisterRequest } from "../types/auth";

const API_BASE_URL = "http://localhost:8000";
const TOKEN_STORAGE_KEY = "auth_token";

type LoginResponse = {
  token?: string;
  access_token?: string;
  jwt?: string;
};

// TOKEN

function extractToken(data: LoginResponse): string {
  const token = data.token ?? data.access_token ?? data.jwt;

  if (!token) {
    throw new Error("La API no devolvió token.");
  }

  return token;
}

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export async function loginRequest(payload: LoginRequest): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
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
  const response = await fetch(`${API_BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Token inválido o caducado.");
  }

  return (await response.json()) as AuthUser;
}