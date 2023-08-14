// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import ListSectionStar from "../blocks/ListSectionStar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundflagState, nicknameState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import Footer from "../../../common/blocks/Footer";
import { useParams } from "react-router-dom";
import useConstellationApi from "../../../api/useConstellationApi";
import Header1 from "../../../common/blocks/Header1";
import CustomAlert from "../../../common/atoms/CustomAlert";
import HelpCarousel from "../atoms/HelpCarousel";
import SpaceBackground6 from "../atoms/help6.png";
import Button1 from "../../../common/atoms/Button1";
import InviteFollowStar from "../blocks/InviteFollowStar";

const DetailConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(false);
  }, []);
  const { constellationId } = useParams();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [constellationContent, setConstellationConstent] = useState([]);
  const HelpList = [SpaceBackground6];
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getConstellationContent(constellationId);
  }, [constellationId]);

  const getConstellationContent = async (constellationId) => {
    try {
      const response = await useConstellationApi.constellationsGetDetail(
        constellationId,
      );
      if (response.status === 200) {
        setConstellationConstent(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("별자리 정보를 불러오는데 실패했습니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("별자리 정보를 불러오는데 실패했습니다.");
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  console.log("", constellationContent);
  const {
    navigateToBack,
    navigateToMainPlanet,
    navigateToMemberProfile,
    navigateToSearchQuration,
    navigateToLoginMember,
  } = useNavigation();
  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];
  const buttonsFooter = [
    {
      onClick: navigateToSearchQuration,
    },
    {
      onClick: navigateToMainPlanet,
    },
  ];
  const nickname = useRecoilValue(nicknameState);

  const token = sessionStorage.getItem("accessToken");
  const mypageClick = () => {
    navigateToMemberProfile(nickname); // 화면 이동을 처리하는 함수를 호출합니다.
  };
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
      <div className="absolute z-50 max-w-screen-sm">
        <Header1 buttons={buttonsHeader} />
      </div>
      <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-lg bg-transparent p-2  text-white">
        <CustomAlert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => {
            setIsAlertVisible(false);
            if (alertMessage === "별자리 정보를 불러오는데 실패했습니다.") {
              navigateToBack();
            }
          }}
        />
        <div className="my-2 flex items-baseline justify-center text-white">
          <p className="mt-0 text-xl">
            {constellationContent.constellationTitle}
          </p>
          <div className="text-md">&nbsp;자리</div>
        </div>
      </div>
      <div>
        <HelpCarousel HelpList={HelpList} />
      </div>
      {/* dd */}
      <div className="mt-20 flex justify-center ">
        <Button1 value="별자리 초대하기" onClick={toggleModal} />
        {showModal && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
            <div className="max-h-2/4 overflow-y-auto rounded-lg bg-white">
              <button
                onClick={toggleModal}
                className="float-right p-2 hover:bg-gray-200"
              >
                X
              </button>
              <InviteFollowStar />
            </div>
          </div>
        )}
        <Button1 value="별 생성" onClick={createStar} />
      </div>
      {/* dd */}
      <ListSectionStar className="relative left-0 top-0 z-0 h-full w-full" />
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 space-x-4">
        <Footer buttons={buttonsFooter} />
      </div>
    </div>
  );
};

export default DetailConstellation;
