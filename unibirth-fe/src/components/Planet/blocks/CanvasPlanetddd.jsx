import React, { useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GradientBackground from "../../../common/atoms/GradientBackground";

const Planet = ({ moveForward, onClick }) => {
  const meshRef = useRef();
  const { camera, raycaster, mouse } = useThree();

  useFrame((state, delta) => {
    if (moveForward) {
      meshRef.current.translateZ(-0.1 * delta);
    }

    raycaster.setFromCamera(mouse, camera);

    if (meshRef.current) {
      const intersects = raycaster.intersectObject(meshRef.current);

      if (intersects.length > 0) {
        console.log("Mesh has been intersected", intersects[0]);

        if (onClick) {
          onClick(camera, meshRef.current);
        }
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[10, 5, -5]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

const CanvasPlanet = () => {
  const [moveForward, setMoveForward] = useState(false);

  const handleMeshClick = (camera, mesh) => {
    camera.lookAt(mesh.position);
    const desiredDistance = 5;
    const direction = mesh.position.clone().sub(camera.position).normalize();
    camera.position.add(direction.multiplyScalar(desiredDistance));
    setMoveForward(true);

    setTimeout(() => {
      setMoveForward(false);
    }, 2000);
  };

  return (
    <>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <axesHelper args={[5]} />
        <GradientBackground />
        <Planet moveForward={moveForward} onClick={handleMeshClick} />
      </Canvas>
      <button className="absolute left-1/2 top-10 rounded-full bg-red-500 px-4 py-2 text-white">
        Move Planet
      </button>
    </>
  );
};

export default CanvasPlanet;
