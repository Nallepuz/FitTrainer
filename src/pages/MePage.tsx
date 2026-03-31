import { useAuth } from "../context/authContext";

export default function MePage() {
  const { user } = useAuth();

  const pageStyle = {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "520px",
    background: "linear-gradient(145deg, #1b2028, #141922)",
    border: "1px solid rgba(46, 207, 218, 0.18)",
    borderRadius: "18px",
    padding: "32px 28px",
    boxShadow: "0 10px 26px rgba(0, 0, 0, 0.28)",
    textAlign: "center" as const,
  };

  const titleStyle = {
    margin: "0 0 24px 0",
    fontSize: "2.4rem",
    fontWeight: "800",
    color: "#f5efe6",
  };

  const avatarStyle = {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px auto",
    background: "linear-gradient(135deg, #2ecfda, #85d84a)",
    color: "#10151b",
    fontSize: "2rem",
    fontWeight: "800",
    boxShadow: "0 6px 16px rgba(0, 0, 0, 0.24)",
  };

  const infoBlockStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "14px",
    marginTop: "10px",
  };

  const rowStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(46, 207, 218, 0.12)",
    borderRadius: "12px",
    padding: "14px 16px",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#85d84a",
    marginBottom: "6px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.04em",
  };

  const valueStyle = {
    margin: 0,
    fontSize: "1.08rem",
    color: "#f5efe6",
    fontWeight: "600",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Mi perfil</h1>

        {user && (
          <>
            <div style={avatarStyle}>{user.name?.charAt(0).toUpperCase()}</div>

            <div style={infoBlockStyle}>
              <div style={rowStyle}>
                <span style={labelStyle}>Nombre</span>
                <p style={valueStyle}>{user.name}</p>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Email</span>
                <p style={valueStyle}>{user.email}</p>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Rol</span>
                <p style={valueStyle}>{user.role}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}