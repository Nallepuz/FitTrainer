type Option = {
    value: string;
    label: string;
  };
  
  type Props = {
    value: string;
    setValue: (value: string) => void;
    options: Option[];
  };
  
  export default function Filter({ value, setValue, options }: Props) {
    const selectStyle = {
      minWidth: "160px",
      padding: "10px 14px",
      borderRadius: "12px",
      border: "1px solid rgba(46, 207, 218, 0.18)",
      background: "linear-gradient(145deg, #1b2028, #141922)",
      color: "#f5efe6",
      fontSize: "0.96rem",
      fontWeight: 600,
      fontFamily: "inherit",
      outline: "none",
      cursor: "pointer",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.22)",
      appearance: "none" as const,
      WebkitAppearance: "none" as const,
      MozAppearance: "none" as const,
      paddingRight: "34px",
    };
  
    const optionStyle = {
      backgroundColor: "#1b2028",
      color: "#f5efe6",
    };
  
    const wrapperStyle = {
      position: "relative" as const,
      display: "inline-block",
    };
  
    const arrowStyle = {
      position: "absolute" as const,
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none" as const,
      color: "#85d84a",
      fontSize: "0.85rem",
      fontWeight: 700,
    };
  
    return (
      <div style={wrapperStyle}>
        <select
          value={value}
          onChange={(event) => setValue(event.target.value)}
          style={selectStyle}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} style={optionStyle}>
              {option.label}
            </option>
          ))}
        </select>
  
        <span style={arrowStyle}>▼</span>
      </div>
    );
  }