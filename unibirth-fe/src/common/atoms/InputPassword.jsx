import React from "react";

const InputPassword = ({ onChange }) => {
  return (
    <div className="mr-2 flex w-1/2 items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="password"
          className="inline-block w-20 font-bold text-gray-200"
        >
          비밀번호
        </label>
        <div className="mt-2">
          <input
            className="w-full flex-1 border-b-2 border-gray-400 bg-transparent py-2 text-yellow-200 
          placeholder-gray-400 outline-none
          focus:border-yellow-200"
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="비밀번호를 입력하세요"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default InputPassword;
