import useProfileApi from "../../../api/useProfileApi";
import React, { useEffect, useState } from "react";
import { nicknameState } from "../../../recoil/atoms";
import { useRecoilValue } from "recoil";

const InviteFollowStar = () => {
  const nickname = useRecoilValue(nicknameState);
  const [followList, setFollowList] = useState([]);

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

      setFollowList(uniqueResults);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-sky-500">
      QQQQQQQQQQQQQQQQQQQQQQQQQQ
      {followList.map((item) => {
        return (
          <div
            key={item.nickname}
            style={{ display: "flex", alignItems: "center", margin: "10px 0" }}
          >
            <img
              src={item.profileImageUrl}
              alt={`${item.nickname}'s profile`}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "25px",
                marginRight: "15px",
              }}
            />
            <div>{item.nickname}</div>
          </div>
        );
      })}
    </div>
  );
};

export default InviteFollowStar;
