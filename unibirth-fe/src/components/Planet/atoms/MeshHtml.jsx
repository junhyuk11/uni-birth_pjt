import React, { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useNavigation } from "../../../hooks/useNavigation";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import useConstellationApi from "../../../api/useConstellationApi";

const MeshHtml = ({ constellationList, moveNum, xdamper }) => {
  const { navigateToDetailConstellation } = useNavigation();

  const [localConstellationList, setLocalConstellationList] = useState(
    constellationList?.constellationList,
  );

  useEffect(() => {
    setLocalConstellationList(constellationList?.constellationList);
  }, [constellationList]);

  const handlePinClick = async (index, constellation) => {
    if (constellation.alreadyPined) {
      try {
        const response = await useConstellationApi.constellationsDeletePin(
          constellation.constellationId,
        );
        console.log(response);
        updatePinedStatus(index, false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await useConstellationApi.constellationsGetPin(
          constellation.constellationId,
        );
        console.log(response);
        updatePinedStatus(index, true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updatePinedStatus = (index, status) => {
    const newConstellationList = [...localConstellationList];
    newConstellationList[index].alreadyPined = status;
    setLocalConstellationList(newConstellationList);
  };

  const handleConstellationClick = (constellationId) => {
    navigateToDetailConstellation(constellationId);
  };

  return (
    <>
      {localConstellationList?.map((constellation, index) => (
        <group key={index}>
          <Html position={[index * moveNum + xdamper, -10, 0]}>
            <div
              style={{
                color: "white",
                fontSize: "24x",
                textAlign: "center",
              }}
            >
              <div className="h-40 w-40 space-y-5">
                <div className="flex justify-center">
                  <div className="flex w-24 flex-row items-center justify-between">
                    <p className="text-2lg">{constellation.constellationId}</p>
                    <p>{constellation.title}</p>
                  </div>
                  <div>{constellation.content}</div>
                </div>
                <button
                  className="w-40 rounded-full bg-red-500 p-2 text-white"
                  onClick={() =>
                    handleConstellationClick(constellation.constellationId)
                  }
                >
                  별자리 이동하기
                </button>
                <div
                  className="flex justify-center"
                  onClick={() => handlePinClick(index, constellation)}
                >
                  {constellation.alreadyPined ? (
                    <AiFillPushpin size={30} />
                  ) : (
                    <AiOutlinePushpin size={30} />
                  )}
                </div>

                <img src={constellation.imageUrl} />
              </div>
            </div>
          </Html>
        </group>
      ))}
    </>
  );
};

export default MeshHtml;
