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
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    gap: "20px",
    flexWrap: "wrap" as const,
    margin: "30px 0",
  };

  const cardBaseStyle = {
    minWidth: "190px",
    padding: "22px",
    borderRadius: "16px",
    textAlign: "center" as const,
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.28)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  };

  const titleStyle = {
    margin: "0 0 10px 0",
    fontSize: "1rem",
    fontWeight: "700",
    color: "#f5efe6",
  };

  const valueStyle = {
    margin: 0,
    fontSize: "2.2rem",
    fontWeight: "800",
    color: "#ffffff",
  };

  const totalUsersStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
  };

  const totalTrainersStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #1b2421, #141b18)",
    border: "1px solid rgba(133, 216, 74, 0.22)",
  };

  const totalWorkoutsStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #1c2730, #131a22)",
    border: "1px solid rgba(46, 207, 218, 0.24)",
  };

  const totalExercisesStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #2a1c16, #1d1310)",
    border: "1px solid rgba(255, 159, 67, 0.24)",
  };

  return (
    <div className="adminTable" style={wrapperStyle}>
      <div style={totalUsersStyle}>
        <p style={titleStyle}>Total usuarios</p>
        <h2 style={valueStyle}>{totalUsers}</h2>
      </div>

      <div style={totalTrainersStyle}>
        <p style={titleStyle}>Total trainers</p>
        <h2 style={valueStyle}>{totalTrainers}</h2>
      </div>

      <div style={totalWorkoutsStyle}>
        <p style={titleStyle}>Total workouts</p>
        <h2 style={valueStyle}>{totalWorkouts}</h2>
      </div>

      <div style={totalExercisesStyle}>
        <p style={titleStyle}>Total ejercicios</p>
        <h2 style={valueStyle}>{totalExercises}</h2>
      </div>
    </div>
  );
}