import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSearchApi from "../../api/useSearchApi";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../recoil/atoms";
import { useNavigation } from "../../hooks/useNavigation";
import Button2 from "../atoms/Button2";
import LeftArrow from "../../assets/icons/js/leftArrow";
import SearchHeader from "../blocks/SearchHeader";
import CustomAlert from "../atoms/CustomAlert";

const SearchCommon = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("constellation");
  const query = location.state.query;
  const category = location.state.categoryName;
  const [constellationList, setConstellationList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [starList, setStarList] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const {
    navigateToDetailConstellation,
    navigateToDetailStar,
    navigateToMemberProfile,
    navigateToBack,
  } = useNavigation();

  useEffect(() => {
    getSearchGetSearch();
  }, [query, category]);

  const getSearchGetSearch = async () => {
    try {
      const response = await useSearchApi.searchGetSearch(category, query);
      if (response.status === 200) {
        setConstellationList(response.resultData.constellationList || []);
        setMemberList(response.resultData.memberList || []);
        setStarList(response.resultData.starList || []);
      } else {
        setIsAlertVisible(true);
        setAlertMessage("검색 결과를 불러오는데 실패하였습니다.");
      }
    } catch (e) {
      setIsAlertVisible(true);
      setAlertMessage("검색 결과를 불러오는데 실패하였습니다.");
    }
  };
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const handleConstellationClick = (constellationId) => {
    navigateToDetailConstellation(constellationId);
  };

  const handleMemberClick = (nickname) => {
    navigateToMemberProfile(nickname);
  };

  const handleStarClick = (starId) => {
    navigateToDetailStar(starId);
  };

  const buttonsHeader = [
    {
      component: Button2, // Assuming you have this imported or you can adjust based on your needs
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
          if (alertMessage === "검색 결과를 불러오는데 실패하였습니다.") {
            navigateToBack();
          }
        }}
      />
      <SearchHeader
        buttons={buttonsHeader}
        category={searchCategory}
        setCategory={setSearchCategory}
        query={searchQuery}
        setQuery={setSearchQuery}
      />{" "}
      <div className="h-screen bg-gray-100">
        <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
          <button
            onClick={() => setActiveTab("constellation")}
            className={`pb-2 ${
              activeTab === "constellation" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            별자리 리스트
          </button>
          <button
            onClick={() => setActiveTab("member")}
            className={`pb-2 ${
              activeTab === "member" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            멤버 리스트
          </button>
          <button
            onClick={() => setActiveTab("star")}
            className={`pb-2 ${
              activeTab === "star" ? "border-b-2 border-blue-500" : ""
            }`}
          >
            스타 리스트
          </button>
        </div>
        <div className="grid max-h-[calc(100vh-180px)] gap-4 overflow-y-auto px-4 pt-6">
          {activeTab === "constellation" && (
            <div className="col-span-3">
              {constellationList.map((constellation) => (
                <div
                  key={constellation.constellationId}
                  className="mb-4 flex items-center"
                  onClick={() =>
                    handleConstellationClick(constellation.constellationId)
                  }
                >
                  <img
                    src={constellation.imageUrl}
                    alt={constellation.title}
                    className="mr-4 h-14 w-14 rounded-lg object-cover"
                  />
                  <span className="text-gray-700">{constellation.title}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "member" && (
            <div className="col-span-3">
              {memberList.map((member) => (
                <div
                  key={member.nickname}
                  className="mb-4 flex items-center"
                  onClick={() => handleMemberClick(member.nickname)}
                >
                  <img
                    src={member.imageUrl}
                    alt={member.nickname}
                    className="mr-4 h-14 w-14 rounded-full object-cover"
                  />
                  <span className="text-gray-700">{member.nickname}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "star" && (
            <div className="col-span-3">
              {starList.map((star) => (
                <div
                  key={star.starId}
                  className="group relative mb-4 flex items-start"
                  onClick={() => handleStarClick(star.starId)}
                >
                  <img
                    src={star.imageUrl}
                    alt={star.content}
                    className="mr-4 h-14 w-14 rounded-lg object-cover"
                  />
                  <div>
                    <span className="font-semibold text-gray-700">
                      {star.nickname}
                    </span>
                    <p className="text-sm text-gray-500">{star.content}</p>
                    <span className="text-xs text-gray-400">
                      {formatDate(star.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCommon;
