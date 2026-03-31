import type { WorkoutExercise } from "../types/workoutExercise";
import { useState } from "react";

type Props = {
  workoutExercise: WorkoutExercise;
  exerciseName?: string;
  onSave: (id: number, sets: number, reps: number, weight: number) => void;
  onDelete?: (id: number) => void;
};

export default function WorkoutExerciseItem({
  workoutExercise,
  exerciseName,
  onSave,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSets, setEditedSets] = useState(workoutExercise.sets);
  const [editedReps, setEditedReps] = useState(workoutExercise.reps);
  const [editedWeight, setEditedWeight] = useState(workoutExercise.weight);

  const cardStyle = {
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.28)",
    textAlign: "center" as const,
  };

  const titleStyle = {
    margin: "0 0 18px 0",
    fontSize: "1.45rem",
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

  const labelTextStyle = {
    margin: "8px 0 4px 0",
    color: "#85d84a",
    fontWeight: "700",
    fontSize: "0.98rem",
  };

  const inputStyle = {
    width: "100%",
    maxWidth: "220px",
    padding: "10px 12px",
    margin: "6px 0 10px 0",
    borderRadius: "10px",
    border: "1px solid rgba(46, 207, 218, 0.22)",
    backgroundColor: "#202632",
    color: "#f5efe6",
    fontSize: "1rem",
    outline: "none",
    boxSizing: "border-box" as const,
    textAlign: "center" as const,
  };

  const buttonsWrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    marginTop: "14px",
    flexWrap: "wrap" as const,
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
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
    transition: "transform 0.2s ease, opacity 0.2s ease",
  };

  const editButtonStyle = {
    ...buttonBaseStyle,
    background: "linear-gradient(135deg, #2ecfda, #85d84a)",
    color: "#10151b",
  };

  const removeButtonStyle = {
    ...buttonBaseStyle,
    background: "linear-gradient(135deg, #0f7e88, #1eb8c3)",
    color: "#ffffff",
  };

  const saveButtonStyle = {
    ...buttonBaseStyle,
    background: "linear-gradient(135deg, #2ecfda, #85d84a)",
    color: "#10151b",
  };

  const cancelButtonStyle = {
    ...buttonBaseStyle,
    background: "linear-gradient(135deg, #3a4250, #56606e)",
    color: "#ffffff",
  };

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{exerciseName}</h2>

      {isEditing ? (
        <>
          <p style={labelTextStyle}>Series</p>
          <input
            type="number"
            value={editedSets}
            onChange={(event) => setEditedSets(Number(event.target.value))}
            style={inputStyle}
          />
        </>
      ) : (
        <p style={textStyle}>Series: {editedSets}</p>
      )}

      {isEditing ? (
        <>
          <p style={labelTextStyle}>Repeticiones</p>
          <input
            type="number"
            value={editedReps}
            onChange={(event) => setEditedReps(Number(event.target.value))}
            style={inputStyle}
          />
        </>
      ) : (
        <p style={textStyle}>Repeticiones: {editedReps}</p>
      )}

      {isEditing ? (
        <>
          <p style={labelTextStyle}>Peso</p>
          <input
            type="number"
            value={editedWeight}
            onChange={(event) => setEditedWeight(Number(event.target.value))}
            style={inputStyle}
          />
        </>
      ) : (
        <p style={textStyle}>Peso: {editedWeight}</p>
      )}

      {!isEditing ? (
        <div style={buttonsWrapperStyle}>
          <button style={editButtonStyle} onClick={() => setIsEditing(true)}>
            Editar
          </button>

          <button
            style={removeButtonStyle}
            onClick={() => onDelete?.(workoutExercise.id)}
          >
            Quitar
          </button>
        </div>
      ) : (
        <div style={buttonsWrapperStyle}>
          <button
            style={saveButtonStyle}
            onClick={() => {
              onSave(workoutExercise.id, editedSets, editedReps, editedWeight);
              setIsEditing(false);
            }}
          >
            Guardar
          </button>

          <button
            style={cancelButtonStyle}
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