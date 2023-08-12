import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import useStarApi from "../../../api/useStarApi";
import useMemberApi from "../../../api/useMemberApi";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import CustomAlert from "../../../common/atoms/CustomAlert";
const DetailStar = () => {
  const setBackgroundflag = useSetRecoilState(backgroundflagState);
  const { navigateToBack, navigateToMemberProfile } = useNavigation();
  const { starId } = useParams();
  const [memberInfo, setMemberInfo] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [star, setStar] = useState({
    brightness: "",
    content: "",
    createdAt: "",
    updatedAt: "",
    alreadyLiked: "",
    mine: "",
    constellationId: "",
    starId: "",
    nickname: "",
    title: "",
  });

  useEffect(() => {
    setBackgroundflag(true);
  }, []);

  useEffect(() => {
    getStar(starId);
  }, [starId]);

  useEffect(() => {
    if (star.nickname) {
      getMemberInfo(star.nickname);
    }
  }, [star.nickname]);

  const getStar = async (starId) => {
    try {
      const response = await useStarApi.starsGetStar(starId);
      if (response.status === 200) {
        setStar(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("별을 불러오는데 실패하였습니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("별을 불러오는데 실패하였습니다.");
    }
  };

  const getMemberInfo = async (nickname) => {
    try {
      const response = await useMemberApi.membersGetDetail(nickname);
      if (response.status === 200) {
        setMemberInfo(response.resultData);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("멤버 정보를 불러오는데 실패하였습니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("멤버 정보를 불러오는데 실패하였습니다.");
    }
  };

  const handleLikeClick = async (starId) => {
    // star.alreadyLiked가 true면 좋아요 취소
    // star.alreadyLiked가 false면 좋아요
    if (star.alreadyLiked) {
      try {
        const response = await useStarApi.starsDeleteBrightness(starId);
        if (response.status === 200) {
          setStar({
            ...star,
            alreadyLiked: false,
          });
        } else {
          setIsAlertVisible(true);
          setAlertMessage("오류 발생");
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("오류 발생");
      }
    } else {
      try {
        const response = await useStarApi.starsGetBrightness(starId);
        if (response.status === 200) {
          setStar({
            ...star,
            alreadyLiked: true,
          });
        } else {
          setIsAlertVisible(true);
          setAlertMessage("오류 발생");
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("오류 발생");
      }
    }
  };

  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
    {
      component: () => (
        // <span className="ml-4 text-2xl text-white">{constellation}</span>
        <span className="ml-4 text-2xl text-white">별자리 이름</span>
      ),
    },
  ];
  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (
            alertMessage === "별을 불러오는데 실패하였습니다." ||
            alertMessage === "멤버 정보를 불러오는데 실패하였습니다." ||
            alertMessage === "오류 발생"
          ) {
            navigateToBack();
          }
        }}
      />
      <header className="sticky top-0 z-10">
        <Header1 buttons={buttonsHeader} />
      </header>
      <div className="px-4">
        <div className="flex flex-row items-center py-2">
          <div
            className="mt-0 flex flex-col"
            style={{ maxWidth: "100%", wordWrap: "break-word" }}
          >
            <div
              className="text-md w-full overflow-hidden font-bold text-gray-800"
              style={{ maxWidth: "70%", wordWrap: "break-word" }}
            >
              sㄴㅁㅇㄹㄴ마ㅣㅇ런미ㅏㅇ린망린ㅁ어린ㅁㅇ러ㅏㅣㄴㅁㅇ러ㅣㅏㄴㅁㅇㄹㄴ미얼ㄴㅁ이;러
              {/* {star.title} */}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex flex-row items-center border-b-2 border-gray-300 py-2">
          <img
            src={memberInfo.imageUrl}
            alt="멤버 이미지"
            className="h-10 w-10 rounded-full object-cover" // 이미지 둥글게, 크기 조정
            style={{ alignSelf: "flex-start" }}
          />
          <div className="ml-3 mt-0 flex flex-col">
            <div
              className="text-md font-bold text-gray-800"
              onClick={() => navigateToMemberProfile(memberInfo.nickname)}
            >
              {memberInfo.nickname}
            </div>
            <span className="text-xs text-gray-700">
              {formatDate(star.updatedAt)}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <img
          src={star.imageUrl}
          alt="별 이미지"
          className="h-auto max-h-96 w-full object-cover"
        />{" "}
        {/* 이미지 크기 조정 */}
      </div>
      <div className="px-4">
        <div className="flex flex-row items-center py-4">
          <p className="flex-grow text-sm text-gray-800">{star.content}</p>
          <button
            className={`scale-100 transform text-3xl text-yellow-500 transition-transform focus:outline-none ${"animate-bounce"}`}
            onClick={() => handleLikeClick(star.starId)}
          >
            {star.alreadyLiked ? <AiFillStar /> : <AiOutlineStar />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailStar;
