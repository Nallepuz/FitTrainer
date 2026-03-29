import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import type { Workout as WorkoutType } from "../types/workout";
import Filter from "../components/Filter";
import "../pages/Workout.css"
import WorkoutCard from "../components/WorkoutCard";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

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


    const filterWorkouts = visibleWorkouts.filter((workout) =>                                 // recorre todo el array y busca por title
        workout.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));               // solo los que incluyan el valor de search

    const filterByLevel = filterWorkouts.filter((workout) => {
        if (level === "all") {
            return true
        }
        return workout.level.toLocaleLowerCase() === level.toLocaleLowerCase();
    })

    const options = [
        { value: "all", label: "Todos" },
        { value: "Principiante", label: "Principiante" },
        { value: "Intermedio", label: "Intermedio" },
        { value: "Experto", label: "Experto" },
    ]

    useEffect(() => {
        fetch("http://localhost:8000/workouts").
            then((response) => response.json()).
            then((data) => {
                setWorkouts(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar los entrenamientos");
                setLoading(false);
            });
    }, []);

    if (loadingSession) {
        return <p>Cargando sesión...</p>;
    }
    if (loading) {
        return <p>Cargando entrenamientos...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (filterByLevel.length === 0) {
        return(
        <>
            <p>No se encontraron entrenamientos</p>
            <Link to="/workouts/new" className="button">
                Crear Entrenamiento
            </ Link>
        </>);
    }

    return (
        <>
            <h1>Workout</h1>
            <div className="filters">
                <SearchBar search={search} setSearch={setSearch} />
                <Filter value={level} setValue={setLevel} options={options} />
            </div>
            <Link to="/workouts/new" className="button" >
                Crear Entrenamiento
            </ Link>
            <div className="workout-grid">
                {filterByLevel.map((workout) => (
                    <WorkoutCard key={workout.id} workout={workout} />
                ))}
            </div>
        </>
    );
}