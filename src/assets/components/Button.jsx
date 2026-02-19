const Button = ({ children, ...props }) => {
  return (
    <button className="cursor-pointer" {...props}>
      {children}
    </button>
  );
};

export default Button;
