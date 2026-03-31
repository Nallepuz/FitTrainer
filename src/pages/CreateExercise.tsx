import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExercise } from "../service/exerciseService";

export default function CreateExercise() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newExercise = {
      name,
      image,
      muscleGroup,
      description,
    };

    try {
      setError("");
      await createExercise(newExercise);
      navigate("/exercises");
    } catch (error) {
      console.error(error);
      setError("No se ha podido crear el ejercicio");
    }
  }

  const pageStyle = {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "620px",
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    borderRadius: "18px",
    padding: "32px 28px",
    boxShadow: "0 10px 26px rgba(0, 0, 0, 0.28)",
    textAlign: "center" as const,
  };

  const titleStyle = {
    margin: "0 0 24px 0",
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#f5efe6",
  };

  const errorStyle = {
    margin: "0 0 18px 0",
    color: "#ff7b7b",
    fontWeight: "700",
    fontSize: "0.96rem",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  };

  const fieldWrapperStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    textAlign: "left" as const,
    gap: "8px",
  };

  const labelStyle = {
    margin: 0,
    fontSize: "0.98rem",
    fontWeight: "700",
    color: "#85d84a",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    background: "#202632",
    color: "#f5efe6",
    fontSize: "0.98rem",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const selectStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    background: "#202632",
    color: "#f5efe6",
    fontSize: "0.98rem",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box" as const,
    cursor: "pointer",
  };

  const buttonWrapperStyle = {
    marginTop: "8px",
    display: "flex",
    justifyContent: "center",
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #2ecfda, #85d84a)",
    color: "#10151b",
    textDecoration: "none",
    borderRadius: "10px",
    padding: "12px 22px",
    fontSize: "1rem",
    fontWeight: "800",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.22)",
    transition: "transform 0.2s ease, opacity 0.2s ease",
    minWidth: "160px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Crear ejercicio</h1>

        {error && <p style={errorStyle}>{error}</p>}

        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={fieldWrapperStyle}>
            <h2 style={labelStyle}>Nombre</h2>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              style={inputStyle}
              placeholder="Introduce el nombre del ejercicio"
            />
          </div>

          <div style={fieldWrapperStyle}>
            <h2 style={labelStyle}>Imagen</h2>
            <input
              type="text"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              style={inputStyle}
              placeholder="Introduce la URL de la imagen"
            />
          </div>

          <div style={fieldWrapperStyle}>
            <h2 style={labelStyle}>Grupo muscular</h2>
            <select
              value={muscleGroup}
              onChange={(event) => setMuscleGroup(event.target.value)}
              style={selectStyle}
            >
              <option value="">Selecciona un grupo muscular</option>
              <option value="pecho">Pecho</option>
              <option value="espalda">Espalda</option>
              <option value="pierna">Pierna</option>
              <option value="biceps">Bíceps</option>
              <option value="triceps">Tríceps</option>
              <option value="hombro">Hombro</option>
              <option value="core">Core</option>
            </select>
          </div>

          <div style={fieldWrapperStyle}>
            <h2 style={labelStyle}>Descripción</h2>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              style={inputStyle}
              placeholder="Describe el ejercicio"
            />
          </div>

          <div style={buttonWrapperStyle}>
            <button type="submit" style={buttonStyle}>
              Crear ejercicio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}