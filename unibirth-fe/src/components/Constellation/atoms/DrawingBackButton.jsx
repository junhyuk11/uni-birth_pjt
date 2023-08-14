import React from "react";

const DrawingBackButton = ({ value, onClick, className, icon }) => {
  return (
    <button
      className={`yellow mb-8 ml-6 flex flex-col items-center rounded-full border border-yellow-300 p-2.5 text-center text-sm font-medium text-white hover:bg-yellow-200 hover:fill-cyan-700`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#FDFFB1"
        strokeWidth="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M10 16l-6-6 6-6" />
        <path d="M20 21v-7a4 4 0 0 0-4-4H5" />
      </svg>
    </button>
  );
};

export default DrawingBackButton;
