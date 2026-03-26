import type { Exercise } from "../types/exercise";

export function filterExercisesBySearch(exercises: Exercise[], search: string) {
  return exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );
}

export function filterExercisesByMuscleGroup(
  exercises: Exercise[],
  muscleGroup: string
) {
  if (!muscleGroup || muscleGroup === "all") {
    return exercises;
  }

  return exercises.filter(
    (exercise) => exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase()
  );
}

export function sortExercises(exercises: Exercise[], order: string) {
  const copied = [...exercises];

  if (order === "az") {
    return copied.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (order === "za") {
    return copied.sort((a, b) => b.name.localeCompare(a.name));
  }

  return copied;
}