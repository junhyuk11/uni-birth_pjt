import React, { useState, useEffect } from "react";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import { useNavigation } from "../../../hooks/useNavigation";
import { BiSearch } from "react-icons/bi";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import InputImage from "../../Member/atoms/InputImage";
import InputBox from "../../../common/atoms/InputBox";
import useMemberApi from "../../../api/useMemberApi";
import { storage } from "../../../api/useFirebaseApi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ModifyProfile = () => {
  const { navigateToBack, navigateToMemberProfile } = useNavigation();
  const [imageUrl, setImage] = useState("");
  const [introduction, setIntro] = useState("");

  const fetchData = async () => {
    try {
      const response = await useMemberApi.membersGetProfiles();
      setImage(response.resultData.imageUrl);
      setIntro(response.resultData.introduction);
    } catch (error) {
      console.error("데이터를 가져오는데 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <BiSearch />,
    },
  ];

  const handleCompleteClick = async (e) => {
    e.preventDefault();
    console.log("imageUrl:");
    console.log(imageUrl.name);
    const storageRef = ref(storage, `images/${imageUrl.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUrl);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done.`);
      },
      (error) => {
        console.log(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        console.log("downloadURL:", downloadURL);
        const member = {
          introduction,
          imageUrl: downloadURL,
        };
        console.log("member:", member);
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
      },
    );
  };

  const buttonsFooter = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "완료하기",
      onClick: handleCompleteClick,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      <Header1 buttons={buttonsHeader} />
      <form className="flex flex-col items-center justify-center space-y-10">
        <InputImage
          onChange={(file) => setImage(file)} // 파일 객체 저장
        />
        <InputBox
          value="자기소개  "
          placeholder={introduction}
          onChange={(e) => setIntro(e.target.value)}
        />
        <Footer1 buttons={buttonsFooter} />
      </form>
    </div>
  );
};

export default ModifyProfile;
