import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import type { Exercise } from "../types/exercise";

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));

  useEffect(() => {
    fetch("http://localhost:8000/exercises").
      then((response) => response.json()).
      then((data) => {
        setExercises(data);
      });
  }, []);

  return (
    <>
      <h1>Ejercicios</h1>
      <SearchBar search={search} setSearch={setSearch} />
      {filteredExercises.map((exercise) => (
        <div key={exercise.id}>
          <h2>{exercise.name}</h2>
          <p>{exercise.muscleGroup}</p>
          <p>{exercise.description}</p>
        </div>
      ))}
    </>
  );
}