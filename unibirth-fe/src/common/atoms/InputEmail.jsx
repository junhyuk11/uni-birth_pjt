import React from "react";
const InputEmail = ({ onChange }) => {
  return (
    <div className="flex w-full items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="email"
          className="inline-block w-20 
          font-bold text-gray-600"
        >
          Email
        </label>
        <div className="mt-2 w-full">
          <input
            className="flex-1 border-b-2 border-gray-400 py-2 text-gray-600 
            placeholder-gray-400 outline-none
            focus:border-yellow-200"
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            placeholder="email을 입력하세요"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default InputEmail;
