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
import Button1 from "../atoms/Button1";
import Header5 from "../blocks/Header5";

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
        console.log(response.resultData);
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

  const buttonsHeader2 = [
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway bg-white",
      value: "별자리",
      onClick: () => setActiveTab("constellation"),
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "멤버",
      onClick: () => setActiveTab("member"),
    },
    {
      component: Button1,
      className: "font-TAEBAEKmilkyway",
      value: "스타",
      onClick: () => setActiveTab("star"),
    },
  ];

  return (
    <div className="bg-space-black mx-auto flex h-screen max-w-screen-sm flex-col text-yellow-100">
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
      />

      <div className="flex flex-1 flex-col p-4">
        <div className="my-4">
          <Header5 buttons={buttonsHeader2} />
        </div>
        <ul className="divide-nebula-blue space-y-4 divide-y overflow-y-auto">
          {activeTab === "constellation" &&
            constellationList.map((constellation) => (
              <li
                key={constellation.constellationId}
                className="animate-sparkle flex items-center px-4 py-4"
                onClick={() =>
                  handleConstellationClick(constellation.constellationId)
                }
              >
                <img
                  src={constellation.imageUrl}
                  alt={constellation.title}
                  className="glow mr-4 h-20 w-20 rounded-lg object-cover"
                />
                {constellation.title}
              </li>
            ))}
          {activeTab === "member" &&
            memberList.map((member) => (
              <li
                key={member.nickname}
                className="animate-sparkle flex items-center px-4 py-4"
                onClick={() => handleMemberClick(member.nickname)}
              >
                <img
                  src={member.imageUrl}
                  alt={member.nickname}
                  className="glow mr-4 h-20 w-20 rounded-full object-cover"
                />
                {member.nickname}
              </li>
            ))}
          {activeTab === "star" &&
            starList.map((star) => (
              <li
                key={star.starId}
                className="animate-sparkle flex items-start px-4 py-4"
                onClick={() => handleStarClick(star.starId)}
              >
                <img
                  src={star.imageUrl}
                  alt={star.content}
                  className="glow mr-4 h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex flex-col justify-between space-y-2">
                  <div className="font-bold text-yellow-400">
                    {star.nickname}
                  </div>
                  <div className="text-lg font-semibold">{star.title}</div>
                  <p className="text-sm">{star.content}</p>
                  <span className="mt-2 text-xs text-yellow-300">
                    {formatDate(star.createdAt)}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchCommon;
