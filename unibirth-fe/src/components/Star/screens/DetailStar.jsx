import React, { useState, useEffect } from "react";
import Button2 from "../../../common/atoms/Button2";
import Header1 from "../../../common/blocks/Header1";
import { useNavigation } from "../../../hooks/useNavigation";
import useStarApi from "../../../api/useStarApi";
import useMemberApi from "../../../api/useMemberApi";
import { useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { backgroundflagState, nicknameState } from "../../../recoil/atoms";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import LeftArrow from "../../../assets/icons/js/leftArrow";
import CustomAlert from "../../../common/atoms/CustomAlert";
import useConstellationApi from "../../../api/useConstellationApi";
import Close from "../../../assets/icons/js/close";
import CustomConfirm from "../../../common/atoms/CustomConfirm";

const DetailStar = () => {
  const setBackgroundflag = useSetRecoilState(backgroundflagState);
  const { navigateToBack, navigateToMemberProfile } = useNavigation();
  const { starId } = useParams();
  const [memberInfo, setMemberInfo] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [constellation, setConstellation] = useState("");
  const [content, setContent] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const nickname = useRecoilValue(nicknameState);
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
    commentList: "",
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

  useEffect(() => {
    if (star.constellationId) {
      getConstellation(star.constellationId);
    }
  }, [star]);

  const getStar = async (starId) => {
    try {
      const response = await useStarApi.starsGetStar(starId);
      console.log(response);
      if (response.status === 200) {
        setStar(response.resultData);
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("존재하지 않는 별입니다.");
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
      }
    } catch (error) {
      setIsAlertVisible(true);
      setAlertMessage("별을 불러오는데 실패하였습니다.");
    }
  };

  const getConstellation = async (constellationId) => {
    try {
      const response = await useConstellationApi.constellationsGetDetail(
        constellationId,
      );
      if (response.status === 200) {
        setConstellation(response.resultData);
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("존재하지 않는 별입니다.");
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
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
      } else if (response.status === 404) {
        setIsAlertVisible(true);
        setAlertMessage("존재하지 않는 회원입니다.");
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
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
          getStar(starId);
          setStar({
            ...star,
            alreadyLiked: false,
          });
        } else {
          setIsAlertVisible(true);
          setAlertMessage(response.message);
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("오류 발생");
      }
    } else {
      try {
        const response = await useStarApi.starsGetBrightness(starId);
        if (response.status === 200) {
          getStar(starId);
          setStar({
            ...star,
            alreadyLiked: true,
          });
        } else {
          setIsAlertVisible(true);
          setAlertMessage(response.message);
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("오류 발생");
      }
    }
  };

  const handleCommentClick = async () => {
    if (content && !isSubmitting) {
      setIsSubmitting(true);
      try {
        const data = {
          starId,
          content,
        };
        const response = await useStarApi.commentRegistStar(data);
        if (response.status === 200) {
          getStar(starId);
          setContent("");
        } else {
          setIsAlertVisible(true);
          setAlertMessage(response.message);
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("오류 발생");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        const response = await useStarApi.commentDeleteStar(commentId);
        if (response.status === 200) {
          getStar(starId);
        } else {
          setIsAlertVisible(true);
          setAlertMessage(response.message);
        }
      } catch (error) {
        setIsAlertVisible(true);
        setAlertMessage("오류 발생");
      } finally {
        setIsSubmitting(false);
        setShowConfirm(false);
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
        <span className="ml-4 text-2xl text-white">
          {constellation?.constellationTitle}&nbsp;자리
        </span>
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
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (
            alertMessage === "별을 불러오는데 실패하였습니다." ||
            alertMessage === "멤버 정보를 불러오는데 실패하였습니다." ||
            alertMessage === "오류 발생" ||
            alertMessage === "존재하지 않는 별입니다." ||
            alertMessage === "로그인이 필요한 서비스입니다."
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
            <div className="w-full overflow-hidden text-2xl font-bold text-white">
              {star.title}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex flex-row justify-between  border-b-2 border-gray-300 py-2">
          <div className="flex flex-row items-center">
            <img
              src={memberInfo.imageUrl}
              alt="멤버 이미지"
              className="h-10 w-10 rounded-full object-cover" // 이미지 둥글게, 크기 조정
              style={{ alignSelf: "flex-start" }}
            />
            <div className="ml-3 mt-0 flex flex-col">
              <div
                className="text-md font-bold text-white"
                onClick={() => navigateToMemberProfile(memberInfo.nickname)}
              >
                {memberInfo.nickname}
              </div>
              <span className="text-xs text-white">
                {formatDate(star.updatedAt)}
              </span>
            </div>
          </div>
          <div className="my-auto text-white ">좋아요 {star.brightness}</div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <img
          src={star.imageUrl}
          alt="별 이미지"
          className="h-auto w-full rounded-lg"
        />
        {/* 이미지 크기 조정 */}
      </div>
      <div>
        <div className="flex flex-col items-center py-4">
          <div className="flex-grow self-start px-4 py-5 text-xl text-white">
            {star.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-row">
            <button
              className={
                "flex  scale-100 transform justify-center text-3xl text-yellow-500 transition-transform focus:outline-none"
              }
              onClick={() => handleLikeClick(star.starId)}
            >
              {star.alreadyLiked ? <AiFillStar /> : <AiOutlineStar />}
            </button>
            <div className="ml-1 mt-auto items-center justify-center text-white ">
              {star.brightness}
            </div>
          </div>
          <div className="mt-4 w-full border-t  px-4 pb-4 pt-2 text-white">
            댓글 {star.commentList.length}
          </div>
          <div className="flex w-full flex-col px-4">
            <div className="flex flex-row justify-between border-y py-2">
              <div className="flex flex-row">
                <img
                  src={memberInfo.imageUrl}
                  alt="멤버 이미지"
                  className="h-8 w-8 rounded-full object-cover"
                  style={{ alignSelf: "flex-start" }}
                />
                <input
                  className="ml-2 flex-grow bg-transparent text-white"
                  placeholder="댓글을 남겨보세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></input>
              </div>
              <button
                className="ml-2  rounded-xl border border-yellow-500 bg-transparent px-4 py-1 text-white"
                onClick={handleCommentClick}
              >
                등록
              </button>
            </div>
            {star.commentList.length === 0 ? (
              <div className="text-center">
                <div className="pt-10">
                  <p className="text-white text-opacity-60">댓글이 없습니다.</p>
                </div>
              </div>
            ) : (
              <ul className="w-full">
                {star.commentList.map((comment, commentId) => {
                  return (
                    <li
                      key={commentId}
                      className="border-b border-gray-600 py-4"
                    >
                      <div className="flex flex-row items-start justify-between">
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={comment.imageUrl}
                          onClick={() =>
                            navigateToMemberProfile(memberInfo.nickname)
                          }
                        ></img>
                        <div
                          className="ml-2 flex flex-grow flex-col"
                          style={{ maxWidth: "100%", wordWrap: "break-word" }}
                        >
                          <strong
                            className="text-base text-white"
                            onClick={() =>
                              navigateToMemberProfile(memberInfo.nickname)
                            }
                          >
                            {comment.nickname}
                          </strong>
                          <p
                            className="text-white"
                            style={{ maxWidth: "90%", wordWrap: "break-word" }}
                          >
                            {comment.content}
                          </p>
                          <span className="text-xs text-gray-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        {comment.nickname === nickname && (
                          <button
                            className=" flex flex-grow items-end justify-end self-start"
                            onClick={() => setShowConfirm(true)}
                          >
                            <Close />
                          </button>
                        )}

                        <CustomConfirm
                          isVisible={showConfirm}
                          message="정말로 삭제하시겠습니까?"
                          onClose={() => setShowConfirm(false)} // 취소 버튼을 누를 때
                          onConfirm={() =>
                            handleCommentDelete(comment.commentId)
                          } // 확인 버튼을 누를 때
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailStar;
