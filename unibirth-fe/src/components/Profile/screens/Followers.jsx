import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Button4 from "../../../common/atoms/Button4";
import Header2 from "../../../common/blocks/Header2";
import Header1 from "../../../common/blocks/Header1";
import { IoIosArrowBack } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { useNavigation } from "../../../hooks/useNavigation";
import useProfileApi from "../../../api/useProfileApi";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  targetNicknameState,
  backgroundflagState,
} from "../../../recoil/atoms";

const Followers = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  backgroundflag(true);
  const {
    navigateToMemberProfile,
    navigateToFollowings,
    navigateToDirectMessage,
  } = useNavigation();

  const [targetNickname, setTargetNickname] =
    useRecoilState(targetNicknameState);

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToMemberProfile,
      icon: <IoIosArrowBack />,
    },
  ];

  const buttonsHeader2 = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway bg-white",
      value: "팔로잉",
      onClick: navigateToFollowings,
    },
    {
      component: Button4,
      className: "font-TAEBAEKmilkyway",
      value: "팔로워",
    },
  ];

  const [followerList, setFollowerList] = useState([]);

  const getFollowerList = async () => {
    const response = await useProfileApi.profilesGetFollowers(targetNickname);
    setFollowerList(response.resultData);
  };

  useEffect(() => {
    getFollowerList();
  }, []);

  const nicknameClick = (nick) => {
    setTargetNickname(nick); // 클릭한 유저 닉네임을 targetNicknameState에 저장합니다.
    navigateToMemberProfile(); // 화면 이동을 처리하는 함수를 호출합니다.
  };

  const messageClick = (nick) => {
    setTargetNickname(nick);
    navigateToDirectMessage();
  };

  useEffect(() => {
    console.log("1", targetNickname);
  }, [targetNickname]);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header2 buttons={buttonsHeader} />
      <Header1 buttons={buttonsHeader2} />
      <div className="flex flex-col items-center text-white">
        {followerList.map((user) => (
          <div key={user.nickname} className="my-4">
            <img src={user.imageUrl} className="avatar" alt="User Avatar" />
            <div>
              <p>{user.nickname}</p>
              <button onClick={() => nicknameClick(user.nickname)}>
                프로필 조회하기
              </button>
              <button
                className="flex h-32 w-48 items-center "
                onClick={() => messageClick(user.nickname)}
              >
                <CiLocationArrow1 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Followers;
