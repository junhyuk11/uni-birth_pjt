import React, { useEffect } from "react";
import Footer1 from "../../../common/blocks/Footer1";
import Button1 from "../../../common/atoms/Button1";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
// import { Canvas } from "@react-three/fiber";
// // import Space from "../blocks/Space";

const Home = () => {
  const [backgroundflag, setBackgroundflag] =
    useRecoilState(backgroundflagState);
  useEffect(() => {
    setBackgroundflag(true);
  }, [backgroundflag]);
  const { navigateToMainPlanet, navigateToLoginMember } = useNavigation();

  const buttons = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "시작하기",
      onClick: navigateToMainPlanet,
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "로그인",
      onClick: navigateToLoginMember,
    },
  ];

  return (
    <div className="relative h-screen w-screen">
      <p className="absolute left-1/3 top-10 z-10 font-TAEBAEKmilkyway text-2xl text-white">
        세상에서 가장 빛나는 너의 별
      </p>
      <p className="absolute left-1/3 top-20 z-10 font-TAEBAEKmilkyway text-4xl text-white">
        uni-Birth
      </p>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform">
        <Footer1 buttons={buttons} />
      </div>
    </div>
  );
};

export default Home;
