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

  const totalCardStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
  };

  const beginnerCardStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #1f2a17, #141c12)",
    border: "1px solid rgba(133, 216, 74, 0.24)",
  };

  const intermediateCardStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #1c2730, #131a22)",
    border: "1px solid rgba(46, 207, 218, 0.24)",
  };

  const expertCardStyle = {
    ...cardBaseStyle,
    background: "linear-gradient(145deg, #2a1c16, #1d1310)",
    border: "1px solid rgba(255, 159, 67, 0.24)",
  };

  return (
    <div className="adminTable" style={wrapperStyle}>
      <div style={totalCardStyle}>
        <p style={titleStyle}>Mis workouts</p>
        <h2 style={valueStyle}>{totalWorkouts}</h2>
      </div>

      <div style={beginnerCardStyle}>
        <p style={titleStyle}>Principiante</p>
        <h2 style={valueStyle}>{beginnerWorkouts}</h2>
      </div>

      <div style={intermediateCardStyle}>
        <p style={titleStyle}>Intermedio</p>
        <h2 style={valueStyle}>{intermediateWorkouts}</h2>
      </div>

      <div style={expertCardStyle}>
        <p style={titleStyle}>Experto</p>
        <h2 style={valueStyle}>{expertWorkouts}</h2>
      </div>
    </div>
  );
}