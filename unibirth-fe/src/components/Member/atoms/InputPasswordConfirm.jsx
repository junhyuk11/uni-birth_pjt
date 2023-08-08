import React from "react";

const InputPasswordConfirm = ({ onChange }) => {
  return (
    <div className="flex w-full items-center justify-center font-Pretendard">
      <div className="w-full">
        <label
          htmlFor="confirmPassword"
          className="inline-block w-24 font-bold text-gray-600"
        >
          비밀번호 확인
        </label>
        <div className="mt-2 w-full">
          <input
            className="w-full flex-1 border-b-2 border-gray-400 py-2 text-gray-600 
        placeholder-gray-400 outline-none
        focus:border-yellow-200"
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            onChange={onChange}
            placeholder="비밀번호 확인"
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
};

export default InputPasswordConfirm;
