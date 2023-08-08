import React from "react";
const InputEmail = ({ onChange }) => {
  return (
    <div className="flex w-full items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="email"
          className="inline-block w-20 
          font-bold text-gray-100"
        >
          이메일
        </label>
        <div className="mt-2 w-full">
          <input
            className="w-full flex-1 border-b-2 border-gray-400 bg-transparent py-2 text-yellow-200 
            placeholder-gray-400 outline-none
            focus:border-yellow-200"
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            placeholder="이메일을 입력하세요"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default InputEmail;
