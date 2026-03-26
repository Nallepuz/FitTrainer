import type { Exercise } from "../types/exercise";

const API_BASE_URL = "http://localhost:8000";

export async function getExercises(): Promise<Exercise[]> {
  const response = await fetch(`${API_BASE_URL}/exercises`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los ejercicios.");
  }

  return (await response.json()) as Exercise[];
}