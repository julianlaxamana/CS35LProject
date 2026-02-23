const Chip = ({ label, size, bgcolor, color, clickable = false, on_click = () => {} }) => {
  return (
    <span 
      className={`chip-${size}`} 
      style={{ backgroundColor: bgcolor, color: color, cursor: clickable ? 'pointer' : 'default' }} 
      onClick={clickable ? on_click : null}
    >
      {label}
    </span>
  );
}

export default Chip;