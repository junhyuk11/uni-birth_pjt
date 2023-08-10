import React, { useState, useEffect } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "../../../hooks/useNavigation";
import useStarApi from "../../../api/useStarApi";
import { useLocation } from "react-router";

const MyStars = () => {
  const { navigateToBack, navigateToDetailStar } = useNavigation();

  const location = useLocation();
  const locationNickname = location.state;

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <IoIosArrowBack />,
    },
  ];

  const [starList, setStarList] = useState([]);

  const handleToDetailStar = (starId) => {
    console.log(starId);
    navigateToDetailStar(starId);
  };

  const getStarList = async () => {
    const response = await useStarApi.starsGetStarList(locationNickname);
    console.log(response);
    setStarList(response.resultData);
  };

  useEffect(() => {
    getStarList();
  }, []);

  return (
    <div>
      <Header2 buttons={buttonsHeader} />
      <div className="flex flex-col items-center">
        {starList.map((star) => (
          <div
            key={star.starId}
            className="my-4 flex items-center"
            onClick={() => handleToDetailStar(star.starId)}
          >
            <img
              src={star.imageUrl}
              className="avatar mr-4 h-32 w-32 object-cover"
              alt="User Avatar"
            />
            <div className="text-white">
              <p>{star.title} 자리</p>
              <p>{star.content}</p>
              <p>{formatDate(star.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyStars;
