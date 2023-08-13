import React from "react";

const InputImage = ({ image, content, jodiacname, onChange }) => {
  return (
    <div className="flex flex-col content-center items-center justify-center space-y-2 font-Pretendard text-white">
      <label htmlFor="profileimage" className="text-gray-200">
        너의 별자리{" "}
      </label>
      <img src={image} className="h-32 w-32" />
      <p jodiacname={jodiacname} className=" font-Pretendard text-gray-100">
        {jodiacname}
      </p>
      <p content={content}> {content}</p>
      <input
        className="w-30 border border-gray-300 bg-transparent text-center font-bold text-gray-400"
        type="date"
        name="birthdate"
        id="birthdate"
        min="1900-01-01"
        max="2099-12-31"
        onChange={onChange}
      />
    </div>
  );
};

export default InputImage;
