import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const Header2 = ({ buttons }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearch = () => {
    console.log("검색어:", searchKeyword);
  };

  return (
    <div className="flex justify-between space-x-4 px-4 py-4">
      <div className="flex items-center">
        {buttons &&
          buttons.map((button, index) => {
            const ButtonComponent = button.component;
            return (
              <ButtonComponent
                key={index}
                className="w-10 font-Pretendard"
                value={button.value}
                onClick={button.onClick}
                icon={button.icon}
              />
            );
          })}
      </div>
      <div className="flex items-center space-x-4">
        <input
          className="font-Pretendard"
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>
          <BiSearchAlt />
        </button>
      </div>
    </div>
  );
};

export default Header2;
