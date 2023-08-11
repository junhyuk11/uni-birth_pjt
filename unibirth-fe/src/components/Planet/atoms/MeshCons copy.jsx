import React, { useRef, useEffect, useState } from "react";

const MySphere = ({ constellationList }) => {
  const meshRef = useRef();
  // 별자리 반경
  const radius = 300;
  // 별 개수 에 따라 segment 변경
  const segments = 8; // 세그먼트 수 변경 가능 갯수에 따라 달라져야 하는 로직 필요
  const [vertices, setVertices] = useState([]);
  const [hlehnlkn, setConstellationList] = useState([]);

  useEffect(() => {
    const verticesArray = meshRef.current.geometry.attributes.position.array;
    setVertices(verticesArray);
    const newConstellationList = [];

    for (let i = 0; i < vertices.length; i += 3) {
      const vertex = {
        x: vertices[i],
        y: vertices[i + 1],
        z: vertices[i + 2],
      };
      newConstellationList.push(vertex);
    }
    console.log("위치!!", hlehnlkn);
    console.log("위치!!", hlehnlkn);
    setConstellationList(newConstellationList);
  }, []);

  // const [constellationList, setConstellationList] = useState([]);

  // for (let i = 0; i < vertices.length; i += 3) {
  //   const vertex = {
  //     x: vertices[i],
  //     y: vertices[i + 1],
  //     z: vertices[i + 2],
  //   };
  //   constellationList.push(vertex);
  // }

  const color = "aquamarine";
  const spheres = [];
  for (let i = 0; i < vertices.length; i += 3) {
    const position = [vertices[i], vertices[i + 1], vertices[i + 2]];
    if (vertices[i + 1] > 0) {
      const sphere = (
        <mesh key={i} position={position}>
          <sphereGeometry args={[5, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={10}
          />
        </mesh>
      );
      spheres.push(sphere);
    }
  }

  console.log(spheres.length);
  return (
    <>
      {" "}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshBasicMaterial
          color="hotpink"
          wireframe={true}
          transparent={true}
          opacity={1}
        />
      </mesh>
      {spheres}
    </>
  );
};

export default MySphere;
