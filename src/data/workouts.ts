import type { Workout, WorkoutExercise } from "../types/workout";

export const workouts: Workout[] = [
  {
    id: 1,
    title: "Pecho y hombro",
    date: "2026-03-24",
    notes: "Buen entrenamiento, subiendo peso.",
    userId: 2,
  },
];

export const workoutExercises: WorkoutExercise[] = [
  {
    id: 1,
    workoutId: 1,
    exerciseId: 1,
    sets: 4,
    reps: 8,
    weight: 70,
  },
  {
    id: 2,
    workoutId: 1,
    exerciseId: 5,
    sets: 3,
    reps: 10,
    weight: 40,
  },
];