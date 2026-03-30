import type { Workout } from "../types/workout";

type Props = {
  workouts: Workout[];
};

export default function UserDashboard({ workouts }: Props) {
  if (workouts.length === 0) {
    return <p>No tienes entrenamientos para mostrar</p>;
  }

  return (
    <table border={1} cellPadding={10} style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Duración</th>
          <th>Nivel</th>
        </tr>
      </thead>
      <tbody>
        {workouts.map((workout) => (
          <tr key={workout.id}>
            <td>{workout.title}</td>
            <td>{workout.description}</td>
            <td>{workout.duration}</td>
            <td>{workout.level}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}