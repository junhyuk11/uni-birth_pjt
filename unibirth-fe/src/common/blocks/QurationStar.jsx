import React from "react";
import Footer3 from "../blocks/Footer3";
import Button1 from "../atoms/Button1";
const QurationStar = ({ data }) => {
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
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full">
        <img
          src={data.imageUrl}
          alt="별 이미지"
          className="h-auto max-h-96 w-full object-cover"
        />{" "}
      </div>
      <h3 className="font-bold">{data.nickname}</h3>
      <p>{data.content}</p>
      <Footer3 buttons={buttonsFooter} />
    </div>
  );
};

export default QurationStar;
