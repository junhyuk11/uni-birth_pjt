import React from "react";

const Inputnickname = ({ onChange }) => {
  return (
    <div className="w-full flex-initial items-center justify-center font-Pretendard">
      <div className="w-full flex-row">
        <label htmlFor="nickname">Nickname</label>
        <div className="mt-2 flex-row">
          <input
            className="w-full flex-1 flex-row border-b-2 border-gray-400 py-2 text-gray-600 
        placeholder-gray-400 outline-none
        focus:border-yellow-200"
            type="text"
            name="nickname"
            onChange={onChange}
            placeholder="nickname"
            autoComplete="off"
            id="nickname"
          />
        </div>
      </div>
    </div>
  );
};

export default Inputnickname;
