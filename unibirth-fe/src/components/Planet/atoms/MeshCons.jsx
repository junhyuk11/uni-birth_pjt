import React, { useRef, useEffect, useState, useMemo } from "react";
// import SpreadConstellation from "./MeshConstellation";
import { Line } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { currentconstellationListState } from "../../../recoil/atoms";
import * as THREE from "three";

const MeshCons = ({ constellationList, ConstellationIndex }) => {
  const meshRef = useRef();
  // 별자리 반경
  const radius = 3000;
  // 별 개수 에 따라 segment 변경
  const segments = 11; // 세그먼트 수 변경 가능 갯수에 따라 달라져야 하는 로직 필요
  // count 변수
  const [vertices, setVertices] = useState([]);

  useEffect(() => {}, [ConstellationIndex]);

  console.log("메쉬에서 받은 리스트:", constellationList);

  // 별자리 간격 조정
  const constellationGap = 30;
  // 처음 밝기 조정
  const firstBrightness = 10;
  // 별 크기 조정
  const spherenum = 10;

  // DetailPlanet 리스트, 인덱스 관리
  const [currentConstellationList, setCurrentList] = useRecoilState(
    currentconstellationListState,
  );

  const [AllSphereList, setAllSphereList] = useState([]);

  // 클릭하면 별자리 정보 보이게 하기
  const [showDiv, setShowDiv] = useState(false);
  const handleConstellationClick = (constellationId) => () => {
    console.log("클릭한 별자리::", constellationId);
    setShowDiv(!showDiv);
  };

  useEffect(() => {
    const verticesArray = meshRef.current.geometry.attributes.position.array;
    console.log("제발 나와라", verticesArray);
    setVertices(verticesArray);
    const newConstellationList = [];
    console.log("이자식아: ", verticesArray.length);
    for (let i = segments * 3; i < verticesArray.length; i += 3) {
      if (verticesArray[i + 1] > 0 && verticesArray[i + 2] !== 0) {
        const vertex = {
          x: verticesArray[i],
          y: verticesArray[i + 1],
          z: verticesArray[i + 2],
        };
        newConstellationList.push(vertex);
      }
    }
    setAllSphereList(newConstellationList);
    // 1부터 8까지 동일함
  }, [vertices]);
  console.log("구 콘솔?", AllSphereList);

  const constellationMeshes = useMemo(() => {
    const meshModels = [];
    const StarsIndexList = [];
    for (let i = 0; i < constellationList?.constellationList.length; i++) {
      const position = new THREE.Vector3(0, 0, 1);
      const target = new THREE.Vector3(
        AllSphereList[i].x,
        AllSphereList[i].y,
        AllSphereList[i].z,
      );

      const direction = new THREE.Vector3()
        .subVectors(target, position)
        .normalize();

      direction.multiplyScalar(constellationGap);
      console.log("다이렉션::", direction);

      const xyz = {
        x: AllSphereList[i].x + direction.x,
        y: AllSphereList[i].y + direction.y,
        z: AllSphereList[i].z + direction.z,
        constellationId: constellationList.constellationList[i].constellationId,
      };
      StarsIndexList.push(xyz);
      const groupKey = constellationList?.constellationList[i].constellationId; // planet ID 정보로 사용 가능
      const group = (
        <group key={groupKey} onClick={handleConstellationClick(groupKey)}>
          {constellationList.constellationList[i].lineList.map(
            (line, index) => {
              const [x1, y1, z1, x2, y2, z2] = line;
              return (
                <mesh key={`line_${i}_${index}`}>
                  <Line
                    points={[
                      [
                        x1 * constellationGap + xyz.x,
                        y1 * constellationGap + xyz.y,
                        z1 * constellationGap + xyz.z,
                      ],
                      [
                        x2 * constellationGap + xyz.x,
                        y2 * constellationGap + xyz.y,
                        z2 * constellationGap + xyz.z,
                      ],
                    ]}
                    color="#F2F5A9"
                    transparent={true}
                    opacity={0.5}
                  />
                </mesh>
              );
            },
          )}
          {constellationList?.constellationList[i]?.pointList.map(
            (point, index) => {
              // console.log("포인트::", point);
              return (
                <>
                  <mesh
                    key={`point_${i}_${index}`}
                    position={[
                      point.x * constellationGap + xyz.x,
                      point.y * constellationGap + xyz.y,
                      point.z * constellationGap + xyz.z,
                    ]}
                  >
                    <sphereGeometry args={[spherenum, 16, 16]} />
                    <meshStandardMaterial
                      color={constellationList?.constellationList[i].color}
                      emissive={constellationList?.constellationList[i].color}
                      emissiveIntensity={
                        point.brightness === -1
                          ? 2
                          : point.brightness + firstBrightness
                      }
                      toneMapped={false}
                      // transparent={true}
                      // opacity={0.01}
                    />
                  </mesh>
                </>
              );
            },
          )}
          <mesh
            key={`position_${groupKey}`}
            position={[
              AllSphereList[i].x,
              AllSphereList[i].y,
              AllSphereList[i].z,
            ]}
          >
            <sphereGeometry args={[180, 32, 32]} />
            <meshStandardMaterial visible={false} />
          </mesh>
        </group>
      );
      meshModels.push(group);
    }
    setCurrentList(StarsIndexList);
    return meshModels;
  }, [constellationList]);

  console.log("현재 포지션!!:", currentConstellationList);
  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshBasicMaterial
          color="white"
          wireframe={true}
          transparent={true}
          opacity={0.01}
        />
      </mesh>
      {constellationMeshes}
    </>
  );
};

export default MeshCons;
