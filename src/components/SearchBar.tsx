type Props = {
    search: string;
    setSearch: (value: string) => void;
  };
  
  export default function SearchBar({ search, setSearch }: Props) {
    const wrapperStyle = {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "linear-gradient(145deg, #1b2028, #141922)",
      border: "1px solid rgba(46, 207, 218, 0.18)",
      borderRadius: "12px",
      padding: "10px 14px",
      minWidth: "280px",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.22)",
    };
  
    const iconStyle = {
      color: "#2ecfda",
      fontSize: "1rem",
      fontWeight: "700",
      lineHeight: "1",
    };
  
    const inputStyle = {
      width: "100%",
      border: "none",
      outline: "none",
      backgroundColor: "transparent",
      color: "#f5efe6",
      fontSize: "0.98rem",
      fontFamily: "inherit",
    };
  
    return (
      <div style={wrapperStyle}>
        <span style={iconStyle}>⌕</span>
        <input
          type="text"
          value={search}
          placeholder="Buscar..."
          onChange={(event) => setSearch(event.target.value)}
          style={inputStyle}
        />
      </div>
    );
  }