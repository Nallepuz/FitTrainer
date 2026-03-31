export default function Footer() {
  const footerStyle = {
    background: "linear-gradient(145deg, #171c24, #11161d)",
    color: "#f5efe6",
    padding: "18px 20px",
    textAlign: "center" as const,
    borderTop: "1px solid rgba(46, 207, 218, 0.18)",
    boxShadow: "0 -2px 12px rgba(0, 0, 0, 0.18)",
    width: "100%",
    marginTop: "60px",
    boxSizing: "border-box" as const,
  };

  const titleStyle = {
    margin: 0,
    fontSize: "15px",
    fontWeight: 700,
    color: "#f5efe6",
    letterSpacing: "0.03em",
  };

  const subtitleStyle = {
    margin: "6px 0 0 0",
    fontSize: "12.5px",
    color: "#bfcad3",
  };

  const copyrightStyle = {
    margin: "6px 0 0 0",
    fontSize: "12px",
    color: "#2ecfda",
    fontWeight: 600,
  };

  return (
    <footer style={footerStyle}>
      <p style={titleStyle}>FitTrainer</p>

      <p style={subtitleStyle}>
        Proyecto académico · Grado Superior Desarrollo Web
      </p>

      <p style={copyrightStyle}>© 2026 — Todos los derechos reservados</p>
    </footer>
  );
}