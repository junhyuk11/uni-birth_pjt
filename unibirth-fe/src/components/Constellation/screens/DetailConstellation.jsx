// import React, { useState } from "react";
import React, { useEffect, useState } from "react";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
// import Button1 from "../../../common/atoms/Button1";
import ListSectionStar from "../blocks/ListSectionStar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundflagState, nicknameState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
// import InviteFollowStar from "../../Star/blocks/InviteFollowStar";
import Footer from "../../../common/blocks/Footer";
import { useParams } from "react-router-dom";
import useConstellationApi from "../../../api/useConstellationApi";
import Header1 from "../../../common/blocks/Header1";

const DetailConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(false);
  const { constellationId } = useParams();
  console.log(constellationId);
  const [constellationContent, setConstellationConstent] = useState([]);
  useEffect(() => {
    getConstellationContent(constellationId);
  }, [constellationId]);

  const getConstellationContent = async (constellationId) => {
    try {
      const response = await useConstellationApi.constellationsGetDetail(
        constellationId,
      );
      setConstellationConstent(response.resultData);
    } catch (error) {
      console.log(error);
    }
  };
  const {
    navigateToBack,
    // navigateToRegisterStar,
    navigateToMainPlanet,
    navigateToMemberProfile,
    navigateToSearchQuration,
    navigateToLoginMember,
  } = useNavigation();
  // const [showModal, setShowModal] = useState(false);

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };
  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    // {
    //   component: () => (
    //     <div className="my-2 flex items-baseline justify-center text-white">
    //       <p className="mt-0 text-lg">
    //         {constellationContent.constellationTitle}
    //       </p>
    //       <div className="bottom-0 text-sm">&nbsp;자리</div>
    //     </div>
    //   ),
    // },
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
        <div className="my-2 flex items-baseline justify-center text-white">
          <p className="mt-0 text-xl">
            {constellationContent.constellationTitle}
          </p>
          <div className="text-md">&nbsp;자리</div>
        </div>
      </div>
      <ListSectionStar className="relative left-0 top-0 z-0 h-full w-full" />
      {/* <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"> */}
      {/* <footer className="mt-16 flex flex-row items-center justify-between space-x-8">
          <Button1
            className="w-36"
            value="참여하기"
            onClick={navigateToRegisterStar}
          />
          <Button1
            className="w-36"
            value="홈으로 이동"
            onClick={navigateToMainPlanet}
          />
          <Button1
            className="w-36"
            value="별자리 초대하기"
            onClick={toggleModal}
          />
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
        </footer> */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 space-x-4">
        <Footer buttons={buttonsFooter} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default DetailConstellation;
