import React, { useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";

const Planet = () => {
  const meshRef = useRef();
  const { camera } = useThree();
  console.log(camera);

  useEffect(() => {
    const meshPosition = meshRef.current.position;
    const distance = meshPosition.distanceTo(camera.position);
    console.log("Distance to mesh:", distance);
    const calculateDistance = () => {
      const meshPosition = meshRef.current.position;
      const distance = meshPosition.distanceTo(camera.position);
      console.log("Distance to mesh:", distance);
    };

    // You can call this function on specific events, or use it elsewhere in your code as needed
    calculateDistance();
  }, [camera]);

  return (
    <mesh ref={meshRef} position={[1, 5, -5]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>
  );
};

export default Planet;
