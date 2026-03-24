import type { User } from "../types/user";

export const users: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@fittrainer.com",
    password: "1234",
    role: "admin",
  },
  {
    id: 2,
    name: "Nestor",
    email: "nestor@fittrainer.com",
    password: "1234",
    role: "user",
  },
];