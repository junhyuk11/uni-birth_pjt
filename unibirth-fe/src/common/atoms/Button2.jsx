import React from "react";

const Button2 = ({ onClick, value, className, icon }) => {
  return (
    <button
      className={`left-0 inline-flex rounded-full border border-transparent p-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mx-auto">{icon}</div>} {value}
    </button>
  );
};

export default Button2;
