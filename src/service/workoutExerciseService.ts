import type { WorkoutExercise } from "../types/workoutExercise";

// URL Y TOKEN
const API_BASE_URL = "http://localhost:8000";
const TOKEN_STORAGE_KEY = "auth_token";

// FUNCION AUXILIAR PARA OBTENER EL TOKEN
function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

// OBTENER LOS EJERCICIOS DE UN WORKOUT
export async function getWorkoutExercisesByWorkoutId(workoutId: number): Promise<WorkoutExercise[]> {
  const response = await fetch(`${API_BASE_URL}/workoutExercises`);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los ejercicios del entrenamiento");
  }

  const data: WorkoutExercise[] = await response.json();
  return data.filter((item) => item.workoutId === workoutId);
}

// AÑADIR UN EJERCICIO A UN WORKOUT
export async function createWorkoutExercise(workoutId: number, exerciseId: number): Promise<WorkoutExercise> {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/workoutExercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      workoutId,
      exerciseId,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo añadir el ejercicio al entrenamiento");
  }

  return response.json();
}

// ACTUALIZAR UN EJERCICIO DE UN WORKOUT
export async function updateWorkoutExerciseById(
  id: number,
  sets: number,
  reps: number,
  weight: number
): Promise<WorkoutExercise> {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/workoutExercises/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      sets,
      reps,
      weight,
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo actualizar el ejercicio del entrenamiento");
  }

  return response.json();
}

// BORRAR UN EJERCICIO DE UN WORKOUT
export async function deleteWorkoutExerciseById(id: number): Promise<void> {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}/workoutExercises/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el ejercicio del entrenamiento");
  }
}