import React from "react";

const Button2 = ({ onClick, value, className, icon }) => {
  return (
    <button
      className={`left-0 inline-flex rounded-full border border-transparent bg-indigo-600 p-2 text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mr-2">{icon}</div>} {value}
    </button>
  );
};

export default Button2;
