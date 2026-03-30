import type { WorkoutExercise } from "../types/workoutExercise";
import { useState } from "react";

type Props = {
    workoutExercise: WorkoutExercise;
    exerciseName?: string;
    onSave: (id: number, sets: number, reps: number, weight: number) => void;
    onDelete?: (id: number) => void;
}

export default function WorkoutExerciseItem({ workoutExercise, exerciseName, onSave, onDelete }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedSets, setEditedSets] = useState(workoutExercise.sets);
    const [editedReps, setEditedReps] = useState(workoutExercise.reps);
    const [editedWeight, setEditedWeight] = useState(workoutExercise.weight);

    const buttonBaseStyle = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "46px",
        minWidth: "140px",
        padding: "0 22px",
        borderRadius: "10px",
        fontSize: "1rem",
        fontWeight: "700",
        fontFamily: "inherit",
        lineHeight: "1",
        textDecoration: "none",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        boxSizing: "border-box" as const,
        appearance: "none" as const,
        WebkitAppearance: "none" as const
    };

    const inputStyle = {
        width: "100%",
        maxWidth: "220px",
        padding: "10px 12px",
        margin: "6px 0",
        borderRadius: "8px",
        border: "1px solid #444",
        backgroundColor: "#2a2a2a",
        color: "#ffffff",
        fontSize: "1rem",
        outline: "none"
    };

    return (
        <div
            style={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
                textAlign: "center"
            }}
        >
            <h2
                style={{
                    margin: "0 0 16px 0",
                    fontSize: "1.4rem",
                    color: "#ffffff"
                }}
            >
                {exerciseName}
            </h2>

            {isEditing ? (
                <input
                    type="number"
                    value={editedSets}
                    onChange={(event) => setEditedSets(Number(event.target.value))}
                    style={inputStyle}
                />
            ) : (
                <p style={{ margin: "6px 0", color: "#d1d1d1" }}>
                    Series: {editedSets}
                </p>
            )}

            {isEditing ? (
                <input
                    type="number"
                    value={editedReps}
                    onChange={(event) => setEditedReps(Number(event.target.value))}
                    style={inputStyle}
                />
            ) : (
                <p style={{ margin: "6px 0", color: "#d1d1d1", lineHeight: "1.4" }}>
                    Repeticiones: {editedReps}
                </p>
            )}

            {isEditing ? (
                <input
                    type="number"
                    value={editedWeight}
                    onChange={(event) => setEditedWeight(Number(event.target.value))}
                    style={inputStyle}
                />
            ) : (
                <p style={{ margin: "6px 0 24px 0", color: "#d1d1d1", lineHeight: "1.4" }}>
                    Peso: {editedWeight}
                </p>
            )}

            {!isEditing ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "14px",
                        marginTop: "18px"
                    }}
                >
                    <button
                        style={{
                            ...buttonBaseStyle,
                            backgroundColor: "#ff6b4a",
                            color: "#ffffff"
                        }}
                        onClick={() => setIsEditing(true)}
                    >
                        Editar
                    </button>
                    <button
                        style={{
                            ...buttonBaseStyle,
                            backgroundColor: "#ff6b4a",
                            color: "#ffffff"
                        }}
                        onClick={() => onDelete?.(workoutExercise.id)}
                    >
                        Quitar
                    </button>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "14px",
                        marginTop: "18px"
                    }}
                >
                    <button
                        style={{
                            ...buttonBaseStyle,
                            backgroundColor: "#0c5c03",
                            color: "#ffffff"
                        }}
                        onClick={() => {
                            onSave(workoutExercise.id, editedSets, editedReps, editedWeight);
                            setIsEditing(false);
                        }}
                    >
                        Guardar
                    </button>

                    <button
                        style={{
                            ...buttonBaseStyle,
                            backgroundColor: "#8a0638",
                            color: "#ffffff"
                        }}
                        onClick={() => {
                            setEditedSets(workoutExercise.sets);
                            setEditedReps(workoutExercise.reps);
                            setEditedWeight(workoutExercise.weight);
                            setIsEditing(false);
                        }}
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </div>
    );
}