import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AppRole } from "../types/auth";
import { useAuth } from "../context/authContext";

export default function RequireRole({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: AppRole[];
}) {
  const { token, user, loadingSession } = useAuth();

  if (loadingSession) {
    return <p style={{ textAlign: "center", marginTop: "30px" }}>Cargando sesión...</p>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}