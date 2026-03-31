import type { Workout } from "../types/workout";

// CONSTANTES
const API_BASE_URL = "http://localhost:8000/workouts";
const TOKEN_STORAGE_KEY = "auth_token";

// FUNCION AUXILIAR PARA OBTENER EL TOKEN
function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

// OBTENER TODOS LOS WORKOUTS
export async function getAllWorkouts(): Promise<Workout[]> {
  const token = getAuthToken();

  const response = await fetch(API_BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudieron cargar los entrenamientos");
  }

  const data: Workout[] = await response.json();
  return data;
}

// OBTENER UN WORKOUT POR ID
export async function getWorkoutById(id: number): Promise<Workout> {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo cargar el entrenamiento");
  }

  const workout: Workout = await response.json();
  return workout;
}

// CREAR UN WORKOUT
export async function createWorkout(data: {
  title: string;
  description: string;
  duration: number;
  level: string;
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
    throw new Error("No se ha podido crear el entrenamiento");
  }
}

// ELIMINAR UN WORKOUT
export async function deleteWorkout(id: number): Promise<void> {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el entrenamiento");
  }
}