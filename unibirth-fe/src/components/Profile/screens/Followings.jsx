import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header2 from "../../../common/blocks/Header2";
import { useNavigation } from "../../../hooks/useNavigation";
import useProfileApi from "../../../api/useProfileApi";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import Button1 from "../../../common/atoms/Button1";
import Header5 from "../../../common/blocks/Header5";
import Message from "../../../assets/icons/js/message";
import { useLocation } from "react-router-dom";

const Followings = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(true);
  const {
    navigateToBack,
    navigateToFollowers,
    navigateToDirectMessage,
    navigateToMemberProfile,
  } = useNavigation();
  const [followingList, setFollowingList] = useState([]);
  const location = useLocation();
  const locationNickname = location.state;
  const [isFollowing, setIsFollowing] = useState({});
  const handleToFollowers = (locationNickname) => {
    navigateToFollowers(locationNickname);
  };

  const toggleFollowing = (nickname) => {
    console.log("팔로잉 버튼 상태", isFollowing[nickname]);
    setIsFollowing((prevIsFollowing) => ({
      ...prevIsFollowing,
      [nickname]: !prevIsFollowing[nickname],
    }));
  };

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
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "팔로워",
      onClick: () => handleToFollowers(locationNickname),
    },
  ];

  const getFollowingList = async () => {
    const response = await useProfileApi.profilesGetFollowings(
      locationNickname,
    );
    console.log(response.resultData);
    setFollowingList(response.resultData);
  };

  useEffect(() => {
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
      <div className="flex flex-col items-center px-4 text-white">
        {followingList.map((user) => (
          <div
            key={user.nickname}
            className="mx-4 flex w-full items-center border-b border-yellow-200 px-4 py-6"
          >
            <img
              onClick={() => nicknameClick(user.nickname)}
              src={user.imageUrl}
              className="avatar mr-2 h-16 w-16"
              alt="User Avatar"
            />
            <div className="py-5" onClick={() => nicknameClick(user.nickname)}>
              <p>{user.nickname}</p>
            </div>
            <div className="flex-grow"></div>
            <div className="flex">
              <Button1
                onClick={() => toggleFollowing(user.nickname)}
                value={!isFollowing[user.nickname] ? "팔로잉" : "팔로우"}
                className={"mr-6"}
              />
              <button
                className="flex items-center "
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

export default Followings;
