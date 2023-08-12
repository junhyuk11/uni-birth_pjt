import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import useStarApi from "../../../api/useStarApi";
import useMemberApi from "../../../api/useMemberApi";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import LeftArrow from "../../../assets/icons/js/leftArrow";

const DetailStar = () => {
  const [ddd, setBackgroundflag] = useRecoilState(backgroundflagState);
  const { navigateToBack, navigateToMemberProfile } = useNavigation();
  const { starId } = useParams();
  const [memberInfo, setMemberInfo] = useState([]);
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
    console.log("flag:", ddd);
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
    console.log(starId);
    try {
      const response = await useStarApi.starsGetStar(starId);
      console.log("별자리 디테일: ", response);
      setStar(response.resultData);
    } catch (error) {
      console.error("Failed to get star:", error);
    }
  };

  const getMemberInfo = async (nickname) => {
    console.log(nickname);
    try {
      const response = await useMemberApi.membersGetDetail(nickname);
      console.log(response);
      setMemberInfo(response.resultData);
    } catch (error) {
      console.error("Failed to get member:", error);
    }
  };

  const handleLikeClick = async (starId) => {
    // star.alreadyLiked가 true면 좋아요 취소
    // star.alreadyLiked가 false면 좋아요
    if (star.alreadyLiked) {
      try {
        const response = await useStarApi.starsDeleteBrightness(starId);
        console.log(response);
        setStar({
          ...star,
          alreadyLiked: false,
        });
      } catch (error) {
        console.error("Failed to delete like:", error);
      }
    } else {
      try {
        const response = await useStarApi.starsGetBrightness(starId);
        console.log(response);
        setStar({
          ...star,
          alreadyLiked: true,
        });
      } catch (error) {
        console.error("Failed to post like:", error);
      }
    }
  };

  const buttonsHeader = [
    {
      component: Button2,
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <header className="sticky top-0 z-10">
        <Header1 buttons={buttonsHeader} />
      </header>
      <div className="px-4">
        <div className="flex flex-row items-center py-2">
          <div className="mt-0 flex flex-col">
            <div
              className="text-md w-full overflow-hidden font-bold text-gray-800"
              style={{ maxWidth: "50%", wordWrap: "break-word" }}
            >
              sadfasdfasdfasdfjasdlkfjlsdakjfkladsjfl;jasdlf;jsadfasdfasfasfd
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex flex-row items-center py-2">
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
            <span className="text-xs text-gray-700">{star.updatedAt}</span>
          </div>
        </div>
      </div>
      <div className="w-full">
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
