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
    <div>
      <p className="text-white-500">검색어: {query}</p>
      <p className="text-white-500">카테고리: {category}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="text-green-500">
          <p>별자리 리스트</p>
          {constellationList.length > 0 &&
            constellationList.map((constellation) => (
              <div
                key={constellation.constellationId}
                className="flex"
                onClick={() =>
                  handleConstellationClick(constellation.constellationId)
                }
              >
                <img
                  src={constellation.imageUrl}
                  alt={constellation.title}
                  className="h-1/4 w-1/4 object-cover"
                />
                <p className="w-3/4 pl-4">별자리 이름: {constellation.title}</p>
              </div>
            ))}
        </div>
        <div className="text-sky-500">
          <p>멤버 리스트</p>
          {memberList.length > 0 &&
            memberList.map((member) => (
              <div
                key={member.nickname}
                className="flex"
                onClick={() => handleMemberClick(member.nickname)}
              >
                <img
                  src={member.imageUrl}
                  alt={member.title}
                  className="h-1/4 w-1/4 object-cover"
                />
                <p className="w-3/4 pl-4">멤버 닉네임: {member.nickname}</p>
              </div>
            ))}
        </div>
        <div className="text-red-500">
          <p>스타 리스트</p>
          {starList.length > 0 &&
            starList.map((star) => (
              <div
                key={star.starId}
                className="flex"
                onClick={() => handleStarClick(star.starId)}
              >
                <img
                  src={star.imageUrl}
                  alt={star.title}
                  className="h-1/4 w-1/4 object-cover"
                />
                <p className="w-3/4 pl-4">스타 이름: {star.content}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCommon;
