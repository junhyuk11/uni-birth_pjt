import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { BiSearch } from "react-icons/bi";
import { useNavigation } from "../../../hooks/useNavigation";
import useStarApi from "../../../api/useStarApi";
import useMemberApi from "../../../api/useMemberApi";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const DetailStar = () => {
  const [ddd, setBackgroundflag] = useRecoilState(backgroundflagState);
  const { navigateToBack } = useNavigation();
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
      className: "font-TAEBAEKmilkyway",
      value: "뒤로가기",
      onClick: navigateToBack,
      icon: <BiSearch />,
    },
  ];

  return (
    <div className="flex flex-col">
      <Header1 buttons={buttonsHeader} />
      <div className="flex flex-row items-center p-4">
        <img
          src={memberInfo.imageUrl}
          alt="멤버 이미지"
          className="h-10 w-10 rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <span className="text-sm font-bold">{memberInfo.nickname}</span>
          <span className="text-xs text-gray-500">{star.updatedAt}</span>
        </div>
      </div>
      <div>
        <img src={star.imageUrl} alt="별 이미지" className="w-full" />
      </div>
      <div className="flex flex-row items-center p-4">
        <p className="text-blue flex-grow">{star.content}</p>
        <button
          className={`scale-100 transform text-2xl text-yellow-500 transition-transform focus:outline-none ${"animate-bounce"}`}
          onClick={() => handleLikeClick(star.starId)}
        >
          {star.alreadyLiked ? <AiFillStar /> : <AiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default DetailStar;
