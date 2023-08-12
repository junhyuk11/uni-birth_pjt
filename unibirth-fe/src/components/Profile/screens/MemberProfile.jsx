import React, { useState } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import { useNavigation } from "../../../hooks/useNavigation";
import MemberSectionProfile from "../blocks/MemberSectionProfile";
import ConstellationSectionProfile from "../blocks/ConstellationSectionProfile";
import useMemberApi from "../../../api/useMemberApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import ThreeDots from "../../../assets/icons/js/threeDots";
import Close from "../../../assets/icons/js/close";
import Header4 from "../../../common/blocks/Header4";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { backgroundflagState, nicknameState } from "../../../recoil/atoms";
import Mail from "../../../assets/icons/js/mail";
import Message from "../../../assets/icons/js/message";
import Header6 from "../../../common/blocks/Header6";
import Star from "../../../assets/icons/js/star";
import { useLocation } from "react-router-dom";
import Footer from "../../../common/blocks/Footer";
import CustomAlert from "../../../common/atoms/CustomAlert";

const MemberProfile = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(true);
  const location = useLocation();
  const locationNickname = location.state;
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const nickname = useRecoilValue(nicknameState);
  const {
    navigateToMessageBox,
    navigateToBack,
    navigateToMainPlanet,
    navigateToUserAlarm,
    navigateToModifyMember,
    navigateToSearchQuration,
    navigateToDirectMessage,
  } = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMessageClick = () => {
    if (nickname === locationNickname) {
      navigateToMessageBox();
    } else {
      navigateToDirectMessage(locationNickname);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigateToMainPlanet();
  };

  const handleSignout = async () => {
    const confirmSignOut = window.confirm("정말로 회원을 탈퇴하시겠습니까?");
    if (confirmSignOut) {
      try {
        const response = await useMemberApi.membersDeleteMember();
        if (response.status === 200) {
          setIsAlertVisible(true);
          setAlertMessage("회원탈퇴가 완료되었습니다.");
          sessionStorage.clear();
        } else {
          setIsAlertVisible(true);
          setAlertMessage("회원탈퇴에 실패하였습니다.");
        }
      } catch (e) {
        setIsAlertVisible(true);
        setAlertMessage("회원탈퇴에 실패하였습니다.");
      }
    }
  };

  const buttonsHeader = [
    {
      component: Button2,
      value: "",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white">{locationNickname}</span>
      ),
    },
    {
      component: Button2,
      onClick: () => navigateToUserAlarm(locationNickname),
      icon: <Star />,
    },
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: handleMessageClick,
      icon: nickname === locationNickname ? <Mail /> : <Message />,
    },
    {
      component: Button2,
      className: "w-10 h-10",
      onClick: () => setIsModalOpen(true),
      icon: <ThreeDots />,
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

  buttonsFooter.push({});

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const modalButtons = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway m-10 p-10",
      value: "회원정보 수정",
      onClick: navigateToModifyMember,
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "로그아웃",
      onClick: handleLogout,
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "회원 탈퇴",
      onClick: handleSignout,
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway h-10 w-10",
      onClick: handleCloseModal,
      icon: <Close />,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "회원탈퇴가 완료되었습니다.") {
            navigateToMainPlanet();
          }
        }}
      />
      <div>
        <header className="sticky top-0 z-10">
          <Header6 buttons={buttonsHeader} />
        </header>
        <MemberSectionProfile locationNickname={locationNickname} />
        <ConstellationSectionProfile locationNickname={locationNickname} />
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className="z-10 rounded border-2 border-yellow-200 border-opacity-25 bg-slate-800 p-4 shadow-md">
              <Header4 buttons={modalButtons} />
            </div>
          </div>
        )}
        <div className="fixed bottom-10 left-1/2 z-10 -translate-x-1/2 space-x-4">
          <Footer buttons={buttonsFooter} />
        </div>
      </div>
    </div>
  );
};

export default MemberProfile;
