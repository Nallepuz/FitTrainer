import type { Exercise } from "../types/exercise";

// CONSTANTES
const API_BASE_URL = "http://localhost:8000/exercises";
const TOKEN_STORAGE_KEY = "auth_token";

// FUNCION AUXILIAR PARA OBTENER EL TOKEN
function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

// OBTENER TODOS LOS EJERCICIOS
export async function getAllExercises(): Promise<Exercise[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los ejercicios");
  }

  const data: Exercise[] = await response.json();
  return data;
}

// CREAR UN EJERCICIO
export async function createExercise(data: {
  name: string;
  image: string;
  muscleGroup: string;
  description: string;
}): Promise<void> {
  const token = getAuthToken();

  const response = await fetch(API_BASE_URL, {
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

// ELIMINAR UN EJERCICIO
export async function deleteExercise(id: number): Promise<void> {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el ejercicio");
  }
}