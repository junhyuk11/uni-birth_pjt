import React from "react";

const Button3 = ({
  value,
  onClick,
  selectedValue,
  className,
  icon,
  onSelect,
}) => {
  const isSelected = value === selectedValue;
  const handleClick = () => {
    if (!isSelected) {
      onSelect(value);
      onClick();
    }
  };
  return (
    <button
      className={`items-center p-2 text-black   ${
        isSelected ? "border-b-4 border-yellow-100" : ""
      } ${className}`}
      onClick={handleClick}
    >
      {icon && <div className="mr-2">{icon}</div>} {value}
    </button>
  );
};

export default Button3;
