import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useSearchApi from "../../api/useSearchApi";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../recoil/atoms";
import { useNavigation } from "../../hooks/useNavigation";

const SearchCommon = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const location = useLocation();
  const query = location.state.query;
  const category = location.state.categoryName;
  const [constellationList, setConstellationList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [starList, setStarList] = useState([]);

  const {
    navigateToDetailConstellation,
    navigateToDetailStar,
    navigateToMemberProfile,
  } = useNavigation();

  useEffect(() => {
    getSearchGetSearch();
  }, []);

  const getSearchGetSearch = async () => {
    try {
      const response = await useSearchApi.searchGetSearch(category, query);
      if (response.status === 200) {
        console.log("파일을 불러왔습니다.", response.resultData);
        console.log("별자리 리스트", response.resultData.constellationList);
        console.log("멤버 리스트", response.resultData.memberList);
        console.log("스타 리스트", response.resultData.starList);
        setConstellationList(response.resultData.constellationList || []);
        setMemberList(response.resultData.memberList || []);
        setStarList(response.resultData.starList || []);
      } else {
        alert("파일을 불러오는데 실패하였습니다.");
      }
    } catch (e) {
      console.log(e);
      alert("파일을 불러오는데 실패하였습니다.");
    }
  };

  const handleConstellationClick = (constellationId) => {
    console.log("별자리 클릭", constellationId);
    navigateToDetailConstellation(constellationId);
  };

  const handleMemberClick = (nickname) => {
    console.log("멤버 클릭", nickname);
    navigateToMemberProfile(nickname);
  };

  const handleStarClick = (starId) => {
    console.log("스타 클릭", starId);
    navigateToDetailStar(starId);
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <div className="flex justify-center space-x-4 border-b-2">
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
      </div>
      <div className="px-4 pt-6">
        {activeTab === "constellation" && <div>{/* 별자리 리스트 UI */}</div>}
        {activeTab === "member" && <div>{/* 멤버 리스트 UI */}</div>}
        {activeTab === "star" && <div>{/* 스타 리스트 UI */}</div>}
      </div>
    </div>
  );
};

export default SearchCommon;
