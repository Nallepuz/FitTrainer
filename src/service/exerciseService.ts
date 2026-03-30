import type { Exercise } from "../types/exercise";

const API_URL = "http://localhost:8000/exercises";
const TOKEN_STORAGE_KEY = "auth_token";

export async function getAllExercises(): Promise<Exercise[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los ejercicios");
  }

  const data: Exercise[] = await response.json();
  return data;
}

export async function createExercise(data: {
  name: string;
  image: string;
  muscleGroup: string;
  description: string;
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
    throw new Error("No se ha podido crear el ejercicio");
  }
}

export async function deleteExercise(id: number): Promise<void> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el ejercicio");
  }
}