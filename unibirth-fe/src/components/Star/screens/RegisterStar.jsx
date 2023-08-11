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
  // const [showModal, setShowModal] = useState(false);

  const createStar = () => {
    // Firebase에 Image 저장 및 URL 받아오기
    const storageRef = ref(storage, `images/${imageUrl.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageUrl);

    if (title.trim() === "") {
      alert("이름을 입력해주세요");
      return;
    } else if (content.trim() === "") {
      alert("내용을 입력해주세요");
      return;
    } else if (!imageUrl) {
      alert("이미지를 넣어주세요");
      return;
    }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done.`);
      },
      (error) => {
        // Error handling
        console.log(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          // 2. 받은 URL back 서버에 저장
          // Removed the extra arrow function
          console.log(downloadURL);
          setImageUrl(downloadURL);
          const data = {
            constellationId,
            title,
            imageUrl: downloadURL,
            content,
          };
          const response = await useStarApi.starsPostStar(data);
          navigateToDetailConstellation(constellationId);
          console.log("response:", response);
          console.log("data:", data);
          if (response.status === 200) {
            alert("별 생성에 성공하였습니다.");
            // navigateToDetailConstellation(constellationId);
          } else {
            alert("별 생성에 실패하였습니다. 다시 입력해주세요");
          }
        } catch (error) {
          console.log("Failed to get download url", error);
        }
      },
    );
  };

  // const toggleModal = () => {
  //   setShowModal(!showModal);
  // };

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
          {/* <Button1 value="별자리 초대하기" onClick={toggleModal} />
          {showModal && (
            <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
              <div className="max-h-2/4 overflow-y-auto rounded-lg bg-white">
                <button
                  onClick={toggleModal}
                  className="float-right p-2 hover:bg-gray-200"
                >
                  X
                </button>
                <InviteFollowStar />
              </div>
            </div>
          )} */}
          <Button1 value="별 생성" onClick={createStar} />
        </div>
      </div>
    </div>
  );
};

export default RegisterStar;
