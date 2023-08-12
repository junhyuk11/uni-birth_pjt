import React, { useState, useEffect } from "react";
import useConstellationApi from "../../../api/useConstellationApi";
import Button3 from "../../../common/atoms/Button3";
import { useNavigation } from "../../../hooks/useNavigation";
import CustomAlert from "../../../common/atoms/CustomAlert";

const ConstellationSectionProfile = ({ locationNickname }) => {
  const [images, setImages] = useState([]);
  const [selectedButton, setSelectedButton] = useState(null);
  const { navigateToDetailConstellation, navigateToBack } = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const handleButtonClick = (buttonValue) => {
    setSelectedButton(buttonValue);
  };
  const handlePinClick = async () => {
    try {
      const response = await useConstellationApi.constellationsGetPinList(
        locationNickname,
      );
      if (response.status === 200) {
        setImages(response.resultData.constellationList);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("핀한 별자리 리스트를 불러오는데 실패했습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("핀한 별자리 리스트를 불러오는데 실패했습니다.");
    }
  };

  const handleParticipateClick = async () => {
    const response = await useConstellationApi.constellationsGetAttendList(
      locationNickname,
    );
    console.log(response.resultData);
    setImages(response.resultData.constellationList);
  };

  useEffect(() => {
    setSelectedButton("참여한 별자리");
    handleParticipateClick();
  }, []);

  return (
    <div>
      <div className="mx-auto flex flex-row items-center justify-between border-y-2 border-yellow-100 bg-slate-950 bg-opacity-70 text-yellow-50">
        <CustomAlert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => {
            setIsAlertVisible(false);
            if (
              alertMessage === "핀한 별자리 리스트를 불러오는데 실패했습니다."
            ) {
              navigateToBack();
            }
          }}
        />
        <Button3
          value="참여한 별자리"
          className="mx-auto  w-full border-r border-yellow-100 font-Pretendard text-yellow-50"
          selectedValue={selectedButton}
          onSelect={handleButtonClick}
          onClick={handleParticipateClick}
        />
        <Button3
          value="핀한 별자리"
          className="mx-auto w-full border-l font-Pretendard text-yellow-50"
          selectedValue={selectedButton}
          onSelect={handleButtonClick}
          onClick={handlePinClick}
        />
      </div>
      <div className="flex flex-row flex-wrap">
        {images.map((img) => (
          <div
            key={img.constellationId}
            className="w-1/3 p-2"
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
