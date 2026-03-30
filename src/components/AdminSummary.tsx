type Props = {
    totalUsers: number;
    totalTrainers: number;
    totalWorkouts: number;
    totalExercises: number;
  };
  
  export default function AdminSummary({
    totalUsers,
    totalTrainers,
    totalWorkouts,
    totalExercises,
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
          <p>Total usuarios</p>
          <h2>{totalUsers}</h2>
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
          <p>Total trainers</p>
          <h2>{totalTrainers}</h2>
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
      </div>
    );
  }