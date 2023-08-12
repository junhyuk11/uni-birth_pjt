import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header2 from "../../../common/blocks/Header2";
import { useNavigation } from "../../../hooks/useNavigation";
import useProfileApi from "../../../api/useProfileApi";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import Header5 from "../../../common/blocks/Header5";
import Button1 from "../../../common/atoms/Button1";
import Message from "../../../assets/icons/js/message";
import { useLocation } from "react-router-dom";
import CustomAlert from "../../../common/atoms/CustomAlert";

const Follow = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(true);
  const { navigateToBack, navigateToDirectMessage, navigateToMemberProfile } =
    useNavigation();

  const [followerList, setFollowerList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const location = useLocation();
  const locationNickname = location.state.locationNickname;
  const [currentList, setCurrentList] = useState(location.state.currentState);

  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  const buttonsHeader2 = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway bg-white",
      value: "팔로잉",
      onClick: () => setCurrentList("팔로잉"),
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "팔로워",
      onClick: () => setCurrentList("팔로워"),
    },
  ];

  const getFollowerList = async () => {
    try {
      const response = await useProfileApi.profilesGetFollowers(
        locationNickname,
      );
      if (response.status === 200) {
        setFollowerList(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("리스트를 불러오는데 실패하였습니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("리스트를 불러오는데 실패하였습니다.");
    }
  };

  const getFollowingList = async () => {
    try {
      const response = await useProfileApi.profilesGetFollowings(
        locationNickname,
      );
      if (response.status === 200) {
        setFollowingList(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("리스트를 불러오는데 실패하였습니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("리스트를 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    getFollowerList();
    getFollowingList();
  }, []);

  const nicknameClick = (nickname) => {
    navigateToMemberProfile(nickname); // 화면 이동을 처리하는 함수를 호출합니다.
  };

  const messageClick = (nickname) => {
    navigateToDirectMessage(nickname);
  };

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <Header2 buttons={buttonsHeader} />
      <Header5 buttons={buttonsHeader2} />
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "리스트를 불러오는데 실패하였습니다.") {
            navigateToBack();
          }
        }}
      />
      <div className="flex flex-col items-center px-4 text-white">
        {currentList === "팔로워" &&
          followerList.map((user) => (
            <div
              key={user.nickname}
              className="mx-4 flex w-full items-center border-b border-yellow-200 px-4 py-6"
            >
              <div
                className="flex flex-grow cursor-pointer items-center"
                onClick={() => nicknameClick(user.nickname)}
              >
                <img
                  src={user.imageUrl}
                  className="avatar mr-2 h-16 w-16"
                  alt="User Avatar"
                />
                <div className="py-5">
                  <p>{user.nickname}</p>
                </div>
              </div>
              <div className="flex">
                <button
                  className="flex items-center"
                  onClick={() => messageClick(user.nickname)}
                >
                  <Message />
                </button>
              </div>
            </div>
          ))}
        {currentList === "팔로잉" &&
          followingList.map((user) => (
            <div
              key={user.nickname}
              className="mx-4 flex w-full items-center border-b border-yellow-200 px-4 py-6"
            >
              <div
                className="flex flex-grow cursor-pointer items-center"
                onClick={() => nicknameClick(user.nickname)} // Event attached here
              >
                <img
                  src={user.imageUrl}
                  className="avatar mr-2 h-16 w-16"
                  alt="User Avatar"
                />
                <div className="py-5">
                  <p>{user.nickname}</p>
                </div>
              </div>
              <div className="flex">
                <button
                  className="flex items-center"
                  onClick={() => messageClick(user.nickname)}
                >
                  <Message />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Follow;
