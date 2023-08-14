// import React from "react";
import React, { useRef, useState, useEffect } from "react";
// import usePlanetApi from "../../../api/usePlanetApi";
import Button1 from "../../../common/atoms/Button1";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import MeshPlanet from "../atoms/MeshPlanet";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { PiCubeFocus } from "react-icons/pi";
import { gsap } from "gsap";
import GradientBackground from "../../../common/atoms/GradientBackground";
import { useSetRecoilState } from "recoil";
import { backgroundflagState } from "../../../recoil/atoms";
import { PLANET_LIST } from "../../../constants/constants";

// R3F 훅 카메라 컨트롤러 컴포넌트
function CameraController({ planet, zoomed }) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  cameraRef.current = camera;
  const zoomFactor = 0.1;
  const multiFactor = 1.5;
  useEffect(() => {
    const targetPosition = zoomed
      ? {
          x: planet.x * multiFactor + 50,
          y: planet.y * multiFactor + 20,
          z: planet.z * multiFactor,
        }
      : {
          x: planet.x * zoomFactor,
          y: planet.y * zoomFactor,
          z: planet.z * zoomFactor,
        };
    const startPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };

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
      duration: 2, // duration in seconds
      x: -targetPosition.x,
      y: -targetPosition.y,
      z: -targetPosition.z,
      onUpdate: updateCameraPosition,
      ease: "power1.inOut", // easing function for smooth transition
    });
  }, [planet, zoomed]);

  return null;
}

const ListSectionPlanet = ({
  navigateToDetailPlanet,
  currentPlanet,
  setCurrentPlanet,
}) => {
  // 배경화면 flag
  const setBackgroundflag = useSetRecoilState(backgroundflagState);
  useEffect(() => {
    setBackgroundflag(false);
  }, []);

  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    // useEffect로 현재 행성이 바뀔 때마다 Update하기
  }, [currentPlanet]);

  // 왼쪽 버튼
  const handleLeftClick = () => {
    setCurrentPlanet((prevIndex) =>
      prevIndex === 0 ? PLANET_LIST.length - 1 : prevIndex - 1,
    );
  };

  // 오른쪽 버튼
  const handleRightClick = () => {
    setCurrentPlanet((prevIndex) =>
      prevIndex === PLANET_LIST.length - 1 ? 0 : prevIndex + 1,
    );
  };

  // 확대축소 버튼
  const handleZoomClick = () => {
    setZoomed(!zoomed);
  };

  // axesHelper커스텀 가능
  // import * as THREE from "three";
  // const axesHelperMaterial = new THREE.MeshBasicMaterial({ color: "red" });
  // const axesHelper = new THREE.AxesHelper(0.2);
  // axesHelper.material = axesHelperMaterial;

  return (
    <div className="absolute flex h-full w-full flex-row flex-wrap justify-center">
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
      <Button1
        className="absolute bottom-10 right-10 z-10 flex flex-col text-6xl text-white"
        onClick={handleZoomClick}
        icon={<PiCubeFocus size={30} />}
      />

      <Canvas camera={{ position: [0, 0, 0] }}>
        <OrbitControls
          enabled={true}
          rotateSpeed={-0.5}
          enablePan={false}

          // autoRotate={true}
          // autoRotateSpeed={0.5}
        />
        <CameraController planet={PLANET_LIST[currentPlanet]} zoomed={zoomed} />
        {/* <axesHelper scale={0.2} /> */}
        {/* <primitive object={axesHelper} /> */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.5}
            height={500}
            // intensity={2}
          />
        </EffectComposer>
        <GradientBackground />
        {/* <color attach="background" args={["black"]} /> */}
        <MeshPlanet navigateToDetailPlanet={navigateToDetailPlanet} />
        <Stars
          radius={100}
          depth={50}
          count={500}
          factor={4}
          saturation={3}
          fade
        />
      </Canvas>
    </div>
  );
};

export default ListSectionPlanet;
