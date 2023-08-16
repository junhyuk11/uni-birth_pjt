import React from "react";

const Button1 = ({ value, onClick, className, icon, disabled }) => {
  return (
    <button
      className={`mx-auto my-auto inline-flex items-center justify-center rounded-full border border p-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <div className="mx-auto">{icon}</div>} {value}
    </button>
  );
};

export default Button1;
