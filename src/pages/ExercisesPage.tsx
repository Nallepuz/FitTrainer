import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar"
import Filter from "../components/Filter";
import type { Exercise } from "../types/exercise";

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscleGroup, setMuscleGroup] = useState("all");

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  const filterByCategory = filteredExercises.filter((exercise) => {
    if (muscleGroup === "all") {
      return true;
    }

    return exercise.muscleGroup.toLocaleLowerCase() === muscleGroup.toLocaleLowerCase();
  })

  const options = [
    {value: "all", label: "All"},
    {value: "pecho", label: "Chest"},
    {value: "espalda", label: "Back"},
    {value: "pierna", label: "Legs"},
    {value: "biceps", label: "Biceps"},
    {value: "triceps", label: "Triceps"},
    {value: "hombro", label: "Shoulder"},
    {value: "core", label: "Core"}
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
      <SearchBar search={search} setSearch={setSearch} />
      <Filter value={muscleGroup} setValue={setMuscleGroup} options={options}/>
      {filterByCategory.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <p>{exercise.muscleGroup}</p>
          <p>{exercise.description}</p>
        </div>
      ))}
    </>
  );
}