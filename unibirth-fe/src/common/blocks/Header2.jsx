import React from "react"; // useState
// import Search from "../../assets/icons/js/search";

const Header2 = ({ buttons }) => {
  // const [searchKeyword, setSearchKeyword] = useState("");

  // const handleSearchInputChange = (e) => {
  //   setSearchKeyword(e.target.value);
  // };

  // const handleSearch = () => {
  //   console.log("검색어:", searchKeyword);
  // };

  return (
    <div className="flex justify-between space-x-4 px-2 py-4">
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
      {/* <div className="flex items-center space-x-4 border-b-2">
        <input
          className="bg-transparent px-2 py-2  text-yellow-200 outline-none "
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchKeyword}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>
          <Search />
        </button>
      </div> */}
    </div>
  );
};

export default Header2;
