import React, { useState } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import InputDropdown from "../atoms/InputDropdown";
import InputStella from "../atoms/InputStella";
import InputDescription from "../atoms/InputDescription";
import { useNavigation } from "../../../hooks/useNavigation";
import planet1 from "../../../assets/images/planet1.png";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";

const RegistConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(true);
  const [planetId, setPlanetId] = useState("1");
  const [constellationName, setConstellationName] = useState("");
  const [constellationDescp, setConstellationDescp] = useState("");
  const { navigateToBack, navigateToDrawingConstellation } = useNavigation();

  const handleSubmit = () => {
    console.log(planetId, constellationName, constellationDescp);
    console.log(planetId);
    if (planetId && constellationName && constellationDescp) {
      console.log("행성명: ", planetId);
      console.log("별자리명: ", constellationName);
      console.log("별자리설명: ", constellationDescp);
      navigateToDrawingConstellation({
        planetId,
        constellationName,
        constellationDescp,
      });
    } else if (constellationName) {
      console.log("행성명: ", planetId);
      console.log("별자리명: ", constellationName);
      console.log("별자리설명: ", constellationDescp);
      alert("별자리를 설명해주세요 ! ");
    } else {
      console.log("행성명: ", planetId);
      console.log("별자리명: ", constellationName);
      console.log("별자리설명: ", constellationDescp);
      alert("별자리를 입력해주세요 ! ");
    }
  };
  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white" onClick={() => {}}>
          별자리 그리기
        </span>
      ),
    },
  ];
  const buttonsFooter = [
    {
      component: Button1,
      className: "font-Pretendard",
      value: "별자리 그리기",
      onClick: handleSubmit,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm  bg-slate-100 bg-opacity-50">
      <div>
        <Header1 buttons={buttonsHeader} />
        <div className="mt-24 flex flex-col items-center justify-center space-y-10">
          <img
            src={planet1}
            alt="행성1 이미지 예시"
            className="flex items-center justify-center rounded-full"
          />
          <p className="font-Pretendard text-white">행성 명</p>

          <InputDropdown planetId={planetId} setPlanetId={setPlanetId} />
          <InputStella
            constellationName={constellationName}
            setConstellationName={setConstellationName}
          />
          <InputDescription
            constellationDescp={constellationDescp}
            setConstellationDescp={setConstellationDescp}
          />
        </div>
        <Footer1
          buttons={buttonsFooter}
          planetId={planetId}
          constellationDescp={constellationDescp}
          constellationName={constellationName}
        />
      </div>
    </div>
  );
};

export default RegistConstellation;
