import React, { useState, useEffect } from "react";
import Button1 from "../../../common/atoms/Button1";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import Footer1 from "../../../common/blocks/Footer1";
import { BiSearch } from "react-icons/bi";
import { useNavigation } from "../../../hooks/useNavigation";
import BodyRegisterStar from "../blocks/BodyRegisterStar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { StellaIdState, backgroundflagState } from "../../../recoil/atoms";
import useStarApi from "../../../api/useStarApi";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../api/useFirebaseApi";
import InviteFollowStar from "../blocks/InviteFollowStar";

const RegisterStar = () => {
  useEffect(() => {
    backgroundflag(true);
  }, []);

  const backgroundflag = useSetRecoilState(backgroundflagState);
  const constellationId = useRecoilValue(StellaIdState);
  const { navigateToBack, navigateToDetailConstellation } = useNavigation(); // navigateToDetailConstellation
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <BiSearch />,
    },
  ];

  const buttonsFooter = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "별 생성하기",
      onClick: createStar,
    },
  ];

  return (
    <div className="flex flex-col space-y-1">
      <div className="my-3 flex flex-row items-center space-x-5">
        <Header1 buttons={buttonsHeader} />
        <p className="flex justify-center font-TAEBAEKmilkyway">별띄우기</p>
      </div>
      <div className="flex flex-col justify-center px-10">
        <BodyRegisterStar
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          setImageUrl={setImageUrl}
        />
      </div>
      <div className="flex justify-center">
        <Button1
          className="font-TAEBAEKmilkyway"
          value="별자리 초대하기"
          onClick={toggleModal}
        />
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
        )}
      </div>
      <div className="flex justify-center">
        <Footer1 buttons={buttonsFooter} />
      </div>
    </div>
  );
};

export default RegisterStar;
