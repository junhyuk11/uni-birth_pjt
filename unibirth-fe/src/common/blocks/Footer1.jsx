import React from "react";

const Footer1 = ({ buttons }) => {
  return (
    <footer className="mt-auto flex flex-row items-center justify-center space-x-7 ">
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              key={index}
              className="font-TAEBAEKmilkyway"
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
