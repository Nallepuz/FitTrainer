import type { User } from "../types/user";

type Props = {
  users: User[];
  countUserWorkouts: (userId: number) => number;
};

export default function AdminDashboard({
  users,
  countUserWorkouts,
}: Props) {
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
    minWidth: "750px",
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

  const roleStyle = (role: string) => ({
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "0.9rem",
    color:
      role.toLowerCase() === "admin"
        ? "#ffffff"
        : role.toLowerCase() === "trainer"
        ? "#10151b"
        : "#10151b",
    background:
      role.toLowerCase() === "admin"
        ? "linear-gradient(135deg, #0f7e88, #1eb8c3)"
        : role.toLowerCase() === "trainer"
        ? "linear-gradient(135deg, #85d84a, #a7ea63)"
        : "linear-gradient(135deg, #2ecfda, #61dde6)",
  });

  const workoutsBadgeStyle = {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "0.9rem",
    color: "#f5efe6",
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(46, 207, 218, 0.16)",
  };

  if (users.length === 0) {
    return <p style={emptyStateStyle}>No hay usuarios para mostrar</p>;
  }

  return (
    <div style={tableWrapperStyle}>
      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Rol</th>
            <th style={thStyle}>Nº workouts</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <span style={roleStyle(user.role)}>{user.role}</span>
              </td>
              <td style={tdStyle}>
                <span style={workoutsBadgeStyle}>
                  {countUserWorkouts(user.id)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}