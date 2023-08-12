import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
const Line = ({ start, end }) => {
  const lineRef = useRef();
  const startPoint = new THREE.Vector3(...start);
  const endPoint = new THREE.Vector3(...end);
  const currentPoint = new THREE.Vector3().copy(startPoint);
  console.log("몇번하는건데 그래서");
  useFrame(() => {
    if (lineRef.current) {
      const lineGeometry = lineRef.current.geometry;
      currentPoint.lerp(endPoint, 0.02);

      lineGeometry.setFromPoints([startPoint, currentPoint]);
      lineGeometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" />
      <lineBasicMaterial attach="material" color="white" />
    </line>
  );
};

const LineDrawing = ({ lines, num, zero, zDamping }) => {
  if (lines) {
    return (
      <>
        {lines.map((line, index) => (
          <Line
            key={index}
            start={[
              line[0] * num - zero,
              line[1] * num,
              (line[2] * num) / zDamping,
            ]}
            end={[
              line[3] * num - zero,
              line[4] * num,
              (line[5] * num) / zDamping,
            ]}
          />
        ))}
      </>
    );
  }
};

export default LineDrawing;
