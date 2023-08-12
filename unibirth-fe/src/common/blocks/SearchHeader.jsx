import React from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { SEARTCH_LIST } from "../../constants/constants";
import Search from "../../assets/icons/js/search";

const SearchHeader = ({ buttons, category, setCategory, query, setQuery }) => {
  const { navigateToSearchCommon } = useNavigation();

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    navigateToSearchCommon(query, category);
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
        className="font-Pretendard "
        type="text"
        placeholder="검색어를 입력하세요"
        value={query}
        onChange={handleSearchInputChange}
      />
      <div className="flex flex-col items-center justify-center rounded-lg border-double font-TAEBAEKmilkyway">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {SEARTCH_LIST.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button className="font-Pretendard" onClick={handleSearch}>
        <Search />
      </button>
    </div>
  );
};

export default SearchHeader;
