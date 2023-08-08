import React, { useState } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { BiSearch } from "react-icons/bi";
import { useNavigation } from "../../../hooks/useNavigation";
import GridCustomConstellation from "../blocks/GridCustomConstellation";
import ListTemplateModalConstellation from "../blocks/ListTemplateModalConstellation";
import { useLocation } from "react-router";
const DrawingConstellation = () => {
  const location = useLocation();
  const { planetId, constellationName, constellationDescp } = location.state;
  const { navigateToBack } = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pointList, setPointList] = useState([]);
  const [lineList, setLineList] = useState([]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <BiSearch />,
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "템플릿",
      onClick: handleModalOpen,
    },
  ];

  return (
    <div>
      <Header1 buttons={buttonsHeader} />
      <GridCustomConstellation
        planetId={planetId}
        constellationName={constellationName}
        constellationDescp={constellationDescp}
        pointList={pointList}
        lineList={lineList}
      />
      {isModalOpen && (
        <ListTemplateModalConstellation
          setIsModalOpen={setIsModalOpen}
          setPointList={setPointList}
          setLineList={setLineList}
        />
      )}
    </div>
  );
};

export default DrawingConstellation;
