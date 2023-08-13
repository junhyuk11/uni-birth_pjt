import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { SEARTCH_LIST } from "../../constants/constants";
import Search from "../../assets/icons/js/search";

const CustomDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleContainer = useRef(null);

  const handleOutsideClick = (e) => {
    if (
      toggleContainer.current &&
      !toggleContainer.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg border-double bg-transparent font-TAEBAEKmilkyway"
      ref={toggleContainer}
    >
      <div className="relative w-40">
        <button
          className="bg-transparent p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value}
        </button>
        {isOpen && (
          <div className="absolute mt-2 rounded-lg border ">
            {SEARTCH_LIST.map(
              (option) =>
                option.name !== value && (
                  <div
                    className="cursor-pointer p-2 hover:bg-gray-200"
                    key={option.name}
                    onClick={() => {
                      onChange(option.name); // 선택된 값을 부모 컴포넌트에 전달
                      setIsOpen(false);
                    }}
                  >
                    {option.name}
                  </div>
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchHeader = ({ buttons, category, setCategory, query, setQuery }) => {
  const { navigateToSearchCommon } = useNavigation();

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    navigateToSearchCommon(query, category);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // 새 카테고리로 쿼리를 실행하는 로직을 여기에 추가
  };

  return (
    <div className="flex justify-between space-x-4 px-4 py-4">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              key={index}
              className="w-10 font-Pretendard hover:bg-yellow-500"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
      <input
        className="bg-transparent font-Pretendard"
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={handleSearchInputChange}
      />
      <div className="flex flex-col items-center justify-center rounded-lg border-double bg-transparent font-TAEBAEKmilkyway">
        <CustomDropdown value={category} onChange={handleCategoryChange} />
      </div>
      <button className="font-Pretendard" onClick={handleSearch}>
        <Search />
      </button>
    </div>
  );
};

export default SearchHeader;
