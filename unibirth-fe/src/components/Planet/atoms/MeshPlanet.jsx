import React, { useRef } from "react";
import { Html } from "@react-three/drei";
import earth1 from "../../../assets/images/earth1.jpg";
import * as THREE from "three";
import { useLoader, useFrame } from "@react-three/fiber";
import { useSetRecoilState } from "recoil";
import { currentplanetState } from "../../../recoil/atoms";
import { PLANET_LIST } from "../../../constants/constants";

const MeshPlanet = ({ navigateToDetailPlanet }) => {
  const setCurrentplanet = useSetRecoilState(currentplanetState);
  const texture = useLoader(THREE.TextureLoader, earth1);
  const planetList = PLANET_LIST;
  const rotationValues = Array(planetList.length)
    .fill()
    .map(() => (Math.random() - 0.5) * 0.005); // Generate random rotation values

  const meshRefs = useRef([]);
  meshRefs.current = [];
  meshRefs.current = planetList.map((_, i) => meshRefs.current[i] ?? useRef());

  useFrame(() => {
    meshRefs.current.forEach((ref, index) => {
      if (ref.current) {
        ref.current.rotation.y += rotationValues[index];
        ref.current.rotation.x += rotationValues[index];
      }
    });
  });

  return (
    <>
      {planetList?.map((planet, index) => (
        <group key={index}>
          <mesh
            ref={meshRefs.current[index]}
            position={[planet.x, planet.y, planet.z]}
            onClick={() => {
              console.log(planet.planetId);
              navigateToDetailPlanet(planet.planetId);
              setCurrentplanet(planet.planetId - 1);
            }}
          >
            <sphereGeometry args={[3, 32, 32]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#00ffff"
              // emissive="#fbf59b"
              emissiveIntensity={10}
              // emissiveIntensity={starList.starList[index].brightness}
            />
            <meshBasicMaterial map={texture} />
          </mesh>
          <Html position={[planet.x, planet.y + 5, planet.z]}>
            <div
              className="w-20"
              style={{
                color: "white",
                fontSize: "24x",
                textAlign: "center",
              }}
            >
              {planet.name}
            </div>
          </Html>
        </group>
      ))}
    </>
  );
};

export default MeshPlanet;
