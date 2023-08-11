import React, { useState, useEffect } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import useMemberApi from "../../../api/useMemberApi";
import useProfileApi from "../../../api/useProfileApi";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";
import Button5 from "../../../common/atoms/Button5";

const MemberSectionProfile = ({ locationNickname }) => {
  const {
    navigateToModifyProfile,
    // navigateToFollowings,
    // navigateToFollowers,
    navigateToFollow,
    navigateToMyStars,
  } = useNavigation();

  const [memberData, setMemberData] = useState();
  const nickname = useRecoilValue(nicknameState);

  const handleFollow = async (e) => {
    e.preventDefault();
    const followData = {
      followFrom: nickname,
      followTo: locationNickname,
    };
    try {
      const response = await useProfileApi.profilesPostFollow(followData);
      if (response.status === 200) {
        alert("팔로우 완료!");
        window.location.reload();
      } else {
        alert("이미 팔로우한 상대입니다!");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      alert("팔로우 버튼 클릭했는데 큰일났습니다.");
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    try {
      const response = await useProfileApi.profilesDeleteFollow(
        locationNickname,
      );
      if (response.status === 200) {
        alert("언팔로우 완료!");
        window.location.reload();
      } else {
        alert("이미 언팔로우한 상대입니다!");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
      alert("언팔로우 버튼 클릭했는데 큰일났습니다.");
    }
  };

  const fetchMemberData = async () => {
    try {
      const response = await useMemberApi.membersGetDetail(locationNickname);
      setMemberData(response);
    } catch (error) {
      console.error("멤버 데이터를 가져오는데 에러 발생:", error);
    }
  };

  useEffect(() => {
    fetchMemberData();
  }, []);

  return (
    <div className="space-x-4 overflow-hidden bg-slate-950 bg-opacity-60 px-5 py-5">
      {memberData && (
        <div className="flex items-start space-x-4">
          <img
            src={memberData.resultData.imageUrl}
            className="h-32 w-32 rounded-full"
            alt="Round image"
          />
          <div className="flex flex-grow flex-col justify-center space-y-10">
            <div className="flex justify-end space-x-4">
              <div className="flex flex-col items-center">
                <p
                  onClick={() => navigateToFollow(locationNickname)}
                  // onClick={() => navigateToFollowings(locationNickname)}
                  className="text-center text-yellow-100"
                >
                  팔로잉: {memberData.resultData.followingCount}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p
                  onClick={() => navigateToFollow(locationNickname)}
                  // onClick={() => navigateToFollowers(locationNickname)}
                  className="text-center text-yellow-100"
                >
                  팔로워: {memberData.resultData.followerCount}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p
                  onClick={() => navigateToMyStars(locationNickname)}
                  className="text-center text-yellow-100"
                >
                  띄운 별: {memberData.resultData.starCount}
                </p>
              </div>
            </div>
            <div className="text-right text-lg font-bold text-white">
              {memberData.resultData.introduction}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end space-x-4 bg-slate-950 bg-opacity-60">
        {nickname === locationNickname ? (
          <Button5
            value="수정"
            className="w-20"
            onClick={navigateToModifyProfile}
          />
        ) : memberData?.resultData?.follow ? (
          <Button5
            value="언팔로우"
            onClick={handleUnfollow} // 이 함수를 정의해야 함
          />
        ) : (
          <Button5 value="팔로우" onClick={handleFollow} />
        )}
      </div>
    </div>
  );
};

export default MemberSectionProfile;
