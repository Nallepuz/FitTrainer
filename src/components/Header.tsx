
export default function Header() {
  return (
    <header style={{
      display: 'flex',
      borderBottom: "1px solid var(--border)",
      padding: '10px 20px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    }} >
      <h1 style={{ margin: 0, fontSize: "24px" }}>
        FitTrainer
      </h1>
      <p style={{ margin: 0, fontSize: "14px" }}>
      </p>
    </header>
  );
}