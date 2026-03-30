import type { User } from "../types/user";

type Props = {
  users: User[];
  countUserWorkouts: (userId: number) => number;
};

export default function AdminDashboard({
  users,
  countUserWorkouts,
}: Props) {
  if (users.length === 0) {
    return <p>No hay usuarios para mostrar</p>;
  }

  return (
    <table border={1} cellPadding={10} style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Nº workouts</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{countUserWorkouts(user.id)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}