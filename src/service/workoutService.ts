import type { Workout } from "../types/workout";

const API_URL = "http://localhost:8000/workouts";
const TOKEN_STORAGE_KEY = "auth_token";

export async function getAllWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los entrenamientos");
  }

  const data: Workout[] = await response.json();
  return data;
}

export async function createWorkout(data: {
  title: string;
  description: string;
  duration: string;
  level: string;
}): Promise<void> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("No se ha podido crear el entrenamiento");
  }
}

export async function deleteWorkout(id: number): Promise<void> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el entrenamiento");
  }
}