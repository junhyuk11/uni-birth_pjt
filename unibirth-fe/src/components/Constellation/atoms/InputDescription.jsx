import React from "react";

const InpuitDescription = ({ constellationDescp, setConstellationDescp }) => {
  // const [inputStella, setinputStella] = useState("Option 1");

  return (
    <div className="mt-10 flex flex-col items-center justify-center border-b-2">
      <label
        htmlFor="constellationDescp"
        className="inline-block w-20 
          text-center font-bold text-gray-200"
      >
        설명
      </label>
      <div className="w-full">
        <div className=" flex flex-row items-center justify-center">
          <p className="inline-block text-sm text-white">&nbsp;&nbsp;&nbsp;</p>
          <textarea
            style={{
              overflow: "hidden",
              resize: "none", // 사용자가 크기를 조정할 수 없도록 함
            }}
            type="text"
            id="constellationDescp"
            name="constellationDescp"
            value={constellationDescp}
            maxLength={50}
            className="h-28 w-44 bg-transparent text-center text-yellow-200 outline-none "
            onChange={(e) => setConstellationDescp(e.target.value)}
          />
          <p className="inline-block text-sm text-white">&nbsp;&nbsp;&nbsp;</p>
        </div>
      </div>
    </div>
  );
};

export default InpuitDescription;
