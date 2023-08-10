import React, { useEffect, useState } from "react";
import usePlanetApi from "../../../api/usePlanetApi";
import { AiFillStar } from "react-icons/ai";
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
            <div key={index} className="h-48 overflow-hidden rounded-lg">
              <img
                className="rounded-lg"
                src={List.imageUrl}
                alt={`Slide ${index}`}
              />
              <div>
                <div className="flex justify-end">
                  <div className="text-1xl absolute top-2 mr-4 flex-none font-TAEBAEKmilkyway text-gray-300">
                    <AiFillStar color="yellow" className="mr-1 inline" />
                    {List.brightness}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="text-1xl absolute top-2 ml-4 flex-auto rounded-lg bg-black bg-opacity-75 pl-2 pr-2 font-TAEBAEKmilkyway font-bold text-gray-300 ">
                    @{List.nickname}
                  </div>
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
