import React from "react";

const InputImage = ({ onChange }) => {
  return (
    <div className="flex flex-col content-center items-center justify-center font-Pretendard">
      <input
        type="file"
        name="profileimage"
        id="profileimage"
        accept="image/*"
        onChange={onChange}
        style={{ display: "none" }}
      />
      <label
        htmlFor="profileimage"
        className="mx-auto flex cursor-pointer items-center rounded  text-blue-600"
      >
        프로필 이미지 변경
      </label>
    </div>
  );
};

export default InputImage;
