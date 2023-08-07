import React from "react";

const Header1 = ({ buttons }) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-4 text-white">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              key={index}
              className="font-TAEBAEKmilkyway text-white"
              value={button.value}
              onClick={button.onClick}
              icon={button.icon}
            />
          );
        })}
    </div>
  );
};

export default Header1;
