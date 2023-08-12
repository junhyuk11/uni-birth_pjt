import React, { useState, useEffect } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import BodyRegisterStar from "../blocks/BodyRegisterStar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { StellaIdState, backgroundflagState } from "../../../recoil/atoms";
import useStarApi from "../../../api/useStarApi";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../api/useFirebaseApi";

import LeftArrow from "../../../assets/icons/js/leftArrow";
import InputImage from "../atoms/InputImage";
import earth from "../../../assets/images/earth.png";
import CustomAlert from "../../../common/atoms/CustomAlert";

const RegisterStar = () => {
  useEffect(() => {
    backgroundflag(true);
  }, []);

  const saveImgFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setThumbUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };
  const backgroundflag = useSetRecoilState(backgroundflagState);
  const constellationId = useRecoilValue(StellaIdState);
  const { navigateToBack, navigateToDetailConstellation } = useNavigation(); // navigateToDetailConstellation
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [thumbUrl, setThumbUrl] = useState("");
  const [content, setContent] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const createStar = () => {
    setLoading(true); // 로딩 상태 시작
    const storageRef = ref(storage, `images/${imageUrl.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUrl);

    if (title.trim() === "") {
      setIsAlertVisible(true);
      setAlertMessage("제목을 입력해주세요.");
      return;
    } else if (content.trim() === "") {
      setIsAlertVisible(true);
      setAlertMessage("내용을 입력해주세요.");
      return;
    } else if (!imageUrl) {
      setIsAlertVisible(true);
      setAlertMessage("이미지를 넣어주세요.");
      return;
    }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done.`);
      },
      () => {
        setIsAlertVisible(true);
        setAlertMessage("이미지 업로드에 실패하였습니다.");
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          const data = {
            constellationId,
            title,
            imageUrl: downloadURL,
            content,
          };
          const response = await useStarApi.starsPostStar(data);
          if (response.status === 200) {
            navigateToDetailConstellation(constellationId);
          } else {
            setIsAlertVisible(true);
            setAlertMessage(response.message);
          }
        } catch (error) {
          setIsAlertVisible(true);
          setAlertMessage("별 생성에 실패하였습니다.");
        }
        setLoading(false); // 로딩 상태 종료
      },
    );
  };

  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        <span className="ml-4 text-2xl text-white" onClick={() => {}}>
          별 생성
        </span>
      ),
    },
  ];
  return (
    <div className="mx-auto h-screen max-w-screen-sm  bg-slate-100 bg-opacity-50">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
        }}
      />
      <div>
        <Header1 buttons={buttonsHeader} />
        <div className="mt-24 flex flex-col items-center justify-center space-y-10">
          <img
            src={thumbUrl || earth}
            alt="이미지"
            className="h-32 w-32 rounded-full object-cover"
          />
          <InputImage
            setImageUrl={setImageUrl}
            setThumbUrl={setThumbUrl}
            onChange={saveImgFile}
          />
          <BodyRegisterStar
            title={title}
            setTitle={setTitle}
            content={content}
            setContent={setContent}
          />
        </div>
        <div className="mt-20 flex justify-center ">
          <Button1 value="별 생성" onClick={createStar} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default RegisterStar;
