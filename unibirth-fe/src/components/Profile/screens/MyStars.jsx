import React, { useState, useEffect } from "react";
import Header2 from "../../../common/blocks/Header2";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import useStarApi from "../../../api/useStarApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import { useLocation } from "react-router";
import CustomAlert from "../../../common/atoms/CustomAlert";

const MyStars = () => {
  const { navigateToBack, navigateToDetailStar } = useNavigation();

  const location = useLocation();
  const locationNickname = location.state;
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
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
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white" onClick={() => {}}>
          띄운 별
        </span>
      ),
    },
  ];

  const [starList, setStarList] = useState([]);

  const handleToDetailStar = (starId) => {
    console.log(starId);
    navigateToDetailStar(starId);
  };

  const getStarList = async () => {
    try {
      const response = await useStarApi.starsGetStarList(locationNickname);
      if (response.status === 200) {
        setStarList(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("별 리스트를 불러오는데 실패하였습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("별 리스트를 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    getStarList();
  }, []);

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-0">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "별 리스트를 불러오는데 실패하였습니다.") {
            navigateToBack();
          }
        }}
      />
      <header className="sticky top-0 z-10">
        <Header2 buttons={buttonsHeader} />
      </header>
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
