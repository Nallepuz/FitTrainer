export type AppRole = "admin" | "user";

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: AppRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
