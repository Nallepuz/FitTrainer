import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import type { Exercise } from "../types/exercise";
import ExerciseCard from "../components/ExerciseCard";
import "../pages/ExercisesPage.css";
import { useAuth } from "../context/authContext";
import { deleteExercise, getAllExercises } from "../service/exerciseService";

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscleGroup, setMuscleGroup] = useState("all");
  const [order, setOrder] = useState("az");
  const { user } = useAuth();

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

  async function handleDelete(id: number) {
    try {
      await deleteExercise(id);
      setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
    } catch (error) {
      console.error(error);
      setError("No se pudo borrar el ejercicio");
    }
  }

  useEffect(() => {
    async function loadExercises() {
      try {
        setLoading(true);
        setError("");
        const data = await getAllExercises();
        setExercises(data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar los ejercicios");
      } finally {
        setLoading(false);
      }
    }

    loadExercises();
  }, []);

  if (loading) {
    return <p>Cargando ejercicios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (filterByCategory.length === 0) {
    return (
      <>
        <h1>Ejercicios</h1>
        <div className="filters">
          <SearchBar search={search} setSearch={setSearch} />
          <Filter value={muscleGroup} setValue={setMuscleGroup} options={options} />
          <Filter value={order} setValue={setOrder} options={orderOptions} />
        </div>
        <p>No se encontraron ejercicios</p>
      </>
    );
  }

  return (
    <>
      <h1>Ejercicios</h1>
      <div className="filters">
        <SearchBar search={search} setSearch={setSearch} />
        <Filter value={muscleGroup} setValue={setMuscleGroup} options={options} />
        <Filter value={order} setValue={setOrder} options={orderOptions} />
      </div>

      <div className="exercise-grid">
        {sortedExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onDelete={handleDelete}
            showDeleteButton={user?.role === "trainer" || user?.role === "admin"}
          />
        ))}
      </div>
    </>
  );
}