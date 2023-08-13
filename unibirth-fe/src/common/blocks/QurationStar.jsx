import React from "react";
import Button1 from "../atoms/Button1";
import { useNavigation } from "../../hooks/useNavigation";

const QurationStar = ({ data }) => {
  const { navigateToDetailStar } = useNavigation();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full" onClick={() => navigateToDetailStar(data.starId)}>
        <img
          src={data.imageUrl}
          alt="별 이미지"
          className="h-auto max-h-96 w-full object-cover"
        />{" "}
      </div>
      <h3 className="font-bold">{data.nickname}</h3>
      <p>{data.content}</p>
      <Button1
        value="별 보기"
        onClick={() => navigateToDetailStar(data.starId)}
      />
    </div>
  );
};

export default QurationStar;
