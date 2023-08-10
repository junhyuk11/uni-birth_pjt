import React, { useRef, useState, useEffect } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import {
  BiSolidRightArrow,
  BiSolidLeftArrow,
  BiMoveHorizontal,
} from "react-icons/bi";
// import MeshConstellation from "../atoms/MeshConstellation";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import GradientBackground from "../../../common/atoms/GradientBackground";
// import MeshHtml from "../atoms/MeshHtml";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import {
  backgroundflagState,
  currentConsIndexState,
  currentconstellationListState,
} from "../../../recoil/atoms";
import MeshCons from "../atoms/MeshCons";
import { gsap } from "gsap";

// 여기에서 카메라 컨트롤러 관리해야함
// R3F 훅 카메라 컨트롤러 컴포넌트
function CameraController({ ConstellationPosition, zoomed }) {
  console.log("콘솔로그::", ConstellationPosition);
  console.log("캐캐캐", zoomed);

  // 현재 별자리 리스트 리코일 관리

  const { camera } = useThree();
  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const zoomFactor = 0.1;
  const multiFactor = 1.5;
  console.log("ConstellationPosition:", ConstellationPosition);

  if (ConstellationPosition) {
    console.log("제[발!!ㅣ", ConstellationPosition);
    const targetPosition = zoomed
      ? {
          x: ConstellationPosition.x * multiFactor + 50,
          y: ConstellationPosition.y * multiFactor + 20,
          z: ConstellationPosition.z * multiFactor,
        }
      : {
          x: ConstellationPosition.x * zoomFactor,
          y: ConstellationPosition.y * zoomFactor,
          z: ConstellationPosition.z * zoomFactor,
        };
    const startPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

    console.log("카메라 표지션:ㅣ", startPosition);

    const updateCameraPosition = () => {
      cameraRef.current.position.set(
        startPosition.x,
        startPosition.y,
        startPosition.z,
      );
      cameraRef.current.lookAt(0, 0, 0);
      cameraRef.current.updateProjectionMatrix();
    };

    gsap.to(startPosition, {
      duration: 2.5, // duration in seconds
      x: -targetPosition.x,
      y: -targetPosition.y,
      z: -targetPosition.z,
      onUpdate: updateCameraPosition,
      // ease: "power1.inOut", // easing function for smooth transition
    });
  }
  return null;
}

const Scene = ({ constellationList }) => {
  console.log("아니 받았어그래서?;::", constellationList);
  // 배경화면 flag
  const setBackgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    setBackgroundflag(false);
  }, []);
  const controlsRef = useRef();

  useEffect(() => {}, [constellationList]);

  // 별자리 인덱스 이동
  const [ConstellationIndex, setConstellationIndex] = useRecoilState(
    currentConsIndexState,
  );
  const currentconstellationList = useRecoilValue(
    currentconstellationListState,
  );

  // 확대 축소
  const [zoomed, setZoomed] = useState(false);
  // 별자리 보정계수
  // const moveNum = 50;
  const num = 50; // 별자리 간격
  const starmultiple = 3; // 별간격
  const xdamper = -10; // x축+- 보정계수

  // 별자리 인덱스
  const [currentConstellation, setCurrentConstellation] = useState(
    ConstellationIndex % currentconstellationList.length,
  );

  console.log("현재 별자리 위치:", currentConstellation);

  const handleRightClick = () => {
    setCurrentConstellation((prevIndex) =>
      prevIndex === 0 ? currentconstellationList.length - 1 : prevIndex - 1,
    );
    setConstellationIndex((prevIndex) =>
      prevIndex === 0 ? currentconstellationList.length - 1 : prevIndex - 1,
    );
  };

  // Handle left button click
  const handleLeftClick = () => {
    setCurrentConstellation((prevIndex) =>
      prevIndex === currentconstellationList.length - 1 ? 0 : prevIndex + 1,
    );
    setConstellationIndex((prevIndex) =>
      prevIndex === currentconstellationList.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // 확대축소 버튼
  const handleZoomClick = () => {
    setZoomed(!zoomed);
  };

  return (
    <>
      <button
        className="absolute left-4 top-1/2 z-10 flex flex-col text-4xl text-white opacity-50"
        onClick={handleLeftClick}
      >
        <BiSolidLeftArrow />
      </button>
      <button
        className="absolute right-4 top-1/2 z-10 flex flex-col text-4xl text-white opacity-50"
        onClick={handleRightClick}
      >
        <BiSolidRightArrow />
      </button>
      <button
        className="absolute bottom-10 right-5
        z-10 flex -translate-x-1/2 flex-col text-6xl text-white"
        onClick={handleZoomClick}
      >
        <BiMoveHorizontal style={{ color: zoomed ? "red" : "white" }} />
      </button>
      <Canvas camera={{ position: [0, 0, 1] }}>
        {/* <CameraController
          ConstellationIndex={ConstellationIndex}
          zoomed={zoomed}
        /> */}
        <GradientBackground />
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
        <OrbitControls
          ref={controlsRef}
          // enablePan={true}
          enableDamping={false}
          rotateSpeed={-0.4}
          minDistance={1} // minimum zoom distance
          maxDistance={700} // maximum zoom distance
        />
        <axesHelper scale={5} />
        <color attach="background" args={["black"]} />
        <Stars
          radius={200}
          depth={30}
          count={10000}
          factor={4}
          saturation={1}
          fade
        />
        {/* <MeshConstellation
          currentconstellationList={currentconstellationList}
          num={num}
          starmultiple={starmultiple}
          xdamper={xdamper}
        />
        <MeshHtml
          currentconstellationList={currentconstellationList}
          xdamper={xdamper}
        /> */}
        <MeshCons
          constellationList={constellationList}
          num={num}
          starmultiple={starmultiple}
          xdamper={xdamper}
          ConstellationIndex={ConstellationIndex}
          setConstellationIndex={setConstellationIndex}
        />
        {/* <CameraController
          currentconstellationList={currentconstellationList}
          ConstellationIndex={ConstellationIndex}
          zoomed={zoomed}
        /> */}
        <CameraController
          ConstellationPosition={currentconstellationList[currentConstellation]}
        />
      </Canvas>
    </>
  );
};

export default Scene;
