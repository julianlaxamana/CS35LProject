const Spacer = ({ height, width }) => {
  // Helper to format the value: add 'px' only if it's a number
  const getSize = (value) => {
    if (value === undefined || value === null) return 'auto'; // Default to auto/fill
    return typeof value === 'number' ? `${value}px` : value;
  };

  return (
    <div 
      style={{ 
        height: getSize(height), 
        width: getSize(width),
        flexShrink: 0,
        display: 'block'
      }} 
    ></div>
  );
}

export default Spacer;