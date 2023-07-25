import React from "react";

const Dropdown = ({ stellaname, setStellaname }) => {
  // 글자수 제한 필요합니다.

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-double font-TAEBAEKmilkyway">
      <div className=" jsutify-center flex flex-row items-center rounded-full border-4">
        <input
          type="text"
          value={stellaname}
          onChange={(e) => setStellaname(e.target.value)}
        />
        <p>자리</p>
      </div>
    </div>
  );
};

export default Dropdown;
