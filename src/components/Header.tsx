import logoFit from "../assets/logo fit.png";

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
      <img
            src={logoFit}
            style= {{width:"350px"}}
          />
    </header>
  );
}