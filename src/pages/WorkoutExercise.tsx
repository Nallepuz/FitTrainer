import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import type { Exercise } from "../types/exercise";
import ExerciseCard from "../components/ExerciseCard";
import "../pages/WorkoutExercise.css"
import type { WorkoutExercise } from "../types/workoutExercise";
import type { Workout } from "../types/workout";
import WorkoutExerciseItem from "../components/WorkoutExerciseItem";

export default function WorkoutExercise() {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [exercises, setExercises] = useState<Exercise[]>([]);                     // Listar Ejercicios
    const [muscleGroup, setMuscleGroup] = useState("all");
    const [order, setOrder] = useState("az");
    const { id } = useParams();
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);     // Listar Ejercicios Entrenamiento
    const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);  // Añadir Ejercicio a Entrenamiento

    const workoutId = Number(id);

    // COMPONENTES DE BÚSQUEDA-----------------------------------------------------------------------
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

    // PARA OBTENER ID WORKOUT----------------------------------------------------------------------
    useEffect(() => {
        fetch("http://localhost:8000/workouts")
            .then((response) => response.json())
            .then((data) => {
                const foundWorkout = data.find((workout: Workout) => workout.id === workoutId);
                setCurrentWorkout(foundWorkout || null);
            });
    }, [workoutId]);

    // PARA CARGAR EJERCICIOS DEL WORKOUT ACTUAL----------------------------------------------------
    function loadExercises() {
        fetch("http://localhost:8000/workoutExercises").
            then((response) => response.json()).
            then((data) => {
                const filteredWorkoutExercises = data.filter((item: WorkoutExercise) => item.workoutId === workoutId);
                setWorkoutExercises(filteredWorkoutExercises);
                setLoading(false);
            }).
            catch(() => {
                setError("Error al cargar el ejercicio");
                setLoading(false);
            });
    }

    useEffect(() => {
        loadExercises();
    }, []);

    function addExercise(exercise: Exercise) {
        console.log(workoutId, exercise.id);
        fetch("http://localhost:8000/workoutExercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, body: JSON.stringify({
                workoutId: workoutId,
                exerciseId: exercise.id
            })
        });
        loadExercises();
    }

    // PATA VISUALIZAR EJERCICIOS PARA AÑADIR-------------------------------------------------------
    useEffect(() => {
        fetch("http://localhost:8000/exercises").
            then((response) => response.json()).
            then((data) => {
                setExercises(data);
                setLoading(false);
                console.log(id);
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
        return (
            <>
                <h1>Ejercicios</h1>
                <div className="filters">
                    <SearchBar search={search} setSearch={setSearch} />
                    <Filter value={muscleGroup} setValue={setMuscleGroup} options={options} />
                    <Filter value={order} setValue={setOrder} options={orderOptions} />
                </div>
                <p>No se encontraron ejercicios</p>
            </>);
    }
    // --------------------------------------------------------------------------------------------

    return (
        <>
            <h1> Configura tu entrenamiento</h1>
            <h2>{currentWorkout?.title}</h2>
            <div className="exerciseList">
                {workoutExercises.map((workoutExercise) => {
                    const exercise = exercises.find(
                        (exercise) => exercise.id === workoutExercise.exerciseId);
                    return (
                        <WorkoutExerciseItem key={workoutExercise.id} workoutExercise={workoutExercise} exerciseName={exercise?.name || "Ejercicio desconocido"} />
                    );
                })}

            </div>
            <div>
                Mi Lista
            </div>
            <div>
                <div className="filters">
                    <SearchBar search={search} setSearch={setSearch} />
                    <Filter value={muscleGroup} setValue={setMuscleGroup} options={options} />
                    <Filter value={order} setValue={setOrder} options={orderOptions} />
                </div>
                <div className="exerciseList">
                    {sortedExercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} showAddButton={true} onAdd={addExercise} />
                    ))}
                </div>
            </div>
        </>
    )
}