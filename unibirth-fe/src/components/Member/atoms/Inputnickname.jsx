import React from "react";

const Inputnickname = ({ onChange }) => {
  return (
    <div className="w-full flex-initial items-center justify-center font-Pretendard">
      <div className="w-full flex-row">
        <label
          htmlFor="nickname"
          className="inline-block w-24 font-bold text-gray-200"
        >
          닉네임
        </label>
        <div className="mt-2 flex-row">
          <input
            className="flex-1 flex-row border-b-2 border-gray-400 bg-transparent py-2 text-yellow-200 
        placeholder-gray-400 outline-none
        focus:border-yellow-200"
            type="text"
            name="nickname"
            onChange={onChange}
            placeholder="닉네임을 입력하세요"
            autoComplete="off"
            id="nickname"
          />
        </div>
      </div>
    </div>
  );
};

export default Inputnickname;
