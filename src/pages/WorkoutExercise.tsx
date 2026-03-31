import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import type { Exercise } from "../types/exercise";
import ExerciseCard from "../components/ExerciseCard";
import "../pages/WorkoutExercise.css";
import type { WorkoutExercise as WorkoutExerciseType } from "../types/workoutExercise";
import type { Workout } from "../types/workout";
import WorkoutExerciseItem from "../components/WorkoutExerciseItem";
import { getAllExercises } from "../service/exerciseService";
import { getWorkoutById } from "../service/workoutService";
import {
  createWorkoutExercise,
  deleteWorkoutExerciseById,
  getWorkoutExercisesByWorkoutId,
  updateWorkoutExerciseById,
} from "../service/workoutExerciseService";

export default function WorkoutExercise() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscleGroup, setMuscleGroup] = useState("all");
  const [order, setOrder] = useState("az");
  const { id } = useParams();
  const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExerciseType[]>([]);

  const workoutId = Number(id);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(search.toLowerCase())
  );

  const filterByCategory = filteredExercises.filter((exercise) => {
    if (muscleGroup === "all") {
      return true;
    }

    return exercise.muscleGroup.toLowerCase() === muscleGroup.toLowerCase();
  });

  const sortedExercises = [...filterByCategory];

  if (order === "az") {
    sortedExercises.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (order === "za") {
    sortedExercises.sort((a, b) => b.name.localeCompare(a.name));
  }

  const options = [
    { value: "all", label: "Todos" },
    { value: "pecho", label: "Pecho" },
    { value: "espalda", label: "Espalda" },
    { value: "pierna", label: "Pierna" },
    { value: "biceps", label: "Biceps" },
    { value: "triceps", label: "Triceps" },
    { value: "hombro", label: "Hombro" },
    { value: "core", label: "Core" },
  ];

  const orderOptions = [
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
  ];

  async function loadWorkoutExercises() {
    const data = await getWorkoutExercisesByWorkoutId(workoutId);
    setWorkoutExercises(data);
  }

  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);
        setError("");
        setActionError("");

        const [workoutData, exercisesData, workoutExercisesData] = await Promise.all([
          getWorkoutById(workoutId),
          getAllExercises(),
          getWorkoutExercisesByWorkoutId(workoutId),
        ]);

        setCurrentWorkout(workoutData);
        setExercises(exercisesData);
        setWorkoutExercises(workoutExercisesData);
      } catch (error) {
        console.error(error);
        setError("Error al cargar los datos del entrenamiento");
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [workoutId]);

  async function addExercise(exercise: Exercise) {
    try {
      setActionError("");
  
      const alreadyExists = workoutExercises.some(
        (item) => item.exerciseId === exercise.id
      );
  
      if (alreadyExists) {
        setActionError("Ese ejercicio ya está añadido al entrenamiento");
        return;
      }
  
      await createWorkoutExercise(workoutId, exercise.id);
      await loadWorkoutExercises();
    } catch (error) {
      console.error(error);
      setActionError("No se pudo añadir el ejercicio al entrenamiento");
    }
  }

  async function updateWorkoutExercise(id: number, sets: number, reps: number, weight: number) {
    try {
      setActionError("");
      await updateWorkoutExerciseById(id, sets, reps, weight);
      await loadWorkoutExercises();
    } catch (error) {
      console.error(error);
      setActionError("No se pudo actualizar el ejercicio del entrenamiento");
    }
  }

  async function handleDelete(id: number) {
    try {
      setActionError("");
      await deleteWorkoutExerciseById(id);
      setWorkoutExercises((prev) => prev.filter((workoutExercise) => workoutExercise.id !== id));
    } catch (error) {
      console.error(error);
      setActionError("No se pudo borrar el ejercicio del entrenamiento");
    }
  }

  if (loading) {
    return <p>Cargando ejercicios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <h1>Configura tu entrenamiento</h1>
      <h2>{currentWorkout?.title}</h2>

      {actionError && <p>{actionError}</p>}

      <div className="exerciseList">
        {workoutExercises.length > 0 ? (
          workoutExercises.map((workoutExercise) => {
            const exercise = exercises.find(
              (exercise) => exercise.id === workoutExercise.exerciseId
            );

            return (
              <WorkoutExerciseItem
                key={workoutExercise.id}
                workoutExercise={workoutExercise}
                onDelete={handleDelete}
                exerciseName={exercise?.name || "Ejercicio desconocido"}
                onSave={updateWorkoutExercise}
              />
            );
          })
        ) : (
          <p>Este entrenamiento todavía no tiene ejercicios añadidos.</p>
        )}
      </div>

      <div>Mi Lista</div>

      <div>
        <div className="filters">
          <SearchBar search={search} setSearch={setSearch} />
          <Filter value={muscleGroup} setValue={setMuscleGroup} options={options} />
          <Filter value={order} setValue={setOrder} options={orderOptions} />
        </div>

        <div className="exerciseList">
          {sortedExercises.length > 0 ? (
            sortedExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                showAddButton={true}
                onAdd={addExercise}
              />
            ))
          ) : (
            <p>No se encontraron ejercicios</p>
          )}
        </div>
      </div>
    </>
  );
}