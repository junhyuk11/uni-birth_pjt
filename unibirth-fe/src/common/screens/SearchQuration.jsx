import React, { useState, useEffect } from "react";
import Button2 from "../atoms/Button2";
import { useNavigation } from "../../hooks/useNavigation";
import Button1 from "../atoms/Button1";
import SearchHeader from "../blocks/SearchHeader";
import QurationStar from "../blocks/QurationStar";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { backgroundflagState, nicknameState } from "../../recoil/atoms";
import LeftArrow from "../../assets/icons/js/leftArrow";
import Header5 from "../blocks/Header5";
import useSearchApi from "../../api/useSearchApi";
import CustomAlert from "../atoms/CustomAlert";

const SearchQuration = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const nickname = useRecoilValue(nicknameState);
  const [alertMessage, setAlertMessage] = useState("");

  const { navigateToBack } = useNavigation();
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [currentState, setCurrentState] = useState("팔로우");
  const [followingData, setFollowingData] = useState([]);
  const [interestData, setInterestData] = useState([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const getQurationStar = async () => {
    try {
      const response = await useSearchApi.searchGetMemberCuration(nickname);
      if (response.status === 200) {
        setFollowingData(response.resultData[0]);
        setInterestData(response.resultData[1]);
      } else if (response.status === 403) {
        setIsAlertVisible(true);
        setAlertMessage("로그인이 필요한 서비스입니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getQurationStar();
  }, []);
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  const buttonsHeader2 = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "팔로우",
      onClick: () => setCurrentState("팔로우"),
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "관심행성",
      onClick: () => setCurrentState("관심행성"),
    },
  ];

  return (
    <div className="mx-auto h-full min-h-screen max-w-screen-sm">
      <header className="fixed top-0 z-10 bg-black bg-opacity-90">
        <SearchHeader
          buttons={buttonsHeader}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
        />
      </header>
      <div className="bg-space-black mx-auto mt-16 flex h-screen max-w-screen-sm flex-col text-white">
        <CustomAlert
          message={alertMessage}
          isVisible={isAlertVisible}
          onClose={() => {
            setIsAlertVisible(false);
            if (
              alertMessage === "로그인이 필요한 서비스입니다." ||
              alertMessage === "오류가 발생했습니다."
            ) {
              navigateToBack();
            }
          }}
        />
        <div className="flex flex-1 flex-col p-4">
          <div className="my-4">
            <Header5 buttons={buttonsHeader2} />
          </div>
          <div className="mt-30 flex flex-col items-center justify-center"></div>
          {currentState === "팔로우" && <QurationStar data={followingData} />}
          {currentState === "관심행성" && <QurationStar data={interestData} />}
        </div>
      </div>
    </div>
  );
};

export default SearchQuration;
