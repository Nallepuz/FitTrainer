import type { Workout } from "../types/workout";
import { Link } from "react-router-dom";

type Props = {
  workout: Workout;
  showDeleteButton?: boolean;
  onDelete?: (id: number) => void;
};

export default function WorkoutCard({
  workout,
  showDeleteButton,
  onDelete,
}: Props) {
  const cardStyle = {
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.28)",
    textAlign: "center" as const,
  };

  const titleStyle = {
    margin: "0 0 14px 0",
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#f5efe6",
    lineHeight: "1.2",
  };

  const textStyle = {
    margin: "8px 0",
    color: "#d4dde4",
    lineHeight: "1.5",
    fontSize: "1rem",
  };

  const levelStyle = {
    margin: "8px 0 12px 0",
    color: "#85d84a",
    lineHeight: "1.4",
    fontSize: "1rem",
    fontWeight: "700",
  };

  const actionsStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap" as const,
    marginTop: "8px",
  };

  const buttonBaseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "44px",
    minWidth: "120px",
    padding: "0 20px",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "700",
    fontFamily: "inherit",
    lineHeight: "1",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.22)",
    boxSizing: "border-box" as const,
    transition: "transform 0.2s ease, opacity 0.2s ease",
  };

  const editButtonStyle = {
    ...buttonBaseStyle,
    background: "linear-gradient(135deg, #2ecfda, #85d84a)",
    color: "#10151b",
  };

  const deleteButtonStyle = {
    ...buttonBaseStyle,
    background: "linear-gradient(135deg, #0f7e88, #1eb8c3)",
    color: "#ffffff",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{workout.title}</h2>

      <p style={textStyle}>{workout.description}</p>

      <p style={textStyle}>{workout.duration} min</p>

      <p style={levelStyle}>{workout.level}</p>

      <div style={actionsStyle}>
        <Link to={`/workoutsExercises/${workout.id}`} style={editButtonStyle}>
          Editar
        </Link>

        {showDeleteButton && (
          <button
            type="button"
            style={deleteButtonStyle}
            onClick={() => onDelete?.(workout.id)}
          >
            Borrar
          </button>
        )}
      </div>
    </div>
  );
}