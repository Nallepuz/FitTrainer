import type { Workout } from "../types/workout";

type Props = {
  workouts: Workout[];
};

export default function TrainerDashboard({ workouts }: Props) {
  const emptyStateStyle = {
    margin: "30px auto",
    maxWidth: "500px",
    padding: "18px 22px",
    borderRadius: "14px",
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    color: "#f5efe6",
    textAlign: "center" as const,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
    fontWeight: "600",
  };

  const tableWrapperStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "30px auto 0",
    overflowX: "auto" as const,
    borderRadius: "16px",
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.25)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    background: "linear-gradient(145deg, #1b2028, #141922)",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    color: "#f5efe6",
    minWidth: "850px",
  };

  const theadStyle = {
    background:
      "linear-gradient(135deg, rgba(46, 207, 218, 0.16), rgba(133, 216, 74, 0.12))",
  };

  const thStyle = {
    padding: "16px",
    fontSize: "1rem",
    fontWeight: "800",
    color: "#f5efe6",
    borderBottom: "1px solid rgba(46, 207, 218, 0.18)",
    textAlign: "center" as const,
  };

  const tdStyle = {
    padding: "15px 16px",
    color: "#d4dde4",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    textAlign: "center" as const,
    fontSize: "0.97rem",
  };

  const levelStyle = (level: string) => ({
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "0.9rem",
    color:
      level.toLowerCase() === "principiante"
        ? "#10151b"
        : level.toLowerCase() === "intermedio"
        ? "#10151b"
        : "#ffffff",
    background:
      level.toLowerCase() === "principiante"
        ? "linear-gradient(135deg, #85d84a, #a7ea63)"
        : level.toLowerCase() === "intermedio"
        ? "linear-gradient(135deg, #2ecfda, #61dde6)"
        : "linear-gradient(135deg, #ff9f43, #ff7f50)",
  });

  const userIdBadgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "0.9rem",
    color: "#f5efe6",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(46, 207, 218, 0.16)",
  };

  if (workouts.length === 0) {
    return <p style={emptyStateStyle}>No hay entrenamientos para mostrar</p>;
  }

  return (
    <div style={tableWrapperStyle}>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Título</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Duración</th>
            <th style={thStyle}>Nivel</th>
            <th style={thStyle}>User ID</th>
          </tr>
        </thead>

        <tbody>
          {workouts.map((workout) => (
            <tr key={workout.id}>
              <td style={tdStyle}>{workout.title}</td>
              <td style={tdStyle}>{workout.description}</td>
              <td style={tdStyle}>{workout.duration} min</td>
              <td style={tdStyle}>
                <span style={levelStyle(workout.level)}>{workout.level}</span>
              </td>
              <td style={tdStyle}>
                <span style={userIdBadgeStyle}>{workout.userId}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}