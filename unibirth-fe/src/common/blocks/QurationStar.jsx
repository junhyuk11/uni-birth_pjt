import React from "react";
import Button1 from "../atoms/Button1";
import { useNavigation } from "../../hooks/useNavigation";

const QurationStar = ({ data }) => {
  const { navigateToDetailStar, navigateToDetailConstellation } =
    useNavigation();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* 이미지 */}
      <div
        className="w-full cursor-pointer"
        onClick={() => navigateToDetailStar(data.starId)}
      >
        <img
          src={data.imageUrl}
          alt="별 이미지"
          className="mb-4 h-auto max-h-96 w-full object-cover"
        />
      </div>

      <div className="mb-2 flex w-full items-center justify-between px-4">
        <div className="text-xl font-bold">{data.title}</div>
        <div className="flex">
          <Button1
            value="별 보기"
            className="mr-2 text-base font-normal"
            onClick={() => navigateToDetailStar(data.starId)}
          />
          <Button1
            value="별 자리"
            className="text-base font-normal"
            onClick={() => navigateToDetailConstellation(data.constellationId)}
          />
        </div>
      </div>

      {/* 닉네임, 내용 및 버튼 */}
      <div className="mb-4 flex w-full justify-between px-4">
        <div className="text-gray-300">{data.content}</div>
        <div className="mb-2 ml-4 font-bold">{data.nickname}</div>
      </div>
    </div>
  );
};

export default QurationStar;
