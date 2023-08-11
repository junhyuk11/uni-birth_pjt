import React, { useEffect, useState } from "react";
import usePlanetApi from "../../../api/usePlanetApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useNavigation } from "../../../hooks/useNavigation";

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
  const { navigateToDetailStar } = useNavigation();

  const handleMoveClick = (List) => {
    navigateToDetailStar(List.starId);
  };

  return (
    <div className="absolute left-1/2 top-4 z-20 h-48 w-60 -translate-x-1/2 rounded-lg">
      <div className="relative rounded-lg">
        <Slider {...settings}>
          {Lists?.map((List, index) => (
            <div key={index} className="h-40 overflow-hidden rounded-lg">
              <img
                className="rounded-lg"
                src={List.imageUrl}
                alt={`Slide ${index}`}
              />
              <div>
                <div className="text-1xl text-bold absolute bottom-2 flex font-TAEBAEKmilkyway text-white">
                  닉네임: {List.nickname}
                </div>
                <div className="text-1xl absolute top-4 flex bg-red-500 font-TAEBAEKmilkyway">
                  밝기: {List.brightness}
                </div>
                <div className="flex justify-center">
                  <button
                    className="absolute bottom-4 w-24 rounded-full bg-blue-500 text-white"
                    onClick={() => handleMoveClick(List)}
                  >
                    이동하기
                  </button>
                </div>
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
      // 인덱스가 0~7, 실제 행성은 1~8 이므로 접근은 +1 로 한다
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
