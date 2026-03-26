import { useEffect, useMemo, useState } from "react";
import type { Exercise } from "../types/exercise";
import { getExercises } from "../utils/exerciseApi";
import {
  filterExercisesByMuscleGroup,
  filterExercisesBySearch,
  sortExercises,
} from "../utils/exerciseUtils";

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("all");
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        setError("No se pudieron cargar los ejercicios.");
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  const filteredExercises = useMemo(() => {
    let result = exercises;

    result = filterExercisesBySearch(result, search);
    result = filterExercisesByMuscleGroup(result, muscleGroup);
    result = sortExercises(result, sortOrder);

    return result;
  }, [exercises, search, muscleGroup, sortOrder]);

  if (loading) {
    return <p>Cargando ejercicios...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Ejercicios</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar ejercicio"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="pecho">Pecho</option>
          <option value="espalda">Espalda</option>
          <option value="pierna">Pierna</option>
          <option value="biceps">Bíceps</option>
          <option value="triceps">Tríceps</option>
          <option value="hombro">Hombro</option>
          <option value="core">Core</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="az">Nombre A-Z</option>
          <option value="za">Nombre Z-A</option>
        </select>
      </div>

      {filteredExercises.length === 0 ? (
        <p>No hay ejercicios que coincidan.</p>
      ) : (
        <ul>
          {filteredExercises.map((exercise) => (
            <li key={exercise.id} style={{ marginBottom: "12px" }}>
              <strong>{exercise.name}</strong> - {exercise.muscleGroup}
              <p>{exercise.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}