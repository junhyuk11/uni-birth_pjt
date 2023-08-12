import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "../../../hooks/useNavigation";
import useConstellationApi from "../../../api/useConstellationApi";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Line } from "@react-three/drei";
import {
  starListState,
  boxcontentState,
  boxnicknameState,
  boxurlState,
  boxidState,
  boxcreatedState,
  StellaIdState,
} from "../../../recoil/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as THREE from "three";
import GradientBackground from "../../../common/atoms/GradientBackground";
import Background from "../../../common/atoms/Background";
import Plus from "../../../assets/icons/js/plus";
import CustomSphere from "./CustomSphere";

const ListSectionStar = () => {
  const ref = useRef();
  // const tooltipRef = useRef(null);
  const { constellationId } = useParams();
  const setStellaId = useSetRecoilState(StellaIdState);

  const { navigateToDetailStar } = useNavigation();
  const [starList, setStarList] = useRecoilState(starListState);
  const [starListIndex, setStarListIndex] = useState([]);
  // Star box Content
  const [boxcontent, setBoxcontent] = useRecoilState(boxcontentState);
  const [boxnickname, setBoxnickname] = useRecoilState(boxnicknameState);
  const [boxurl, setBoxurl] = useRecoilState(boxurlState);
  const [boxid, setBoxid] = useRecoilState(boxidState);
  const [boxcreated, setBoxcreated] = useRecoilState(boxcreatedState);
  // 김민섭
  const [brightness, setBrightness] = useState(0);

  // tooltip
  const [tooltipStyle, setTooltipStyle] = useState({ display: "none" });
  const { navigateToRegisterStar } = useNavigation();
  const handleBoxClick = ({ event, index }) => {
    console.log(index);
    const mouse = new THREE.Vector2();
    mouse.x = event.clientX + 100;
    mouse.y = event.clientY - 100;
    console.log(mouse.x);
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log(mouse);
    // const rect = event.target.getBoundingClientRect();
    setTooltipStyle({
      left: `${mouse.x}px`,
      top: `${mouse.y}px`,
      display: "block",
    });

    // Set StarBox Content
    console.log("index:", starListIndex[index]);
    setBoxcontent(starListIndex[index]?.content);
    setBoxnickname(starListIndex[index]?.nickname);
    setBoxurl(starListIndex[index]?.imageUrl);
    setBoxid(starListIndex[index]?.starId);
    setBoxcreated(starListIndex[index]?.createdAt);
    setBrightness(starListIndex[index]?.brightness);
    console.log("boxid:", boxid);
    console.log("boxurl:", boxurl);
  };
  useEffect(() => {
    getStarList(constellationId);
    setStellaId(constellationId);
    console.log("ref:", ref);
  }, [constellationId]);

  const getStarList = async (constellationId) => {
    // console.log("consteelationID:", constellationId);
    try {
      const response = await useConstellationApi.constellationsGetConstellation(
        constellationId,
      );
      console.log(" setStarList:", response);
      setStarList(response.resultData);
      setStarListIndex(response.resultData.starList);
      // console.log("starList:", starList);
    } catch (error) {
      console.error("Failed to get star list:", error);
    }
  };

  // starPotisions recoil 저장
  const starPoint = starList?.pointList;
  const num = 5; // 별 거리 조절
  const zero = 20;
  // const znum = (Math.floor(Math.random() * 11) - 5) * num;
  const starPotisions = starPoint?.map((star) => ({
    x: star[0] * num - zero,
    y: star[1] * num,
    z: star[2] * num,
    // brightness: starList?.Star.brightness,
    // starId: starList?.Star.starId,
    // memberId: starList?.Star.memberId,
    // imageUrl: starList?.Star.constellationId,
  }));

  const lines = starList?.lineList;

  // console.log("lineList:", lines);
  // console.log("starPosition:", starPotisions);

  return (
    <div className="relative bottom-0 h-screen w-screen">
      <button
        className="absolute bottom-36 right-4 z-10 flex flex-col text-4xl text-white opacity-100"
        onClick={navigateToRegisterStar}
      >
        <Plus />
      </button>
      <Canvas camera={{ position: [0, 0, 70] }}>
        <CustomSphere />
        <Background />
        <axesHelper scale={5} />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        {/* <color attach="background" args={["black"]} /> */}
        <GradientBackground />
        {starPotisions?.map((star, index) => (
          <group key={index}>
            <mesh
              ref={ref}
              position={[star.x, star.y, star.z]}
              onClick={(event) => {
                if (starListIndex[index]) {
                  handleBoxClick({ event, index });
                }
              }}
            >
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial
                color={starList.color ? starList.color : "#ffffff"}
                emissive={starList.color ? starList.color : "#ffffff"}
                // emissive="#fbf59b"
                // emissiveMap={material}
                emissiveIntensity={starListIndex[index]?.brightness + 1 || 0.04}
                // emissiveIntensity={starList.starList[index].brightness}
              />
            </mesh>
            {lines.map((line, index) => (
              <Line
                key={index}
                points={[
                  [line[0] * num - zero, line[1] * num, line[2] * num],
                  [line[3] * num - zero, line[4] * num, line[5] * num],
                ]}
                color="white"
              />
            ))}
          </group>
        ))}
      </Canvas>
      <div>
        {/* 별을 클릭했을 때 위치 조정 필요 */}
        <div
          className={`
  absolute z-50
  w-screen max-w-screen-sm rounded-lg bg-white p-2
  ${tooltipStyle.display === "none" ? "hidden" : ""}`}
          style={
            {
              bottom: "30%",
              left: "50%",
              transform: "translateX(-50%)",
            }
            // parseInt(tooltipStyle.left) < 400
            //   ? { left: tooltipStyle.left, top: tooltipStyle.top }
            //   : { left: tooltipStyle.left - 400, top: tooltipStyle.top }
            // right: `${
            //   window.innerWidth -
            //   parseInt(tooltipStyle.left) -
            //   tooltipRef.current.offsetWidth
            // }px`,
            // top: tooltipStyle.top,
          }
        >
          <div className="relative flex flex-col font-Pretendard">
            <button
              className="absolute right-0 top-0 rounded-lg font-bold"
              onClick={() =>
                setTooltipStyle({ ...tooltipStyle, display: "none" })
              }
            >
              X
            </button>
            <div className="flex-flex-row">
              <div className="flex items-center justify-center">
                <img
                  className="h-64 w-80 rounded-lg"
                  src={boxurl}
                  alt="star"
                  style={{ objectFit: "cover", overflow: "hidden" }}
                />
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between p-2">
                  <p className="flex font-bold">{boxnickname}</p>
                  <p className="flex">{boxcreated?.slice(0, 10)}</p>
                </div>
                <p>{boxcontent}</p>
                <p></p>
              </div>
            </div>
            현재 빛남 : {brightness}
            <button
              className="rounded-lg border-2 border-black bg-transparent text-black"
              onClick={() => navigateToDetailStar(boxid)}
            >
              이동하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSectionStar;
