import React from "react";

const Button5 = ({ value, onClick, className, icon }) => {
  return (
    <button
      className={`my-auto inline-flex items-center justify-center rounded-full border border-yellow-300 p-2 text-yellow-100 hover:bg-yellow-200 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mx-auto">{icon}</div>} {value}
    </button>
  );
};

export default Button5;
