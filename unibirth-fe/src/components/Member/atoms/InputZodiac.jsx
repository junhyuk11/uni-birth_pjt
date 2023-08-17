import React from "react";

const InputImage = ({ image, content, jodiacname, onChange }) => {
  return (
    <div className="mr-2 flex w-1/2 items-center justify-center font-Pretendard">
      <img
        src={image}
        className="h-32 w-32"
        alt={`별자리 이미지: ${jodiacname}`}
      />
      <p className=" font-Pretendard text-gray-100">{jodiacname}</p>
      <input
        className="w-30 border border-gray-300 bg-transparent text-center font-bold text-gray-400"
        type="date"
        name="birthdate"
        id="birthdate"
        min="1900-01-01"
        max="2023-12-31"
        onChange={onChange}
      />
    </div>
  );
};

export default InputImage;
