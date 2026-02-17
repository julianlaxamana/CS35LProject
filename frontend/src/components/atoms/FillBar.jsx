const FillBar = ({ text, progress, color, grow_from = "left" }) => {
  return (
    <div className="fill-bar-back" style={{ justifyContent: grow_from === "left" ? "flex-start" : "flex-end" }}>
      <div className="fill-bar-text">{text ? text : `${progress}%`}</div>
      <div className="fill-bar" style={{ backgroundColor: color, width: `${progress}%` }}></div>
    </div>
  );
}

export default FillBar;