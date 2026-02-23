const Icon = ({ src, alt, color, size = 32, ...props }) => {
  return (
    <img src={src} alt={alt} width={size} height={size} {...props} />
  );
}

export default Icon;