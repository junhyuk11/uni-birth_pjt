import React from "react";
import Home from "../../assets/icons/js/home";
import Right from "../../assets/icons/js/right";
import Left from "../../assets/icons/js/left";

const Footer = ({ buttons }) => {
  return (
    <footer className="mt-16 flex flex-row items-center justify-between space-x-4">
      <button
        className="flex items-center"
        value={buttons[0].value}
        onClick={buttons[0].onClick}
      >
        <Left className="h-20 w-20 font-Pretendard" />
      </button>
      <button
        className="flex items-center"
        value={buttons[1].value}
        onClick={buttons[1].onClick}
      >
        <Home className="h-20 w-20 font-Pretendard" />
      </button>
      <button
        className="flex items-center"
        value={buttons[2].value}
        onClick={buttons[2].onClick}
      >
        <Right className="h-20 w-20 font-Pretendard" />
      </button>
    </footer>
  );
};

export default Footer;
