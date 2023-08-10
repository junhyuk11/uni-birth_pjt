import React from "react";

const Button1 = ({ value, onClick, className, icon }) => {
  return (
    <button
      className={`mx-auto my-auto inline-flex items-center justify-center rounded-full border border-yellow-300 p-2 text-yellow-100 hover:bg-yellow-200 hover:text-[#292524] focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {icon && <div className="mx-auto">{icon}</div>} {value}
    </button>
  );
};

export default Button1;
