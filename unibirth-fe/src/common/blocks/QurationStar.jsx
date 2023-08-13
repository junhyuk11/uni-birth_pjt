import React from "react";
import Button1 from "../atoms/Button1";
import { useNavigation } from "../../hooks/useNavigation";

const QurationStar = ({ data }) => {
  const { navigateToDetailStar } = useNavigation();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* 이미지 */}
      <div className="w-full" onClick={() => navigateToDetailStar(data.starId)}>
        <img
          src={data.imageUrl}
          alt="별 이미지"
          className="h-auto max-h-96 w-full object-cover"
        />
      </div>

      {/* 닉네임 */}
      <div className="mt-2 w-full text-center font-bold">{data.nickname}</div>

      {/* 제목, 내용 및 버튼 */}
      <div className="mt-2 flex w-full items-center justify-between px-4">
        <div className="flex flex-col">
          <div className="font-bold">data.title 이거 나중에 괄호치면 댐</div>
          <div>{data.content}</div>
        </div>
        <div>
          <Button1
            value="별 보기"
            onClick={() => navigateToDetailStar(data.starId)}
          />
        </div>
      </div>
    </div>
  );
};

export default QurationStar;
