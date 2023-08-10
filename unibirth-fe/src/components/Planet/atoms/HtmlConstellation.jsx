import React from "react";

const HtmlConstellation = ({ constellationId }) => {
  console.log("받은 아이디:", constellationId);
  if (constellationId) {
    return (
      <div>
        <div className="flex justify-center bg-red-500">
          별자리 ID : {constellationId}
        </div>
      </div>
    );
  }
};
export default HtmlConstellation;
