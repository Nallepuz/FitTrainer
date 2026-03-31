import type { WorkoutExercise } from "../types/workoutExercise";

const API_BASE_URL = "http://localhost:8000/workoutExercises";
const TOKEN_STORAGE_KEY = "auth_token";

export async function getWorkoutExercisesByWorkoutId(workoutId: number): Promise<WorkoutExercise[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("No se pudieron cargar los ejercicios del entrenamiento");
  }

  const data: WorkoutExercise[] = await response.json();
  return data.filter((item) => item.workoutId === workoutId);
}

export async function createWorkoutExercise(workoutId: number, exerciseId: number): Promise<WorkoutExercise> {
  const response = await fetch(API_BASE_URL , {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export async function updateWorkoutExerciseById(
  id: number,
  sets: number,
  reps: number,
  weight: number
): Promise<WorkoutExercise> {
  const response = await fetch(API_BASE_URL , {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
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

export async function deleteWorkoutExerciseById(id: number): Promise<void> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  const response = await fetch(API_BASE_URL , {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("No se pudo borrar el ejercicio del entrenamiento");
  }
}