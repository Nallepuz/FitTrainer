type Props = {
    totalWorkouts: number;
    beginnerWorkouts: number;
    intermediateWorkouts: number;
    expertWorkouts: number;
  };
  
  export default function UserSummary({
    totalWorkouts,
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
          <p>Mis workouts</p>
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
          <p>Principiante</p>
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
          <p>Intermedio</p>
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
          <p>Experto</p>
          <h2>{expertWorkouts}</h2>
        </div>
      </div>
    );
  }