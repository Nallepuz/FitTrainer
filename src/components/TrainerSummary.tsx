type Props = {
  totalWorkouts: number;
  totalExercises: number;
  beginnerWorkouts: number;
  intermediateWorkouts: number;
  expertWorkouts: number;
};

export default function TrainerSummary({
  totalWorkouts,
  totalExercises,
  beginnerWorkouts,
  intermediateWorkouts,
  expertWorkouts,
}: Props) {
  return (
    <div
      className="adminTable"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "stretch",
        gap: "20px",
        flexWrap: "wrap",
        margin: "30px 0",
      }}
    >
      <div
        style={{
          minWidth: "180px",
          padding: "20px",
          border: "1px solid #444",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#1e1e1e",
        }}
      >
        <p>Total workouts</p>
        <h2>{totalWorkouts}</h2>
      </div>

      <div
        style={{
          minWidth: "180px",
          padding: "20px",
          border: "1px solid #444",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#1e1e1e",
        }}
      >
        <p>Total ejercicios</p>
        <h2>{totalExercises}</h2>
      </div>

      <div
        style={{
          minWidth: "180px",
          padding: "20px",
          border: "1px solid #444",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#1e1e1e",
        }}
      >
        <p>Workouts principiantes</p>
        <h2>{beginnerWorkouts}</h2>
      </div>

      <div
        style={{
          minWidth: "180px",
          padding: "20px",
          border: "1px solid #444",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#1e1e1e",
        }}
      >
        <p>Workouts intermedios</p>
        <h2>{intermediateWorkouts}</h2>
      </div>

      <div
        style={{
          minWidth: "180px",
          padding: "20px",
          border: "1px solid #444",
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "#1e1e1e",
        }}
      >
        <p>Workouts expertos</p>
        <h2>{expertWorkouts}</h2>
      </div>
    </div>
  );
}