import type { Workout } from "../types/workout";
import { Link } from "react-router-dom";

type Props = {
    workout: Workout;
    showDeleteButton?: boolean;
    onDelete?: (id: number) => void;
};

export default function WorkoutCard({ workout, showDeleteButton, onDelete }: Props) {
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
        boxSizing: "border-box" as const
    };

    return (
        <div style={{ backgroundColor: "#1e1e1e", border: "1px solid #333", borderRadius: "12px", padding: "24px", marginBottom: "16px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)", textAlign: "center" }}>
            <h2 style={{ margin: "0 0 10px 0", fontSize: "1.8rem", color: "#ffffff" }}>
                {workout.title}
            </h2>

            <p style={{ margin: "6px 0", color: "#d1d1d1" }}>
                {workout.description}
            </p>

            <p style={{ margin: "6px 0", color: "#d1d1d1", lineHeight: "1.4" }}>
                {workout.duration}
            </p>

            <p style={{ margin: "6px 0 24px 0", color: "#d1d1d1", lineHeight: "1.4" }}>
                {workout.level}
            </p>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "14px" }}>
                <Link to={`/workoutsExercises/${workout.id}`} style={{ ...buttonBaseStyle, backgroundColor: "#0c5c03", color: "#ffffff" }}>
                    Editar
                </Link>

                {showDeleteButton && (<button type="button" style={{ ...buttonBaseStyle, backgroundColor: "#8a0638", color: "#ffffff" }} onClick={() => onDelete?.(workout.id)}>
                    Borrar
                </button>
                )}
            </div>
        </div>
    );
}