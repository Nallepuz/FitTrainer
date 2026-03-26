import { useAuth } from "../context/authContext";

export default function MePage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Mi perfil</h1>
      {user && (
        <>
          <p>Nombre: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Rol: {user.role}</p>
        </>
      )}
    </div>
  );
}