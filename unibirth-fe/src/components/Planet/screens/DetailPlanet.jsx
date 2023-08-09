import React, { useState, useEffect } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import ListSectionConstellation from "../blocks/ListSectionConstellation";
import { BiSearch } from "react-icons/bi";
import { useNavigation } from "../../../hooks/useNavigation";
import ListConstellation from "../blocks/ListConstellation";
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
    console.log("리스트 컨프리:", response);
    setConstellationList(response.resultData);
  };

  useEffect(() => {
    getConstellationList(planetId);
  }, [planetId]);

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToMainPlanet,
      icon: <BiSearch />,
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
      <div className="relative h-screen w-screen">
        <div className="absolute left-1/2 top-20 z-10 z-10 -translate-x-1/2 -translate-y-1/2">
          <div>
            <Header1 buttons={buttonsHeader} />
          </div>
          <ListSectionConstellation
            constellationList={constellationList}
            setConstellationList={setConstellationList}
            className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform"
          />
          <h1 className="text-white">별자리 리스트 화면입니다.</h1>
          {/* <ConstellationList /> */}
        </div>
        <div className="w- absolute top-0 h-screen w-screen">
          <ListConstellation
            constellationList={constellationList}
            setConstellationList={setConstellationList}
          />
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <Footer1 buttons={buttonsFooter} />
        </div>
      </div>
    </div>
  );
};

export default DetailPlanet;
