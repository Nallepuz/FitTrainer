import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function CreateWorkout() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [level, setLevel] = useState("Principiante");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = localStorage.getItem("auth_token");

        const newWorkout = {
            title,
            description,
            duration,
            level,
        };

        setError("");
        fetch("http://localhost:8000/workouts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(newWorkout),
        }).then((response) => {
                if (!response.ok){
                    throw new Error("Error al crear el entrenamiento");
                }
                return response.json();
            }).then(() => {
                navigate("/workouts");
            }).catch((error) => {
                setError("No se ha podido crear el entrenamiento");
            })
    }

    return (
        <>
            <h1>Crear Entrenamiento</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <h2>Título</h2>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                <h2>Descripción</h2>
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
                <h2>Duración</h2>
                <input type="text" value={duration} onChange={(event) => setDuration(event.target.value)} />
                <h2>Dificultad</h2>
                <select value={level} onChange={(event) => setLevel(event.target.value)}>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Experto">Experto</option>
                </select>
                <button type="submit">Crear</button>
            </form>
        </>
    );
}