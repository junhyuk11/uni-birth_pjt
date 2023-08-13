import React, { useEffect, useRef } from "react";

const CustomAlert = ({ message, isVisible, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
      <div
        ref={ref}
        className="w-1/3 rounded-md border-2 border-yellow-300 bg-transparent p-5 shadow-lg"
      >
        <p className="mb-3 text-white">{message}</p>
        <button
          className="my-auto inline-flex items-center justify-center rounded-full border border-yellow-300 p-2 text-yellow-100 hover:bg-yellow-200 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
