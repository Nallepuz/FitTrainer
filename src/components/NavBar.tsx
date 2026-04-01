import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function NavBar() {
  const { user, loadingSession, logout } = useAuth();

  const navStyle = {
    display: "flex",
    gap: "18px",
    padding: "12px 20px 18px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap" as const,
    boxSizing: "border-box" as const,
  };

  const loadingTextStyle = {
    color: "#cfd7de",
    fontSize: "0.95rem",
    fontWeight: "600",
  };

  const logoutButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: "38px",
    minWidth: "96px",
    padding: "0 16px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #2ecfda, #85d84a)",
    color: "#10151b",
    fontSize: "0.92rem",
    fontWeight: "800",
    fontFamily: "inherit",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.22)",
    transition: "transform 0.2s ease, opacity 0.2s ease",
  };

  const navLinkWrapperStyle = {
    textDecoration: "none",
  };

  const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? "#85d84a" : "#d8e0e7",
    textDecoration: "none",
    fontWeight: isActive ? "800" : "600",
    fontSize: "0.98rem",
    padding: "8px 4px",
    borderBottom: isActive
      ? "2px solid rgba(133, 216, 74, 0.85)"
      : "2px solid transparent",
    transition: "color 0.2s ease, border-bottom 0.2s ease, opacity 0.2s ease",
  });

  if (loadingSession) {
    return (
      <nav style={navStyle}>
        <span style={loadingTextStyle}>Cargando sesión...</span>
      </nav>
    );
  }

  return (
    <nav style={navStyle}>
      <NavLink to="/" style={getLinkStyle}>Home</NavLink>

      <NavLink to="/exercises" style={getLinkStyle}>Ejercicios</NavLink>

      {!user && (
        <>
          <NavLink to="/login" style={getLinkStyle}>Login</NavLink>

          <NavLink to="/register" style={getLinkStyle}>Registrar</NavLink>
        </>
      )}

      {user && (
        <>
          <NavLink to="/workouts" style={getLinkStyle}>Entrenamientos</NavLink>

          <NavLink to="/me" style={getLinkStyle}>Me</NavLink>

          {(user.role === "trainer" || user.role === "admin") && (
            <NavLink to="/createExercise" style={getLinkStyle}>Crear Ejercicios</NavLink>
          )}

          <NavLink to="/dashboard" style={getLinkStyle}>Dashboard</NavLink>

          <NavLink to="/" style={navLinkWrapperStyle}>
            <button onClick={logout} style={logoutButtonStyle}>Logout</button>
          </NavLink>
        </>
      )}
    </nav>
  );
}