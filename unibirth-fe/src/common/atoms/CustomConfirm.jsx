import React from "react";

const CustomConfirm = ({ message, onConfirm, onCancel, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="z-60 fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="z-70 rounded bg-white p-4 shadow-md">
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onCancel} className="mr-2">
            취소
          </button>
          <button
            onClick={onConfirm}
            className="rounded bg-blue-500 p-2 text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirm;
