const Chip = ({ label, size, bgcolor, color }) => {
  return (
    <span className={`chip-${size}`} style={{ backgroundColor: bgcolor, color: color }}>
      {label}
    </span>
  );
}

export default Chip;