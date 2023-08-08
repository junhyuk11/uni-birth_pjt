import React from "react";
import Upload from "../../../assets/icons/js/upload";

const InputImage = ({ onChange }) => {
  return (
    <div className="flex flex-col content-center items-center justify-center space-y-2 pl-10 font-TAEBAEKmilkyway">
      <label
        htmlFor="profileimage"
        className="flex cursor-pointer items-center rounded px-4 py-2 text-white"
      >
        <input
          className="hidden"
          type="file"
          name="profileimage"
          id="profileimage"
          accept="image/*"
          onChange={onChange}
        />
        <Upload className="mr-2" />
      </label>
    </div>
  );
};

export default InputImage;
