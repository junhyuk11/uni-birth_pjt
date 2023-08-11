import React, { useEffect, useState } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import useConstellationApi from "../../../api/useConstellationApi";
import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";

const HtmlConstellation = ({ constellationId }) => {
  if (constellationId) {
    // naviigate  to detailconstellation
    const { navigateToDetailConstellation } = useNavigation();
    const handleConstellationClick = (constellationId) => {
      navigateToDetailConstellation(constellationId);
    };
    const [constellationContent, setConstellationConstent] = useState([]);

    useEffect(() => {
      getConstellationContent(constellationId);
    }, [constellationId]);

    const getConstellationContent = async (constellationId) => {
      try {
        const response = await useConstellationApi.constellationsGetDetail(
          constellationId,
        );
        setConstellationConstent(response.resultData);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(constellationContent);

    const handlePinClick = async (constellationContent) => {
      if (constellationContent.alreadyPined) {
        try {
          const response = await useConstellationApi.constellationsDeletePin(
            constellationContent.constellationId,
          );
          console.log(response);
          setUpdatePinedStatus(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await useConstellationApi.constellationsGetPin(
            constellationContent.constellationId,
          );
          console.log(response);
          setUpdatePinedStatus(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const [updatePinedStatus, setUpdatePinedStatus] = useState(
      constellationContent?.alreadyPined,
    );

    console.log("updatePinedStatus:", updatePinedStatus);

    const [isVisible, setIsVisible] = useState(true);
    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    return (
      <div>
        <button
          className="absolute left-20 top-10 z-10 rounded-lg bg-red-400 p-2  text-white"
          onClick={toggleVisibility}
        >
          {isVisible ? "Make Invisible" : "Make Visible"}
        </button>
        {isVisible && (
          <div className="absolute left-1/2 top-10 z-10 h-60 w-80 -translate-x-1/2 rounded-lg">
            <div className="flex flex-col justify-center space-y-5">
              <div className="flex justify-center">
                <div className="h-36 rounded-lg">
                  <img src={constellationContent.imageUrl} alt="별자리" />
                </div>
              </div>
              <div className="flex justify-center text-white">
                별자리 ID : {constellationId}
              </div>
              <div className="flex justify-center text-white">
                별자리 title: {constellationContent.constellationTitle}
              </div>
              <div className="flex justify-center">
                <button
                  className="w-40 rounded-full bg-red-500 p-2 text-white"
                  onClick={() => handleConstellationClick(constellationId)}
                >
                  별자리 이동하기
                </button>
              </div>
              <div
                className="flex justify-center"
                onClick={() => handlePinClick(constellationContent)}
              >
                <div className="aboslute bottom-60 left-1/2 text-white">
                  {updatePinedStatus ? (
                    <AiFillPushpin size={30} />
                  ) : (
                    <AiOutlinePushpin size={30} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
};
export default HtmlConstellation;
