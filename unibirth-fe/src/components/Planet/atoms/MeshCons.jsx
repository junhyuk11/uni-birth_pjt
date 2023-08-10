import React, { useRef, useEffect, useState, useMemo } from "react";
// import SpreadConstellation from "./MeshConstellation";
import { Line } from "@react-three/drei";
import { useRecoilState } from "recoil";
import { currentconstellationListState } from "../../../recoil/atoms";

const MeshCons = ({ constellationList, ConstellationIndex }) => {
  const meshRef = useRef();
  // 별자리 반경
  const radius = 300;
  // 별 개수 에 따라 segment 변경
  const segments = 8; // 세그먼트 수 변경 가능 갯수에 따라 달라져야 하는 로직 필요
  // count 변수
  const countNum = 10;
  const [vertices, setVertices] = useState([]);

  useEffect(() => {}, [ConstellationIndex]);

  console.log("메쉬에서 받은 리스트:", constellationList);

  // 별자리 간격 조정
  const constellationGap = 10;
  // 처음 밝기 조정
  const firstBrightness = 5;
  // 별 크기 조정
  const spherenum = 3;

  // DetailPlanet 리스트, 인덱스 관리
  const [currentConstellationList, setCurrentList] = useRecoilState(
    currentconstellationListState,
  );

  const [AllSphereList, setAllSphereList] = useState([]);

  useEffect(() => {
    const verticesArray = meshRef.current.geometry.attributes.position.array;
    setVertices(verticesArray);
    const newConstellationList = [];

    for (let i = 0; i < vertices.length; i += 3) {
      if (vertices[i + 1] > 0) {
        const vertex = {
          x: vertices[i],
          y: vertices[i + 1],
          z: vertices[i + 2],
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
      const xyz = {
        x: AllSphereList[i + segments + countNum].x,
        y: AllSphereList[i + segments + countNum].y,
        z: AllSphereList[i + segments + countNum].z,
        constellationId: constellationList.constellationList[i].constellationId,
      };
      StarsIndexList.push(xyz);
      const groupKey = constellationList?.constellationList[i].constellationId; // planet ID 정보로 사용 가능
      const group = (
        <group key={groupKey}>
          {constellationList.constellationList[i].lineList.map(
            (line, index) => {
              const [x1, y1, z1, x2, y2, z2] = line;
              return (
                <mesh key={`line_${i}_${index}`}>
                  <Line
                    points={[
                      [
                        x1 * constellationGap +
                          AllSphereList[i + segments + countNum].x,
                        y1 * constellationGap +
                          AllSphereList[i + segments + countNum].y,
                        z1 * constellationGap +
                          AllSphereList[i + segments + countNum].z,
                      ],
                      [
                        x2 * constellationGap +
                          AllSphereList[i + segments + countNum].x,
                        y2 * constellationGap +
                          AllSphereList[i + segments + countNum].y,
                        z2 * constellationGap +
                          AllSphereList[i + segments + countNum].z,
                      ],
                    ]}
                    color="white"
                    emmisive="#00ffff"
                    emmisiveIntensity={10}
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
                      point.x * constellationGap +
                        AllSphereList[i + segments + countNum].x,
                      point.y * constellationGap +
                        AllSphereList[i + segments + countNum].y,
                      point.z * constellationGap +
                        AllSphereList[i + segments + countNum].z,
                    ]}
                  >
                    <sphereGeometry args={[spherenum, 16, 16]} />
                    <meshStandardMaterial
                      color={constellationList?.constellationList[i].color}
                      emissive={constellationList?.constellationList[i].color}
                      emissiveIntensity={
                        point.brightness === -1
                          ? 1
                          : point.brightness + firstBrightness
                      }
                      // transparent={true}
                      // opacity={0.01}
                    />
                  </mesh>
                </>
              );
            },
          )}
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
