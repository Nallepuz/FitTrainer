import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter";
import type { Exercise } from "../types/exercise";
import ExerciseCard from "../components/ExerciseCard";
import "../pages/ExercisesPage.css"

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscleGroup, setMuscleGroup] = useState("all");
  const [order, setOrder] = useState("az")

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  const filterByCategory = filteredExercises.filter((exercise) => {
    if (muscleGroup === "all") {
      return true;
    }

    return exercise.muscleGroup.toLocaleLowerCase() === muscleGroup.toLocaleLowerCase();
  })

  const sortedExercises = [...filterByCategory]

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
    { value: "core", label: "Core" }
  ]

  const orderOptions = [
    { value: "az", label: "A-Z" },
    { value: "za", label: "Z-A" },
  ]

  useEffect(() => {
    fetch("http://localhost:8000/exercises").
      then((response) => response.json()).
      then((data) => {
        setExercises(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar los ejercicios");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Cargando ejercicios...</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  if (filterByCategory.length === 0) {
    return <p>No se encontraron ejercicios</p>;
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
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </>
  );
}