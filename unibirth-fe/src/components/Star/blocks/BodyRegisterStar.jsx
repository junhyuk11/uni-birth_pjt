import React from "react";
import Inputbox from "../atoms/InputBox";

const BodyRegisterStar = ({ title, setTitle, content, setContent }) => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex justify-center ">
        <div className="flex flex-col items-center">
          <label className="flex font-Pretendard" htmlFor="InputTitle">
            이름
          </label>
          <input
            className="focus:shadow-outline  mb-1 flex transform items-center justify-center rounded-lg border border-black py-2 text-center font-Pretendard text-base text-black ring-offset-2 ring-offset-current transition duration-500 ease-in-out hover:bg-gray-100 focus:border-purple-500 focus:outline-none focus:ring-2"
            type="text"
            placeholder="이름"
            id="InputTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Inputbox value={content} setContent={setContent} />
      </div>
    </div>
  );
};

export default BodyRegisterStar;