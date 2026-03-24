import type { AppRole } from "./auth";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: AppRole;
}