const FillBar = ({ 
  text, 
  progress, 
  color, 
  grow_from = "start", 
  orientation = "horizontal", 
  long_side_length = 64,
  short_side_length = 24,
}) => {
  if (orientation === "horizontal") {
    return (
      <div className="fill-bar-horizontal-wrapper" style={{ width: long_side_length, height: short_side_length }}>
        <div className="fill-bar-back" style={{ justifyContent: grow_from === "start" ? "flex-start" : "flex-end" }}>
          <div className="fill-bar-horizontal" style={{ backgroundColor: color, width: `${progress}%` }}></div>
        </div>
        <div className="fill-bar-horizontal-text">{text ? text : `${progress}%`}</div>
      </div>
    );
  }
  return (
    <div className="fill-bar-vertical-wrapper" style={{ width: short_side_length, height: long_side_length }}>
      <div className="fill-bar-back" style={{ justifyContent: grow_from === "start" ? "flex-start" : "flex-end", flexDirection: "column" }}>
        <div className="fill-bar-vertical" style={{ backgroundColor: color, height: `${progress}%` }}></div>
      </div>
      <div className="fill-bar-vertical-text">{text ? text : `${progress}%`}</div>
    </div>
  );
}

export default FillBar;