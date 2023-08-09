import React, { useEffect, useState } from "react";
import usePlanetApi from "../../../api/usePlanetApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = ({ Lists }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const handleMoveClick = (List) => {
    console.log("List:", List);
  };

  return (
    <div className="absolute left-1/2 top-4 z-20 h-48 w-60 -translate-x-1/2 rounded-lg">
      <div className="relative">
        <Slider {...settings}>
          {Lists?.map((List, index) => (
            <div key={index} className="flex flex-col rounded-lg">
              <img
                className="flex rounded-lg"
                src={List.imageUrl}
                alt={`Slide ${index}`}
              />
              <div>
                <div className="text-1xl text-bold bottom-2 flex font-TAEBAEKmilkyway text-white">
                  닉네임: {List.nickname}
                </div>
                <div className="text-1xl top-4 flex bg-red-500 font-TAEBAEKmilkyway">
                  밝기: {List.brightness}
                </div>
                <button
                  className="bottom-4 w-24 rounded-full bg-blue-500"
                  onClick={() => handleMoveClick(List)}
                >
                  이동하기
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const ListBestStars = ({ currentPlanet }) => {
  const [Lists, setLists] = useState([]);
  useEffect(() => {
    getBestList(currentPlanet);
    // console.log("BestList:", BestList);
  }, [currentPlanet]);

  useEffect(() => {}, [Lists]);

  const getBestList = async (planetId) => {
    console.log(planetId);
    try {
      // 인덱스가 0 이므로 접근은 +1 로 한다
      const response = await usePlanetApi.planetsGetStarList(planetId + 1);
      const Lists = response.resultData.starList;
      console.log("planet:", response.resultData);
      setLists(Lists);
    } catch (e) {
      console.log("planet_error:", e);
    }
  };

  console.log(Lists);

  return (
    <div>
      <Carousel Lists={Lists} />
    </div>
  );
};

export default ListBestStars;
