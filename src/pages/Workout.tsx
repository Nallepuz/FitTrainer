import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import type { Workout as WorkoutType } from "../types/workout";

export default function Workout() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

    const filterWorkouts = workouts.filter((workout) =>                                 // recorre todo el array y busca por title
        workout.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()));        // solo los que incluyan el valor de search

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

    if (loading) {
        return <p>Cargando entrenamientos...</p>
    }
    if (error) {
        return <p>{error}</p>
    }
    if (filterWorkouts.length === 0) {
        return <p>No se encontraron entrenamientos</p>;
    }

    return (
        <>
            <h1>Workout</h1>
            <SearchBar search={search} setSearch={setSearch} />
            {filterWorkouts.map((workout) => (
                <div key={workout.id}>
                    <h2>{workout.title}</h2>
                    <p>{workout.description}</p>
                    <p>{workout.duration}</p>
                    <p>{workout.level}</p>
                </div>
            ))}
        </>
    );
}