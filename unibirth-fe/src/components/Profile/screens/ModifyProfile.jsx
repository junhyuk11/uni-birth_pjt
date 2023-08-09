import React, { useState, useEffect } from "react";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import { useNavigation } from "../../../hooks/useNavigation";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import InputImage from "../../Member/atoms/InputImage";
import useMemberApi from "../../../api/useMemberApi";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import InputIntroduction from "../atoms/InputIntroduction";
import star from "../../../assets/images/star.png";

const ModifyProfile = () => {
  const { navigateToBack, navigateToMemberProfile } = useNavigation();
  const [imageUrl, setImage] = useState("");
  const [introduction, setIntro] = useState("");
  const [nickname, setNickname] = useState("");

  // useEffect를 사용하여 데이터가 불러와진 후에 상태를 설정합니다.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await useMemberApi.membersGetProfiles();
        setImage(response.resultData.imageUrl);
        setIntro(response.resultData.introduction);
        setNickname(response.resultData.nickname);
      } catch (error) {
        console.error("데이터를 가져오는데 오류가 발생했습니다.", error);
      }
    };
    fetchData();
  }, []);

  const defaultImageUrl = star;

  const saveImgFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  const handleClick = async (e) => {
    e.preventDefault();
    const member = {
      introduction,
      imageUrl,
    };
    console.log("image:", imageUrl);
    console.log("intro:", introduction);
    try {
      const response = await useMemberApi.membersPutProfiles(member);
      if (response.status === 200) {
        alert("수정이 완료되었습니다.");
        navigateToMemberProfile();
      } else {
        alert("오류 발생.");
      }
    } catch (e) {
      console.log(e);
      alert("오류가 발생.");
    }
  };

  const buttonsFooter = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "완료하기",
      onClick: handleClick,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm">
      <Header1 buttons={buttonsHeader} />
      <form className="flex flex-col items-center justify-center space-y-10">
        <img
          src={imageUrl || defaultImageUrl}
          alt="프로필 이미지"
          className="h-32 w-32 rounded-full object-cover"
        />
        <InputImage value={imageUrl} onChange={saveImgFile} />
        <div className="w-full flex-initial items-center justify-center font-Pretendard">
          <div className="w-full flex-row">
            <label
              htmlFor="nickname"
              className="inline-block w-24 font-bold text-gray-100"
            >
              닉네임
            </label>
            <div className="mt-2 w-full flex-row">
              <input
                className="w-full flex-1 flex-row border-b-2 border-gray-400 bg-transparent py-2 text-yellow-200 
        placeholder-gray-400 outline-none
        focus:border-yellow-200"
                type="text"
                name="nickname"
                autoComplete="off"
                id="nickname"
                value={nickname}
                readOnly
              />
            </div>
          </div>
        </div>
        <InputIntroduction
          value="소개"
          placeholder={introduction}
          onChange={(e) => setIntro(e.target.value)}
        />
        <Footer1 buttons={buttonsFooter} />
      </form>
    </div>
  );
};

export default ModifyProfile;
