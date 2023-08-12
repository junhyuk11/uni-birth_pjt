import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import ListConstellation from "../blocks/ListConstellation";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import useConstellationApi from "../../../api/useConstellationApi";
import { useParams } from "react-router-dom";
import Footer from "../../../common/blocks/Footer";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";

const DetailPlanet = () => {
  const { planetId } = useParams();
  const [constellationList, setConstellationList] = useState({
    constellationList: [],
  });
  const {
    navigateToMainPlanet,
    navigateToSearchQuration,
    navigateToMemberProfile,
    navigateToLoginMember,
  } = useNavigation();

  const getConstellationList = async (planetId) => {
    const response = await useConstellationApi.constellationsGetPlanet(
      planetId,
    );
    setConstellationList(response.resultData);
  };

  useEffect(() => {}, [constellationList]);

  useEffect(() => {
    getConstellationList(planetId);
  }, [planetId]);

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToMainPlanet,
      icon: <LeftArrow />,
    },
  ];
  const nickname = useRecoilValue(nicknameState);
  const mypageClick = () => {
    navigateToMemberProfile(nickname); // 화면 이동을 처리하는 함수를 호출합니다.
  };
  const buttonsFooter = [
    {
      onClick: navigateToSearchQuration,
    },
    {
      onClick: navigateToMainPlanet,
    },
  ];
  const token = sessionStorage.getItem("accessToken");
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
      <div className="h-screen w-screen">
        <div className="w- absolute top-0 h-screen w-screen">
          <ListConstellation constellationList={constellationList} />
        </div>
        <div className="fixed bottom-10 left-1/2 z-10 -translate-x-1/2">
          <Footer buttons={buttonsFooter} />
        </div>
      </div>
    </div>
  );
};

export default DetailPlanet;
