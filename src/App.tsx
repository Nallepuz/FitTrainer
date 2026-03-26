import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MePage from "./pages/MePage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import RequireAuth from "./auth/RequireAuth";
import RequireRole from "./auth/RequireRole";
import { useAuth } from "./context/authContext";

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
      <Link to="/">Home</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <Link to="/me">Me</Link>
          {user.role === "admin" && <Link to="/admin">Admin</Link>}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/me"
          element={
            <RequireAuth>
              <MePage />
            </RequireAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RequireRole allowedRoles={["admin"]}>
                <AdminPage />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}