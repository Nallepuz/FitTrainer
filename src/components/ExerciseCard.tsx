import type { Exercise } from "../types/exercise";

type Props = {
    exercise: Exercise;
    showAddButton?: boolean;
    onAdd?: (exercise: Exercise) => void;
    showDeleteButton?: boolean;
    onDelete?: (id: number) => void;
};

export default function ExerciseCard({ exercise, showAddButton = false, onAdd, showDeleteButton, onDelete }: Props) {

    return (
        <div style={{
            backgroundColor: "#1e1e1e", border: "1px solid #333", borderRadius: "12px",
            padding: "16px", marginBottom: "16px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
        }}>

            <h2 style={{ margin: "0 0 10px 0", fontSize: "1.3rem", color: "#ffffff", }}>
                {exercise.name}
            </h2>

            <img src={exercise.image} alt={exercise.name} style={{ height: "150px", width: "200px" }} />

            <p style={{ margin: "6px 0", color: "#d1d1d1", }}>
                {exercise.muscleGroup}
            </p>

            <p style={{ margin: "6px 0", color: "#d1d1d1", lineHeight: "1.4", }}>
                {exercise.description}
            </p>
            <div style={{}}>
                {showAddButton && (
                    <button style={{
                        display: "inline - flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ff6b4a", color: "#ffffff",
                        textDecoration: "none", borderRadius: "10px", padding: "10px 18px", fontSize: "0.95rem", fontWeight: "600", border: "none",
                        cursor: "pointer", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", transition: "transform 0.2s ease, opacity 0.2s ease", margin: "18px 0 28px"
                    }}
                        onClick={() => onAdd?.(exercise)}>
                        Añadir
                    </button>
                )}
                {showDeleteButton && (
                    <button style={{
                        display: "inline - flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ff6b4a", color: "#ffffff",
                        textDecoration: "none", borderRadius: "10px", padding: "10px 18px", fontSize: "0.95rem", fontWeight: "600", border: "none",
                        cursor: "pointer", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", transition: "transform 0.2s ease, opacity 0.2s ease", margin: "18px 0 28px"
                    }}
                        onClick={() => onDelete?.(exercise.id)}>
                        Borrar
                    </button>
                )}
            </div>
        </div >
    );
}