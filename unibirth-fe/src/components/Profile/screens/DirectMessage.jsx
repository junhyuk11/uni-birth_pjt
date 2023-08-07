import React from "react";
import Button2 from "../../../common/atoms/Button2";
import Button3 from "../../../common/atoms/Button3";
import Header1 from "../../../common/blocks/Header1";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "../../../hooks/useNavigation";
import { Canvas } from "@react-three/fiber";
import GradientBackground from "../../../common/atoms/GradientBackground";
import CanvasBg from "../../../common/atoms/CanvasBg";

const DirectMessage = () => {
  const { navigateToBack } = useNavigation();
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <IoIosArrowBack />,
    },
    {
      component: () => (
        <img
          src="https://picsum.photos/200"
          className="h-12 w-12 rounded-full"
          alt="Round image"
        />
      ),
    },
    {
      component: Button3,
      className: "font-TAEBAEKmilkyway",
      value: "감자123",
    },
  ];

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute flex h-full w-full flex-row flex-wrap justify-center">
        <Canvas>
          <GradientBackground />
          <CanvasBg />
        </Canvas>
      </div>
      <div className="absolute left-1/2 top-20 z-10 -translate-x-1/2 text-white">
        <Header1 buttons={buttonsHeader} />
        <h1>1대1 메시지 공간입니다..</h1>
      </div>
    </div>
  );
};

export default DirectMessage;
