import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateWorkout() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [muscleGroup, setMuscleGroup] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const token = localStorage.getItem("auth_token");

        const newExercise = {
            name,
            image,
            muscleGroup,
            description,
        };

        setError("");
        fetch("http://localhost:8000/exercises", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(newExercise),
        }).then((response) => {
            if (!response.ok) {
                throw new Error("Error al crear el ejercicio");
            }
            return response.json();
        }).then(() => {
            navigate("/exercises");
        }).catch((error) => {
            setError("No se ha podido crear el ejercicio");
        })
    }

    return (
        <>
            <h1>CREAR EJERCICIO</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <h2>Nombre</h2>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                <h2>Imagen</h2>
                <input type="text" value={image} onChange={(event) => setImage(event.target.value)} />
                <h2>Grupo Muscular</h2>
                <select value={muscleGroup} onChange={(event) => setMuscleGroup(event.target.value)}>
                    <option value="pecho">Pecho</option>
                    <option value="espalda">Espalda</option>
                    <option value="pierna">Pierna</option>
                    <option value="biceps">Biceps</option>
                    <option value="triceps">Triceps</option>
                    <option value="hombro">Hombro</option>
                    <option value="core">Core</option>
                </select>
                <h2>Descripción</h2>
                <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
                <div>
                    <button type="submit">Crear</button>
                </div>
            </form>
        </>
    )
}