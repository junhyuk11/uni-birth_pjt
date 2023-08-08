import React, { useEffect, useState } from "react";
import usePlanetApi from "../../../api/usePlanetApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Carousel = ({ Lists }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000,
  };

  return (
    <div className="absolute left-1/2 top-4 z-20 w-60 -translate-x-1/2 rounded-lg bg-gray-500">
      <div className="relative">
        <Slider {...settings}>
          {Lists?.map((List, index) => (
            <div key={index} className="px-4">
              <img src={List.imageUrl} alt={`Slide ${index}`} />
              <div className="text-1xl text-bold absolute bottom-16 font-TAEBAEKmilkyway text-white">
                starId: {List.starId}
              </div>
              <div className="font-TAEBAEKmilkyway text-2xl">
                닉네임: {List.nickname}
              </div>
              <div className="font-TAEBAEKmilkyway text-2xl">
                밝기: {List.brightness}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

const ListBestStars = () => {
  const [Lists, setLists] = useState([]);
  const planetId = 1;
  useEffect(() => {
    getBestList(planetId);
    // console.log("BestList:", BestList);
  }, [planetId]);

  useEffect(() => {}, [Lists]);

  const getBestList = async (planetId) => {
    try {
      const response = await usePlanetApi.planetsGetStarList(planetId);
      // console.log(response);
      const Lists = response.resultData.starList;
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
