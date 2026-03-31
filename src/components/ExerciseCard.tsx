import type { Exercise } from "../types/exercise";

type Props = {
  exercise: Exercise;
  showAddButton?: boolean;
  onAdd?: (exercise: Exercise) => void;
  showDeleteButton?: boolean;
  onDelete?: (id: number) => void;
};

export default function ExerciseCard({
  exercise,
  showAddButton = false,
  onAdd,
  showDeleteButton,
  onDelete,
}: Props) {
  const cardStyle = {
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    borderRadius: "16px",
    padding: "18px",
    marginBottom: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.28)",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    
  };

  const titleStyle = {
    margin: "0 0 14px 0",
    fontSize: "1.35rem",
    fontWeight: "800",
    color: "#f5efe6",
  };

  const imageStyle = {
    width: "100%",
    maxWidth: "240px",
    height: "160px",
    objectFit: "cover" as const,
    borderRadius: "12px",
    border: "1px solid rgba(46, 207, 218, 0.14)",
    marginBottom: "14px",
    boxShadow: "0 6px 14px rgba(0, 0, 0, 0.2)",
  };

  const muscleGroupStyle = {
    margin: "6px 0",
    color: "#85d84a",
    fontWeight: "700",
    fontSize: "0.98rem",
  };

  const descriptionStyle = {
    margin: "8px 0 18px 0",
    color: "#d4dde4",
    lineHeight: "1.5",
    fontSize: "0.96rem",
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap" as const,
    marginTop: "auto",
    width: "100%",
  };

  const addButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #2ecfda, #85d84a)",
    color: "#10151b",
    textDecoration: "none",
    borderRadius: "10px",
    padding: "10px 18px",
    fontSize: "0.95rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.22)",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    minWidth: "110px",
  };

  const deleteButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0f7e88, #1eb8c3)",
    color: "#ffffff",
    textDecoration: "none",
    borderRadius: "10px",
    padding: "10px 18px",
    fontSize: "0.95rem",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.22)",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    minWidth: "110px",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{exercise.name}</h2>

      <img src={exercise.image} alt={exercise.name} style={imageStyle} />

      <p style={muscleGroupStyle}>{exercise.muscleGroup}</p>

      <p style={descriptionStyle}>{exercise.description}</p>

      <div style={actionsStyle}>
        {showAddButton && (
          <button style={addButtonStyle} onClick={() => onAdd?.(exercise)}>
            Añadir
          </button>
        )}

        {showDeleteButton && (
          <button
            style={deleteButtonStyle}
            onClick={() => onDelete?.(exercise.id)}
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}