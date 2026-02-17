const Icon = ({ src, alt, color, size = 32 }) => {
  return (
    <img src={src} alt={alt} width={size} height={size} />
  );
}

export default Icon;