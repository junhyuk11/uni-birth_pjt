import React from "react";

const Button3 = ({ value, onClick, className, icon }) => {
  return (
    <button
      className={`items-center p-2 text-black hover:bg-yellow-200  ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mr-2">{icon}</div>} {value}
    </button>
  );
};

export default Button3;
