import React from "react";

const Header4 = ({ buttons }) => {
  return (
    <div className="flex flex-col px-4 py-2">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              key={index}
              className="m-2 w-40 p-2 font-Pretendard hover:bg-yellow-500"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
    </div>
  );
};

export default Header4;
