import React, { useState, useEffect } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import { useNavigation } from "../../../hooks/useNavigation";
import ListConstellation from "../blocks/ListConstellation";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import useConstellationApi from "../../../api/useConstellationApi";
import { useParams } from "react-router-dom";

const DetailPlanet = () => {
  const { planetId } = useParams();
  const [constellationList, setConstellationList] = useState({
    constellationList: [],
  });
  const { navigateToMainPlanet, navigateToRegisterConstellation } =
    useNavigation();

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
  const buttonsFooter = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "별자리 만들기",
      onClick: navigateToRegisterConstellation,
    },
  ];
  return (
    <div>
      <div className="absolute z-50 max-w-screen-sm">
        <Header1 buttons={buttonsHeader} />
      </div>
      <div className="h-screen w-screen">
        <div className="w- absolute top-0 h-screen w-screen">
          <ListConstellation constellationList={constellationList} />
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <Footer1 buttons={buttonsFooter} />
        </div>
      </div>
    </div>
  );
};

export default DetailPlanet;
