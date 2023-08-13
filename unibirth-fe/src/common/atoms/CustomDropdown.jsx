import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({ value, onChange, searchList }) => {
  // valie 처음 값, onchange 값이 바뀔때마다 실행되는 함수, searchList 검색할 리스트
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
      className="flex flex-col items-center justify-center rounded-lg border-double bg-transparent font-TAEBAEKmilkyway text-white"
      ref={toggleContainer}
    >
      <div className="relative w-40 text-white">
        <button
          className="bg-transparent p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value}
        </button>
        <div
          className={`absolute mt-2 rounded-lg ${
            isOpen
              ? "visible opacity-100 transition-all duration-300 ease-out"
              : "invisible opacity-0 transition-all duration-300 ease-out"
          }`}
        >
          {isOpen && (
            <div className="absolute mt-2 rounded-lg border ">
              {searchList.map(
                (option) =>
                  option.name !== value && (
                    <div
                      className="cursor-pointer p-2 hover:bg-gray-200
                      hover:text-black"
                      key={option.planetId - 1}
                      onClick={() => {
                        onChange(option.planetId - 1); // 선택된 값을 부모 컴포넌트에 전달
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
    </div>
  );
};

export default CustomDropdown;
