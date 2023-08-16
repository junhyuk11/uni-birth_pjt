import React from "react";

const Button5 = ({ value, onClick, className, icon }) => {
  return (
    <button
      className={`my-auto inline-flex items-center justify-center rounded-full border  p-2 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mx-auto">{icon}</div>} {value}
    </button>
  );
};

export default Button5;
