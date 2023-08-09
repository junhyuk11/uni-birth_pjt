import React from "react";
import Button2 from "../../../common/atoms/Button2";
import Header2 from "../../../common/blocks/Header2";
import { IoIosArrowBack } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigation } from "../../../hooks/useNavigation";
import { Canvas } from "@react-three/fiber";
import GradientBackground from "../../../common/atoms/GradientBackground";
import CanvasBg from "../../../common/atoms/CanvasBg";

const MessageBox = () => {
  const { navigateToBack } = useNavigation();
  const { navigateToDirectMessage } = useNavigation();
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <IoIosArrowBack />,
    },
  ];
  const users = [
    {
      id: 1,
      name: "김민섭",
      profileImageUrl: "https://picsum.photos/200",
    },
    {
      id: 2,
      name: "정준혁",
      profileImageUrl: "https://picsum.photos/190",
    },
    {
      id: 3,
      name: "이성섭",
      profileImageUrl: "https://picsum.photos/21",
    },
    {
      id: 1,
      name: "김민섭",
      profileImageUrl: "https://picsum.photos/200",
    },
    {
      id: 2,
      name: "정준혁",
      profileImageUrl: "https://picsum.photos/190",
    },
    {
      id: 3,
      name: "이성섭",
      profileImageUrl: "https://picsum.photos/21",
    },
    {
      id: 1,
      name: "김민섭",
      profileImageUrl: "https://picsum.photos/200",
    },
    {
      id: 2,
      name: "정준혁",
      profileImageUrl: "https://picsum.photos/190",
    },
    {
      id: 3,
      name: "이성섭",
      profileImageUrl: "https://picsum.photos/21",
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
        <Header2 buttons={buttonsHeader} />
        <h1>메시지 박스입니다..</h1>
        {users.map((user) => (
          <div key={user.id} className="flex items-start space-x-4">
            <img
              src={user.profileImageUrl}
              className="h-32 w-32 rounded-full"
              alt="Round image"
            />
            <div className="flex h-32 items-center">
              <p className="text-lg font-bold ">{user.name}</p>
            </div>
            <button
              className="flex h-32 w-48 items-center "
              onClick={navigateToDirectMessage}
            >
              <CiLocationArrow1 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
