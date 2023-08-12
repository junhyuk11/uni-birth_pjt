import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import ListConstellation from "../blocks/ListConstellation";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import useConstellationApi from "../../../api/useConstellationApi";
import { useParams } from "react-router-dom";
import Footer from "../../../common/blocks/Footer";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";
import CustomAlert from "../../../common/atoms/CustomAlert";

const DetailPlanet = () => {
  const { planetId } = useParams();
  const [constellationList, setConstellationList] = useState({
    constellationList: [],
  });
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const {
    navigateToMainPlanet,
    navigateToSearchQuration,
    navigateToMemberProfile,
    navigateToLoginMember,
    navigateToBack,
  } = useNavigation();

  const getConstellationList = async (planetId) => {
    try {
      const response = await useConstellationApi.constellationsGetPlanet(
        planetId,
      );
      if (response.status === 200) {
        setConstellationList(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("별자리 리스트를 불러오는데 실패하였습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("별자리 리스트를 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {}, [constellationList]);

  useEffect(() => {
    getConstellationList(planetId);
  }, [planetId]);

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToMainPlanet,
      icon: <LeftArrow />,
    },
  ];
  const nickname = useRecoilValue(nicknameState);
  const mypageClick = () => {
    navigateToMemberProfile(nickname); // 화면 이동을 처리하는 함수를 호출합니다.
  };
  const buttonsFooter = [
    {
      onClick: navigateToSearchQuration,
    },
    {
      onClick: navigateToMainPlanet,
    },
  ];
  const token = sessionStorage.getItem("accessToken");
  if (token === null) {
    buttonsFooter.push({
      onClick: navigateToLoginMember,
    });
  } else {
    buttonsFooter.push({
      onClick: mypageClick,
    });
  }

  return (
    <div>
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "별자리 리스트를 불러오는데 실패하였습니다.") {
            navigateToBack();
          }
        }}
      />
      <div className="absolute z-50 max-w-screen-sm">
        <Header1 buttons={buttonsHeader} />
      </div>
      <div className="h-screen w-screen">
        <div className="w- absolute top-0 h-screen w-screen">
          <ListConstellation constellationList={constellationList} />
        </div>
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
          <Footer buttons={buttonsFooter} />
        </div>
      </div>
    </div>
  );
};

export default DetailPlanet;
