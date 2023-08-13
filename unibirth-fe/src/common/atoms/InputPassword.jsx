import React, { useState } from "react";

const InputPassword = ({ onChange }) => {
  const [error, setError] = useState("");

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    if (newPassword.length < 4 && newPassword.length > 0) {
      setError("비밀번호는 최소 4자리 이상이어야 합니다.");
    } else {
      setError("");
      onChange(e);
    }
  };

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
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력하세요"
            autoComplete="off"
          />
          {error && <div className="mt-2 text-red-500">{error}</div>}{" "}
          {/* 에러 메시지 표시 */}
        </div>
      </div>
    </div>
  );
};

export default InputPassword;
