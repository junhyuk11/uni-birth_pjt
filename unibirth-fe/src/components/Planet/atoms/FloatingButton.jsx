import React, { useState } from "react";
import { animated, useSpring } from "@react-spring/web";

const FloatingButton = ({ children }) => {
  const [isClicked, setIsClicked] = useState(false);
  const props = useSpring({
    transform: isClicked ? "translateY(0px)" : "translateY(50px)",
  });

  return (
    <div>
      <button
        onClick={() => setIsClicked(!isClicked)}
        className="rounded-full bg-blue-500 p-4 text-white focus:outline-none"
      >
        클릭하세요!
      </button>
      <animated.div style={props}>{children}</animated.div>
    </div>
  );
};

export default FloatingButton;
