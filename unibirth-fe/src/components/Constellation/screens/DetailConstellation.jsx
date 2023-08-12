import React from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import ListSectionStar from "../blocks/ListSectionStar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundflagState, nicknameState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import Footer from "../../../common/blocks/Footer";

const DetailConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(false);
  const {
    navigateToBack,
    navigateToMainPlanet,
    navigateToMemberProfile,
    navigateToSearchQuration,
    navigateToLoginMember,
  } = useNavigation();
  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];
  const buttonsFooter = [
    {
      onClick: navigateToSearchQuration,
    },
    {
      onClick: navigateToMainPlanet,
    },
  ];
  const nickname = useRecoilValue(nicknameState);

  const token = sessionStorage.getItem("accessToken");
  const mypageClick = () => {
    navigateToMemberProfile(nickname); // 화면 이동을 처리하는 함수를 호출합니다.
  };
  if (token === null) {
    buttonsFooter.push({
      onClick: navigateToLoginMember,
    });
  } else {
    buttonsFooter.push({
      onClick: mypageClick,
    });
  }
  return (
    <div>
      <div className="absolute z-50 max-w-screen-sm">
        <Header1 buttons={buttonsHeader} />
      </div>
      <ListSectionStar className="relative left-0 top-0 z-0 h-full w-full" />
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 space-x-4">
        <Footer buttons={buttonsFooter} />
      </div>
    </div>
  );
};

export default DetailConstellation;
