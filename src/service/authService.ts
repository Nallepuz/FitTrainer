import type { AuthUser, LoginRequest, RegisterRequest } from "../types/auth";

// TIPOS DE RESPUESTA DEL LOGIN / REGISTER
type LoginResponse = {
  token?: string;
  access_token?: string;
  jwt?: string;
};

// URL Y TOKEN
const API_BASE_URL = "http://localhost:8000/auth";
const TOKEN_STORAGE_KEY = "auth_token";

// FUNCION PARA EXTRAER EL TOKEN
function extractToken(data: LoginResponse): string {
  const token = data.token ?? data.access_token ?? data.jwt;

  if (!token) {
    throw new Error("La API no devolvió token.");
  }

  return token;
}

// GUARDAR / VER / BORRAR TOKEN EN LOCALSTORAGE
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

// PETICION DE LOGIN
export async function loginRequest(payload: LoginRequest): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/login`, {
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

// PETICION DE REGISTRO
export async function registerRequest(payload: RegisterRequest): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/register`, {
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

// PETICION PARA OBTENER EL USUARIO AUTENTICADO
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