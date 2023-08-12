import React, { useState, useEffect } from "react";
import Button2 from "../atoms/Button2";
import { useNavigation } from "../../hooks/useNavigation";
import Footer3 from "../blocks/Footer3";
import Button1 from "../atoms/Button1";
import SearchHeader from "../blocks/SearchHeader";
import QurationStar from "../blocks/QurationStar";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../recoil/atoms";
import LeftArrow from "../../assets/icons/js/leftArrow";

const DetailConstellation = () => {
  const backgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    backgroundflag(true);
  }, []);
  const { navigateToBack } = useNavigation();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const buttonsHeader = [
    {
      component: Button2,
      className: "font-TAEBAEKmilkyway",
      onClick: navigateToBack,
      icon: <LeftArrow />,
    },
  ];

  const buttonsFooter = [
    {
      component: Button1,
      value: "별자리보기",
    },
    {
      component: Button1,
      value: "찜하기",
    },
  ];

  return (
    <div className="mx-auto h-screen max-w-screen-sm bg-slate-100 bg-opacity-50">
      <div>
        <SearchHeader
          buttons={buttonsHeader}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
        />
        <div className="flex flex-col items-center justify-center"></div>
        <QurationStar />
        <Footer3 buttons={buttonsFooter} />
      </div>
    </div>
  );
};

export default DetailConstellation;
