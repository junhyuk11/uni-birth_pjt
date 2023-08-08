import React, { useState, useEffect } from "react";
// import Button1 from "../../../common/atoms/Button1";
// import { useNavigation } from "../../../hooks/useNavigation";
import useConstellationApi from "../../../api/useConstellationApi";
import { useRecoilValue } from "recoil";
import { targetNicknameState } from "../../../recoil/atoms";
import Button3 from "../../../common/atoms/Button3";

const ConstellationSectionProfile = () => {
  // const { navigateToListConstellation } = useNavigation();

  const targetNickname = useRecoilValue(targetNicknameState);

  const [images, setImages] = useState([]); // 빈 배열로 초기화

  const handlePinClick = async () => {
    const response = await useConstellationApi.constellationsGetPinList(
      targetNickname,
    );
    console.log(response.resultData);
    setImages([response.resultData]);
  };

  const handleParticipateClick = async () => {
    const response = await useConstellationApi.constellationsGetAttendList(
      targetNickname,
    );
    console.log(response.resultData);
    setImages([response.resultData]);
  };

  useEffect(() => {
    // 기본 버튼에 따라 초기 데이터 가져오기
    handleParticipateClick();
  }, []);

  useEffect(() => {
    console.log("target", targetNickname);
  }, [images]);

  return (
    <div className="space-x-4">
      <div className="mx-auto flex flex-row items-center justify-between border-y-2 border-yellow-100 bg-slate-950 bg-opacity-70 text-yellow-50">
        <Button3
          value="참여한 별자리"
          className="mx-auto  w-full border-r-2 border-yellow-100 font-Pretendard text-yellow-50"
          onClick={handleParticipateClick}
        />
        <Button3
          value="핀한 별자리"
          className="mx-auto w-full font-Pretendard text-yellow-50"
          onClick={handlePinClick}
        />
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {images.map((img) => (
          <div key={img.constellationId} className="my-4">
            <img src={img.imageUrl} className="avatar" alt="User Avatar" />
            <div>
              <p>{img.title}</p>
              {/* <button onClick={() => nicknameClick(user.nickname)}>
                프로필 조회하기
              </button> */}
            </div>

            {/* <button
              className="flex h-32 w-48 items-center "
              onClick={navigateToListConstellation}
            >
              {img.title}
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstellationSectionProfile;
