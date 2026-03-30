import type { User } from "../types/user";

const API_URL = "http://localhost:8000/users";
const TOKEN_STORAGE_KEY = "auth_token";

export async function getAllUsers(): Promise<User[]> {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    const response = await fetch(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    if (!response.ok) {
        throw new Error("No se pudieron cargar los usuarios");
    }

    const data: User[] = await response.json();
    return data;
}