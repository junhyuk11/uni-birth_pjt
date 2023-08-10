import React, { useState, useEffect } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import useMemberApi from "../../../api/useMemberApi";
import useProfileApi from "../../../api/useProfileApi";
import { useRecoilValue } from "recoil";
import { nicknameState, targetNicknameState } from "../../../recoil/atoms";
import Button5 from "../../../common/atoms/Button5";

const MemberSectionProfile = () => {
  const {
    navigateToModifyProfile,
    navigateToFollowings,
    navigateToFollowers,
    navigateToMyStars,
  } = useNavigation();

  const [memberData, setMemberData] = useState();
  const targetNickname = useRecoilValue(targetNicknameState);
  const nickname = useRecoilValue(nicknameState);

  const handleFollow = async (e) => {
    e.preventDefault();
    const followData = {
      followFrom: nickname,
      followTo: targetNickname,
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
      const response = await useProfileApi.profilesDeleteFollow(targetNickname);
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

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        let response;
        if (targetNickname) {
          // targetNickname이 존재하는 경우 membersGetDetail API를 호출합니다.
          console.log("target is", targetNickname);
          response = await useMemberApi.membersGetDetail(targetNickname);
        } else {
          // targetNickname이 없는 경우 nicknameState 값을 사용하여 membersGetProfiles API를 호출합니다.
          console.log("no target");
          response = await useMemberApi.membersGetProfiles();
        }
        console.log("membersection 리스폰스", response);
        setMemberData(response);
      } catch (error) {
        console.error("멤버 데이터를 가져오는데 에러 발생:", error);
      }
    };
    fetchMemberData();
  }, [targetNickname]);

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
                  onClick={navigateToFollowings}
                  className="text-center text-yellow-100"
                >
                  팔로잉: {memberData.resultData.followingCount}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p
                  onClick={navigateToFollowers}
                  className="text-center text-yellow-100"
                >
                  팔로워: {memberData.resultData.followerCount}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p
                  onClick={navigateToMyStars}
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
        {nickname === targetNickname ? (
          <Button5
            value="수정"
            className="w-20 font-TAEBAEKmilkyway"
            onClick={navigateToModifyProfile}
          />
        ) : memberData?.resultData?.follow ? (
          <Button5
            value="언팔로우"
            className="font-TAEBAEKmilkyway"
            onClick={handleUnfollow} // 이 함수를 정의해야 함
          />
        ) : (
          <Button5
            value="팔로우"
            className="w-20 font-TAEBAEKmilkyway"
            onClick={handleFollow}
          />
        )}
      </div>
    </div>
  );
};

export default MemberSectionProfile;
