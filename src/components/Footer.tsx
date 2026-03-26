export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1F1D20",
        color: "#F5ECDC",
        padding: "16px 20px",
        textAlign: "center",
        boxShadow: "0 -2px 6px rgba(0, 0, 0, 0.15)",
        width: "100%",
        marginTop: "60px",
      }}
    >
      <p style={{ margin: 0, fontSize: "14px", fontWeight: 500 }}>
        Urban Store
      </p>

      <p style={{ margin: "4px 0", fontSize: "12px", color: "#cfc6b8" }}>
        Proyecto académico · Grado Superior Desarrollo Web
      </p>

      <p style={{ margin: 0, fontSize: "12px", color: "#9e9588" }}>
        © 2025 — Todos los derechos reservados
      </p>
    </footer>
  );
}
