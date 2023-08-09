import React from "react";

const Header1 = ({ buttons }) => {
  return (
<<<<<<< HEAD
    <div className=" h-flex flex-row space-x-4 px-4 py-4">
=======
    <div className="flex flex-row items-center justify-center space-x-4 text-white">
>>>>>>> 0742cd87884f6b166099f15c5c064790561ffc00
      {buttons &&
        buttons.map((button, index) => {
          const ButtonComponent = button.component;
          return (
            <ButtonComponent
              key={index}
<<<<<<< HEAD
              className="w-10 font-Pretendard hover:bg-yellow-500"
=======
              className="font-TAEBAEKmilkyway text-white"
>>>>>>> 0742cd87884f6b166099f15c5c064790561ffc00
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
