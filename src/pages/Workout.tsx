import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import type { Workout as WorkoutType } from "../types/workout";
import Filter from "../components/Filter";
import "../pages/Workout.css";
import WorkoutCard from "../components/WorkoutCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { deleteWorkout, getAllWorkouts } from "../service/workoutService";

export default function Workout() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [level, setLevel] = useState("all");
  const { user, loadingSession } = useAuth();

  let visibleWorkouts: WorkoutType[] = [];

  if (!user) {
    visibleWorkouts = [];
  } else if (user.role === "admin" || user.role === "trainer") {
    visibleWorkouts = workouts;
  } else {
    visibleWorkouts = workouts.filter((workout) => workout.userId === user.id);
  }

  const filterWorkouts = visibleWorkouts.filter((workout) =>
    workout.title.toLowerCase().includes(search.toLowerCase())
  );

  const filterByLevel = filterWorkouts.filter((workout) => {
    if (level === "all") {
      return true;
    }

    return workout.level.toLowerCase() === level.toLowerCase();
  });

  const options = [
    { value: "all", label: "Todos" },
    { value: "Principiante", label: "Principiante" },
    { value: "Intermedio", label: "Intermedio" },
    { value: "Experto", label: "Experto" },
  ];

  async function handleDelete(id: number) {
    try {
      await deleteWorkout(id);
      setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
    } catch (error) {
      console.error(error);
      setError("No se pudo borrar el entrenamiento");
    }
  }

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError("");
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
        setError("Error al cargar los entrenamientos");
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loadingSession) {
    return <p>Cargando sesión...</p>;
  }

  if (loading) {
    return <p>Cargando entrenamientos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (filterByLevel.length === 0) {
    return (
      <>
        <h1>Workout</h1>
        <div className="filters">
          <SearchBar search={search} setSearch={setSearch} />
          <Filter value={level} setValue={setLevel} options={options} />
        </div>
        <Link to="/workouts/new" className="button">
          Crear Entrenamiento
        </Link>
        <p>No se encontraron entrenamientos</p>
      </>
    );
  }

  return (
    <>
      <h1>Workout</h1>

      <div className="filters">
        <SearchBar search={search} setSearch={setSearch} />
        <Filter value={level} setValue={setLevel} options={options} />
      </div>

      <Link to="/workouts/new" className="button">
        Crear Entrenamiento
      </Link>

      <div className="workout-grid">
        {filterByLevel.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            onDelete={handleDelete}
            showDeleteButton={user?.role === "trainer" || user?.role === "admin" || user?.role === "user"}
          />
        ))}
      </div>
    </>
  );
}