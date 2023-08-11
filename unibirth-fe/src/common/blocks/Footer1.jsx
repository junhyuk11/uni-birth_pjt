import React from "react";

const Footer1 = ({ buttons }) => {
  return (
    <footer className="mt-10 flex flex-row items-center justify-between">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;

          return (
            <ButtonComponent
              key={index}
              className="mt-24 w-36 font-Pretendard"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
    </footer>
  );
};

export default Footer1;
