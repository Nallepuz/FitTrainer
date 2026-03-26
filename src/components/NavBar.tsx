import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function NavBar() {
    const { user, loadingSession, logout } = useAuth();

    const navStyle = {
        display: "flex",
        gap: "1rem",
        padding: "1rem 0",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      };

    const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
        color: isActive ? "var(--accent)" : "var(--text)",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
    });

    if (loadingSession) {
        return (
            <nav style={navStyle}>
                <span>Cargando sesión...</span>
            </nav>
        );
    }

    return (
        <nav style={navStyle}>
            <NavLink to="/" style={getLinkStyle}> Home </NavLink>
            <NavLink to="/exercises" style={getLinkStyle}> Exercises </NavLink>

            {!user && (
                <>
                    <NavLink to="/login" style={getLinkStyle}> Login </NavLink>

                    <NavLink to="/register" style={getLinkStyle}> Register </NavLink>
                </>
            )}
            {user && (
                <>
                    <NavLink to="/me" style={getLinkStyle}> Me </NavLink>

                    {user.role === "trainer" && (
                        <NavLink to="/trainer" style={getLinkStyle}> Trainer Zone </NavLink>
                    )}
                    {user.role === "admin" && (
                        <NavLink to="/admin" style={getLinkStyle}> Admin Zone </NavLink>
                    )}
                    <button onClick={logout}>  Logout </button>
                </>
            )}
        </nav>
    );
}