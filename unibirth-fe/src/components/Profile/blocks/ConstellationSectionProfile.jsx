import React, { useState, useEffect } from "react";
import useConstellationApi from "../../../api/useConstellationApi";
import { useRecoilValue } from "recoil";
import { targetNicknameState } from "../../../recoil/atoms";
import Button3 from "../../../common/atoms/Button3";
import { useNavigation } from "../../../hooks/useNavigation";

const ConstellationSectionProfile = () => {
  const targetNickname = useRecoilValue(targetNicknameState);
  const [images, setImages] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const { navigateToDetailConstellation } = useNavigation();

  const handleButtonClick = (buttonValue) => {
    setSelectedButton(buttonValue);
  };
  const handlePinClick = async () => {
    const response = await useConstellationApi.constellationsGetPinList(
      targetNickname,
    );
    setImages(response.resultData.constellationList);
  };

  const handleParticipateClick = async () => {
    const response = await useConstellationApi.constellationsGetAttendList(
      targetNickname,
    );
    setImages(response.resultData.constellationList);
  };

  useEffect(() => {
    setSelectedButton("참여한 별자리");
    handleParticipateClick();
  }, []);

  return (
    <div className="space-x-4">
      <div className="mx-auto flex flex-row items-center justify-between border-y-2 border-yellow-100 bg-slate-950 bg-opacity-70 text-yellow-50">
        <Button3
          value="참여한 별자리"
          className="mx-auto  w-full border-r-2 border-yellow-100 font-Pretendard text-yellow-50"
          selectedValue={selectedButton}
          onSelect={handleButtonClick}
          onClick={handleParticipateClick}
        />
        <Button3
          value="핀한 별자리"
          className="mx-auto w-full font-Pretendard text-yellow-50"
          selectedValue={selectedButton}
          onSelect={handleButtonClick}
          onClick={handlePinClick}
        />
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {images.map((img) => (
          <div
            key={img.constellationId}
            className="my-4"
            onClick={() => navigateToDetailConstellation(img.constellationId)}
          >
            {" "}
            <img src={img.imageUrl} className="avatar" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConstellationSectionProfile;
