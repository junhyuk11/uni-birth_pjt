import React, { useEffect } from "react";
import useConstellationApi from "../../../api/useConstellationApi";
// import { useNavigation } from "../../../hooks/useNavigation";
import { useParams } from "react-router-dom";
const ListSectionConstellation = ({ setConstellationList }) => {
  const { planetId } = useParams();
  // const { navigateToDetailConstellation } = useNavigation();
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

  return <div></div>;
};

export default ListSectionConstellation;
