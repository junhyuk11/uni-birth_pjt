import React, { useRef } from "react";

const CustomConfirm = ({ message, isVisible, onClose, onConfirm }) => {
  const ref = useRef(null);

  if (!isVisible) return null;

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-40">
      <div
        ref={ref}
        className="flex flex-col rounded-md border-2 border-yellow-300 bg-transparent p-5 shadow-lg"
      >
        <p className="mb-3 flex items-center justify-center text-center text-white">
          {message}
        </p>
        <div className="flex flex-row justify-center space-x-4">
          <button
            className="my-auto inline-flex w-12 items-center justify-center rounded-xl border border-yellow-300 p-2 text-yellow-100 hover:bg-yellow-200 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2"
            onClick={onConfirm}
          >
            확인
          </button>
          <button
            className="my-auto inline-flex w-12 items-center justify-center rounded-xl border border-yellow-300 p-2 text-yellow-100 hover:bg-yellow-200 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-offset-2"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirm;
