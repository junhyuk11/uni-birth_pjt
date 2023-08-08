import React, { useEffect, useState } from "react";
import planetsGetStarList from "../../../api/usePlanetBestLikes";

const ListBestStars = () => {
  useEffect(() => {
    getBestList(1);
  }, []);

  const [BestList, setBestList] = useState([]);
  const getBestList = async (planetId) => {
    try {
      const response = await planetsGetStarList(planetId);
      console.log(response);
      setBestList(response.resultData);
    } catch (e) {
      console.log("planet_error:", e);
    }
  };
  console.log("BestList:", BestList);

  return <div className="absolute top-10 z-10 text-white">뭐하는데</div>;
};

export default ListBestStars;
