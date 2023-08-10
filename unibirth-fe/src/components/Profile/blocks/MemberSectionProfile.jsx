import React, { useState, useEffect } from "react";
import Button1 from "../../../common/atoms/Button1";
import { useNavigation } from "../../../hooks/useNavigation";
import useMemberApi from "../../../api/useMemberApi";
import useProfileApi from "../../../api/useProfileApi";
import { useRecoilValue } from "recoil";
import { nicknameState } from "../../../recoil/atoms";

const MemberSectionProfile = ({ locationNickname }) => {
  const {
    navigateToModifyProfile,
    navigateToFollowings,
    navigateToFollowers,
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
      console.log("target is", locationNickname);
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
    <div className="space-x-4 bg-slate-950 bg-opacity-60">
      {memberData && (
        <div className="flex items-start space-x-4">
          <img
            src={memberData.resultData.imageUrl}
            className="h-32 w-32 rounded-full"
            alt="Round image"
          />
          <div>
            <p className="text-lg font-bold text-yellow-100">
              {memberData.resultData.nickname}
            </p>
            <p onClick={navigateToMyStars} className="text-yellow-100">
              띄운 별: {memberData.resultData.starCount}
            </p>
            <p onClick={navigateToFollowings} className="text-yellow-100">
              팔로잉: {memberData.resultData.followingCount}
            </p>
            <p onClick={navigateToFollowers} className="text-yellow-100">
              팔로워: {memberData.resultData.followerCount}
            </p>
          </div>
          <div>
            <p className="text-lg font-bold text-yellow-100">
              <p>상태 메시지 :</p>
              {memberData.resultData.introduction}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center space-x-4 bg-slate-950 bg-opacity-60">
        {nickname === locationNickname ? (
          <Button1
            value="수정"
            className="w-20 font-TAEBAEKmilkyway"
            onClick={navigateToModifyProfile}
          />
        ) : memberData?.resultData?.follow ? (
          <Button1
            value="언팔로우"
            className="font-TAEBAEKmilkyway"
            onClick={handleUnfollow} // 이 함수를 정의해야 함
          />
        ) : (
          <Button1
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
