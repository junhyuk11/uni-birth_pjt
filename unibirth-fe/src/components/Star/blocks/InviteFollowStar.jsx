import useProfileApi from "../../../api/useProfileApi";
import React, { useEffect, useState } from "react";
import { nicknameState } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";
import { HiPaperAirplane } from "react-icons/hi";
import { BsCheck } from "react-icons/bs";

const InviteFollowStar = () => {
  const nickname = useRecoilValue(nicknameState);
  const [followList, setFollowList] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState({}); // 초대한 사용자 추적

  useEffect(() => {
    getFollowList(nickname);
  }, [nickname]);

  const getFollowList = async (nickname) => {
    try {
      const followingsResponse = await useProfileApi.profilesGetFollowings(
        nickname,
      );
      const followersResponse = await useProfileApi.profilesGetFollowers(
        nickname,
      );

      // 결과를 하나의 배열로 합치기
      const combinedResults = [
        ...followingsResponse.resultData,
        ...followersResponse.resultData,
      ];

      // Set을 사용해 중복 nickname 제거
      const uniqueResults = Array.from(
        new Set(combinedResults.map((item) => item.nickname)),
      ).map((nickname) => {
        return combinedResults.find((item) => item.nickname === nickname);
      });
      console.log(uniqueResults);
      setFollowList(uniqueResults);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInvite = (nickname) => {
    setInvitedUsers({ ...invitedUsers, [nickname]: true });
  };

  return (
    <div className="p-4 text-sky-500">
      {followList.map((item) => {
        return (
          <div
            key={item.nickname}
            className="mb-3 flex items-center space-x-4 p-2 hover:bg-gray-100"
          >
            <img
              src={item.imageUrl}
              alt={`${item.nickname}'s profile`}
              className="h-12 w-12 rounded-full"
            />
            <div className="font-semibold">{item.nickname}</div>
            <button
              onClick={() => handleInvite(item.nickname)}
              className="text-blue-500 hover:text-blue-700"
            >
              {invitedUsers[item.nickname] ? (
                <BsCheck className="h-6 w-6" />
              ) : (
                <HiPaperAirplane className="h-6 w-6" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default InviteFollowStar;
