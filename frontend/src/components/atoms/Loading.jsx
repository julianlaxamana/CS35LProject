const Loading = ({ color = '#83889C', size = 24 }) => {
  return (
    <div className="loading-circle-container">
      <div 
        className="loading-circle"
        style={{
          backgroundColor: color,
          width: `${size}px`,
          height: `${size}px`
        }}
      ></div>
    </div>
  );
};

export default Loading;